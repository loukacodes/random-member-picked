type Team = {
  teamName: string
  teamMember: string[]
}

type BiggerTeam = Team[]

interface TeamWithFacilitator extends Team {
  facilitator?: string
}

export type { Team, BiggerTeam, TeamWithFacilitator }
