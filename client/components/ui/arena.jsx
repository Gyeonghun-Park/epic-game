import { useState, useEffect } from 'react'
import Image from 'next/image'
import LoadingIndicator from '@components/ui/loadingIndicator'
import transformCharacterData from '@lib/transformCharacterData'

function Arena({ gameContract, characterNFT, setCharacterNFT }) {
  const [boss, setBoss] = useState(null)
  const [attackState, setAttackState] = useState('')
  const [showToast, setShowToast] = useState(false)

  const runAttackAction = async () => {
    try {
      if (gameContract) {
        setAttackState('attacking')
        const attackTxn = await gameContract.attackBoss()
        await attackTxn.wait()
        setAttackState('hit')

        setShowToast(true)
        setTimeout(() => {
          setShowToast(false)
        }, 5000)
      }
    } catch (error) {
      console.error('Error attacking boss:', error)
      setAttackState('')
    }
  }

  useEffect(() => {
    if (!gameContract) return
    ;(async () => {
      const bossTxn = await gameContract.getBigBoss()
      setBoss(transformCharacterData(bossTxn))
    })()

    const onAttackComplete = (newBossHp, newPlayerHp) => {
      const bossHp = newBossHp.toNumber()
      const playerHp = newPlayerHp.toNumber()
      setBoss((prevState) => {
        return { ...prevState, hp: bossHp }
      })
      setCharacterNFT((prevState) => {
        return { ...prevState, hp: playerHp }
      })
    }
    gameContract.on('AttackComplete', onAttackComplete)

    return () => {
      if (gameContract) {
        gameContract.off('AttackComplete', onAttackComplete)
      }
    }
  }, [gameContract])

  return (
    <div className="arena-container">
      {boss && characterNFT && (
        <div id="toast" className={showToast ? 'show' : ''}>
          <div id="desc">{`💥 ${boss.name} was hit for ${characterNFT.attackDamage}!`}</div>
        </div>
      )}

      {boss && (
        <div className="boss-container">
          <div className={`boss-content  ${attackState}`}>
            <h2>🔥 {boss.name} 🔥</h2>
            <div className="image-content">
              <Image
                src={`https://ipfs.io/ipfs/${boss.imageURI}`}
                alt={`Boss ${boss.name}`}
                height={350}
                width={550}
              />
              <div className="health-bar">
                <progress value={boss.hp} max={boss.maxHp} />
                <p>{`${boss.hp} / ${boss.maxHp} HP`}</p>
              </div>
            </div>
          </div>
          <div className="attack-container">
            <button className="cta-button" onClick={runAttackAction}>
              {`💥 Attack ${boss.name}`}
            </button>
          </div>
          {attackState === 'attacking' && (
            <div className="loading-indicator">
              <LoadingIndicator />
              <p>Attacking ⚔️</p>
            </div>
          )}
        </div>
      )}

      {characterNFT && (
        <div className="players-container">
          <div className="player-container">
            <h2>Your Character</h2>
            <div className="player">
              <div className="image-content">
                <h2>{characterNFT.name}</h2>
                <Image
                  src={`https://ipfs.io/ipfs/${characterNFT.imageURI}`}
                  alt={`Character ${characterNFT.name}`}
                  height={250}
                  width={300}
                />
                <div className="health-bar">
                  <progress value={characterNFT.hp} max={characterNFT.maxHp} />
                  <p>{`${characterNFT.hp} / ${characterNFT.maxHp} HP`}</p>
                </div>
              </div>
              <div className="stats">
                <h4>{`⚔️ Attack Damage: ${characterNFT.attackDamage}`}</h4>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Arena
