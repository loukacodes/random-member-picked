import React from 'react'
import styles from './TeamCard.module.scss'

interface TeamCardProps {
  name: string
  members: string[]
  facilitator?: string
}
const TeamCard: React.FC<TeamCardProps> = ({ name, members, facilitator }) => {
  return (
    <div className={styles.root}>
      <h3 className={styles.name}>{name}</h3>
      <div>
        {members.map((name) => {
          return <div>{name}</div>
        })}
      </div>
      <div className={styles.facilitator}>
        <div>Facilitator this month: </div>
        <div>
          <strong>{facilitator}</strong>
        </div>
      </div>
    </div>
  )
}

export default TeamCard
