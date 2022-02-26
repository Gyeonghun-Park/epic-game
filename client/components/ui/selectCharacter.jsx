import { useState, useEffect } from 'react'
import Image from 'next/image'
import transformCharacterData from '@lib/transformCharacterData'

function SelectCharacter({ gameContract, setCharacterNFT }) {
  const [characters, setCharacters] = useState([])

  const mintCharacterNFTAction = (characterId) => async () => {
    try {
      if (!gameContract) return
      const mintTxn = await gameContract.mintCharacterNFT(characterId)
      alert('Minting character in progress...')
      await mintTxn.wait()
    } catch (error) {
      console.warn('MintCharacterAction Error:', error)
    }
  }

  useEffect(() => {
    if (!gameContract) return
    ;(async () => {
      try {
        const charactersTxn = await gameContract.getAllDefaultCharacters()
        const characters = charactersTxn.map((characterData) =>
          transformCharacterData(characterData)
        )
        setCharacters(characters)
      } catch (error) {
        console.error('Something went wrong fetching characters:', error)
      }
    })()

    const onCharacterMint = async (sender, tokenId, characterIndex) => {
      if (gameContract) {
        const characterNFT = await gameContract.checkIfUserHasNFT()
        setCharacterNFT(transformCharacterData(characterNFT))
        alert(
          `Your NFT is all done -- see it here: https://testnets.opensea.io/assets/${
            gameContract.address
          }/${tokenId.toNumber()}`
        )
      }
    }
    gameContract.on('CharacterNFTMinted', onCharacterMint)

    return () => {
      if (gameContract) {
        gameContract.off('CharacterNFTMinted', onCharacterMint)
      }
    }
  }, [gameContract])

  const renderCharacters = () =>
    characters.map((character, index) => (
      <div className={style.charactersContainer} key={character.name}>
        <div className={style.nameContainer}>
          <p className={style.nameText}>{character.name}</p>
        </div>
        <Image
          src={`https://ipfs.io/ipfs/${character.imageURI}`}
          alt={character.name}
          height={300}
          width={350}
        />
        <button
          className={style.charactersButton}
          type="button"
          onClick={mintCharacterNFTAction(index)}
        >{`Mint ${character.name}`}</button>
      </div>
    ))

  return (
    <div className={style.container}>
      <h2>Mint Your Hero. Choose wisely.</h2>
      {characters.length > 0 && (
        <div className={style.characters}>{renderCharacters()}</div>
      )}
    </div>
  )
}

const style = {
  container: `flex flex-col items-center text-white`,
  characters: `grid grid-cols-3 gap-4 mt-4`,
  charactersContainer: `relative flex flex-col`,
  nameContainer: `absolute p-1 bg-[#838383] z-10`,
  nameText: `m-0 font-bold`,
  charactersButton: `absolute bottom-0 h-10 w-full cursor-pointer bg-blue-600 text-base font-bold text-white`,
}

export default SelectCharacter
