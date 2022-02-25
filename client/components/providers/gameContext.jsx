import { useEffect, useState, createContext, useContext } from 'react'
import { ethers } from 'ethers'
import { contractABI, contractAddress } from '@lib/constants'

export const GameContext = createContext()

let ethereum

if (typeof window !== 'undefined') {
  ethereum = window.ethereum
}

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum)
  const signer = provider.getSigner()
  const gameContract = new ethers.Contract(contractAddress, contractABI, signer)

  return gameContract
}

export const GameProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(null)

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert('Please install MetaMask.')

      const accounts = await ethereum.request({ method: 'eth_accounts' })
      if (accounts.length !== 0) {
        const account = accounts[0]
        setCurrentAccount(account)
      } else {
        console.log('No authorized account found')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const connectWalletAction = async () => {
    try {
      if (!ethereum) return alert('Please install MetaMask.')

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      })

      console.log('Connected', accounts[0])
      setCurrentAccount(accounts[0])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])
  return (
    <GameContext.Provider value={{ connectWalletAction }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  return useContext(GameContext)
}
