import Image from 'next/image'

import thumbnailImg from '@images/thumbnail.gif'

function ConnectWallet({ setCurrentAccount }) {
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
}

const style = {
  connectContainer: `m-auto flex flex-col pt-8`,
  connectButton: `wallet-button mt-10 h-12 w-auto cursor-pointer rounded pl-10 pr-10 text-base font-bold text-white`,
}

export default ConnectWallet
