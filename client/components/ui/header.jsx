import Image from 'next/image'
import { useGame } from '@components/providers/gameContext'

import thumbnailImg from '@images/thumbnail.gif'

function Header() {
  const { connectWalletAction } = useGame()

  return (
    <div className={style.container}>
      <p className={style.titleText}>⚔️ Metaverse Slayer ⚔️</p>
      <p className={style.titleSubText}>Team up to protect the Metaverse!</p>
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
    </div>
  )
}

const style = {
  container: `pt-32`,
  titleText: `text-5xl font-bold text-white`,
  titleSubText: `text-2xl text-white`,
  connectContainer: `m-auto flex flex-col max-w-[550px] pt-8`,
  connectButton: `wallet-button mt-10 h-12 w-auto cursor-pointer rounded pl-10 pr-10 text-base font-bold text-white`,
}

export default Header
