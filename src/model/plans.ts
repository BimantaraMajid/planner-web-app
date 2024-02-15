import { Task } from "./task"

export interface Plan {
  id: number
  name: string
  startDate: string
  endDate: string
  userId: number
  type: string
  frequency: number
  tag: string[]
  createdAt: string
  updatedAt: string
  tasks: Task[]
}

export interface PlansResponse {
  page: number
  totalPages: number
  totalItems: number
  items: Plan[]
}
