import type { NextPage } from 'next'
import Header from '@components/ui/header'

const Home: NextPage = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <Header />
      </div>
    </div>
  )
}

const style = {
  wrapper: `min-h-screen bg-[#0d1116] text-center`,
  container: `flex flex-col justify-between h-full`,
}

export default Home
