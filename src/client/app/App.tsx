import React, { useEffect, useState } from 'react'
import { Team, TeamWithFacilitator } from '../../common/types'
import TeamCard from '../team/TeamCard'
import styles from './App.module.scss'

const App = () => {
  const [data, setData] = useState<TeamWithFacilitator[]>()
  const [teams, setTeamsWithFacilitator] = useState<TeamWithFacilitator[]>([])

  const getData = () => {
    fetch('data.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        setData(
          data.map((team: Team) => {
            return { ...team, facilitator: 'no one' }
          })
        )
      })
  }
  useEffect(() => {
    getData()
  }, [])

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max))
  }

  function getAnotherTeamIndex(
    currentIndex: number,
    maxLength: number
  ): number {
    let couldBeAnotherTeamIndex = getRandomInt(maxLength)
    if (couldBeAnotherTeamIndex !== currentIndex) {
      couldBeAnotherTeamIndex = getRandomInt(maxLength)
      getAnotherTeamIndex(currentIndex, maxLength)
    }
    return couldBeAnotherTeamIndex
  }

  const findFacilitator = () => {
    if (!data) return null
    const teamsWithFacilitator = data.map((team, index) => {
      const anotherTeam = data[getAnotherTeamIndex(index, data.length)]
      const facilitator =
        anotherTeam.teamMember[getRandomInt(anotherTeam.teamMember.length)]
      return {
        teamName: team.teamName,
        teamMember: team.teamMember,
        facilitator: facilitator,
      }
    })

    setTeamsWithFacilitator(teamsWithFacilitator)
  }

  return (
    <div className={styles.root}>
      <div className={styles.teamCardWrapper}>
        {teams.map((team) => (
          <TeamCard
            teamName={team.teamName}
            teamMember={team.teamMember}
            facilitator={team.facilitator}
          />
        ))}
      </div>
      <button onClick={findFacilitator} className={styles.button}>
        Map facilitator
      </button>
    </div>
  )
}

export default App
