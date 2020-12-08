import moment from 'moment'
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

  function shuffle<T>(array: T[]): T[] {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1

      // And swap it with the current element.
      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }

    return array
  }

  const findFacilitator = () => {
    if (!data) return null

    const shuffledTeams = shuffle(Array.from(data))
    const teamsWithFacilitator = data.map((team) => {
      const alternativeIndex = shuffledTeams.findIndex(
        (shuffledTeam) => shuffledTeam === team
      )
      const anotherTeamMembers = data[alternativeIndex].members
      const shuffledAnotherTeamMembers = shuffle(anotherTeamMembers)
      const facilitator =
        shuffledAnotherTeamMembers[getRandomInt(anotherTeamMembers.length)]
      return {
        name: team.name,
        members: team.members,
        facilitator: facilitator,
      }
    })

    setTeamsWithFacilitator(teamsWithFacilitator)
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
