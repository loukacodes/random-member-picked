import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Team, TeamWithFacilitator } from '../../common/types'
import { shuffle } from '../helpers/shuffle'
import TeamCard from '../team/TeamCard'
import styles from './App.module.scss'

const App = () => {
  const localStorageData = JSON.parse(
    window.localStorage.getItem('teamsWithFacilitator')?.toString() || '[]'
  )
  const [teams, setTeamsWithFacilitator] = useState<TeamWithFacilitator[]>(
    localStorageData
  )

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
        setTeamsWithFacilitator(
          data.map((team: Team) => {
            return { ...team, facilitator: 'Not yet found' }
          })
        )
      })
  }

  useEffect(() => {
    if (!localStorageData || localStorageData.length === 0) {
      getData()
    }
  }, [localStorageData])

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max))
  }

  const findFacilitator = () => {
    if (!teams) return null

    const shuffledTeams = shuffle(Array.from(teams))
    const teamsWithFacilitator = teams.map((team) => {
      const alternativeIndex = shuffledTeams.findIndex(
        (shuffledTeam) => shuffledTeam === team
      )
      const anotherTeamMembers = teams[alternativeIndex].members
      const shuffledAnotherTeamMembers = shuffle(Array.from(anotherTeamMembers))
      const facilitator =
        shuffledAnotherTeamMembers[getRandomInt(anotherTeamMembers.length)]
      return {
        ...team,
        facilitator: facilitator,
      }
    })
    setTeamsWithFacilitator(teamsWithFacilitator)
    window.localStorage.setItem(
      'teamsWithFacilitator',
      JSON.stringify(teamsWithFacilitator)
    )
  }

  return (
    <div className={styles.root}>
      <h1>Monthly facilitator generation</h1>
      <h3>{moment().format('MMMM YYYY')}</h3>
      <div className={styles.teamCardWrapper}>
        {teams.map((team) => (
          <TeamCard
            name={team.name}
            members={team.members}
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
