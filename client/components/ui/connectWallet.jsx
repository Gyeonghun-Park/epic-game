import Image from 'next/image'
import SelectCharacter from '@components/ui/selectCharacter'
import { useGame } from '@components/providers/gameContext'

import thumbnailImg from '@images/thumbnail.gif'

function ConnectWallet() {
  const { currentAccount, characterNFT, setCharacterNFT, gameContract } =
    useGame()

  const connectWalletAction = async () => {
    try {
      if (!ethereum) return alert('Please install MetaMask.')

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      })

      setCurrentAccount(accounts[0])
    } catch (error) {
      console.log(error)
    }
  }

  const renderContent = () => {
    if (!currentAccount) {
      return (
        <div className={style.connectContainer}>
          <Image
            src={thumbnailImg}
            alt="Monty Python Gif"
            height={300}
            width={550}
          />
          <button className={style.connectButton} onClick={connectWalletAction}>
            Connect Wallet To Get Started
          </button>
        </div>
      )
    } else if (currentAccount && !characterNFT) {
      return (
        <SelectCharacter
          setCharacterNFT={setCharacterNFT}
          gameContract={gameContract}
        />
      )
    }
  }

  return (
    <div className={style.container}>
      <p className={style.titleText}>⚔️ Metaverse Slayer ⚔️</p>
      <p className={style.titleSubText}>Team up to protect the Metaverse!</p>
      <div className={style.connectContainer}>{renderContent()}</div>
    </div>
  )
}

const style = {
  container: `pt-32`,
  titleText: `text-5xl font-bold text-white`,
  titleSubText: `mt-6 text-2xl text-white`,
  connectContainer: `m-auto flex flex-col pt-8`,
  connectButton: `wallet-button mt-10 h-12 w-auto cursor-pointer rounded pl-10 pr-10 text-base font-bold text-white`,
}

export default ConnectWallet
