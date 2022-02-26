import type { NextPage } from 'next'
import ConnectWallet from '@components/ui/connectWallet'
import SelectCharacter from '@components/ui/selectCharacter'
import Arena from '@components/ui/arena'
import { useGame } from '@components/providers/gameContext'

const Home: NextPage = () => {
  const {
    currentAccount,
    setCurrentAccount,
    characterNFT,
    setCharacterNFT,
    gameContract,
  } = useGame()

  const renderContent = () => {
    if (!currentAccount) {
      return <ConnectWallet setCurrentAccount={setCurrentAccount} />
    } else if (currentAccount && !characterNFT) {
      return (
        <SelectCharacter
          gameContract={gameContract}
          setCharacterNFT={setCharacterNFT}
        />
      )
    } else if (currentAccount && characterNFT) {
      return (
        <Arena
          gameContract={gameContract}
          characterNFT={characterNFT}
          setCharacterNFT={setCharacterNFT}
        />
      )
    }
  }

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.title}>
          <p className={style.titleText}>⚔️ Metaverse Slayer ⚔️</p>
          <p className={style.titleSubText}>
            Team up to protect the Metaverse!
          </p>
          <div className={style.contentContainer}>{renderContent()}</div>
        </div>
      </div>
    </div>
  )
}

const style = {
  wrapper: `min-h-screen bg-[#0d1116] text-center`,
  container: `flex flex-col justify-between`,
  title: `pt-16`,
  titleText: `text-5xl font-bold text-white`,
  titleSubText: `mt-6 text-2xl text-white`,
  contentContainer: `m-auto flex flex-col pt-8`,
}

export default Home
