import { Event } from '@/types/Event'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

type EventCardProps = {
  event: Event
}

export const EventCard = ({ event }: EventCardProps) => {
  const { push } = useRouter()

  const handleOnClickEventCard = useCallback(() => {
    push(`/events/${event.slug}`)
  }, [event.slug, push])

  return (
    <div className="w-[27.75rem]" onClick={handleOnClickEventCard}>
      <Image
        className="mb-[1.25rem] h-60 w-full cursor-pointer rounded-[1rem] object-cover hover:opacity-90"
        alt="Post thumbnail"
        width={500}
        height={250}
        layout="responsive"
        src={event.image.url}
      />
      <h3 className="mb-[0.625rem] text-2xl font-bold">{event.title}</h3>
    </div>
  )
}
