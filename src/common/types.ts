type Team = {
  name: string
  members: string[]
}

interface TeamWithFacilitator extends Team {
  facilitator?: string
}

export type { Team, TeamWithFacilitator }
