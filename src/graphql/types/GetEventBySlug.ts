import { Event } from '@/types/Event'

export type EventBySlugRequest = {
  event: Event | null
}

export type EventBySlugVariables = {
  slug: string
}
