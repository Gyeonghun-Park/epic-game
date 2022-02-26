import type { NextPage } from 'next'
import ConnectWallet from '@components/ui/connectWallet'

const Home: NextPage = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <ConnectWallet />
      </div>
    </div>
  )
}

const style = {
  wrapper: `min-h-screen bg-[#0d1116] text-center`,
  container: `flex flex-col justify-between`,
}

export default Home
