import { useEffect, useState, createContext, useContext } from 'react'
import { ethers } from 'ethers'
import { contractABI, contractAddress } from '@lib/constants'
import transformCharacterData from '@lib/transformCharacterData'

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
  const [characterNFT, setCharacterNFT] = useState(null)
  const [gameContract, setGameContract] = useState(null)

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert('Please install MetaMask.')

      const accounts = await ethereum.request({ method: 'eth_accounts' })
      if (accounts.length !== 0) {
        const account = accounts[0]
        setCurrentAccount(account)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const checkNetwork = async () => {
    try {
      if (ethereum.networkVersion !== '4') {
        alert('Please connect to Rinkeby!')
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  useEffect(() => {
    if (!currentAccount) return
    ;(async () => {
      const gameContract = createEthereumContract()
      setGameContract(gameContract)
      const CharacterData = await gameContract.checkIfUserHasNFT()

      if (CharacterData.name) {
        setCharacterNFT(transformCharacterData(CharacterData))
      }
    })()
  }, [currentAccount])

  return (
    <GameContext.Provider
      value={{
        currentAccount,
        setCurrentAccount,
        characterNFT,
        setCharacterNFT,
        gameContract,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  return useContext(GameContext)
}
