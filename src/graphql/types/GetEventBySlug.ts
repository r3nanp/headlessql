import { Event } from '@/types/Event'

type IEvent = Event & {
  description: string
}

export type EventBySlugRequest = {
  event: IEvent | null
}

export type EventBySlugVariables = {
  slug: string
}
