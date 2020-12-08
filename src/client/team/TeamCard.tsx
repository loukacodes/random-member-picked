import React from 'react'
import styles from './TeamCard.module.scss'

interface TeamCardProps {
  teamName: string
  teamMember: string[]
  facilitator?: string
}
const TeamCard: React.FC<TeamCardProps> = ({
  teamName,
  teamMember,
  facilitator,
}) => {
  return (
    <div className={styles.root}>
      <h3>{teamName}</h3>
      <div>
        {teamMember.map((name) => {
          return <div>{name}</div>
        })}
      </div>
      <div className={styles.facilitator}>Facilitator: {facilitator}</div>
    </div>
  )
}

export default TeamCard
