import { useCallback } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { motion } from 'framer-motion'

import { itemVariants } from '@/constants/variants'
import { Event } from '@/types/Event'

type EventCardProps = {
  event: Event
}

export const EventCard = ({ event }: EventCardProps) => {
  const { push } = useRouter()

  const handleOnClickEventCard = useCallback(() => {
    push(`/events/${event.slug}`)
  }, [event.slug, push])

  return (
    <motion.div
      variants={itemVariants}
      className="w-[27.75rem]"
      onClick={handleOnClickEventCard}
    >
      <Image
        className="mb-[1.25rem] h-60 w-full cursor-pointer rounded-[1rem] object-cover hover:opacity-90"
        alt="Post thumbnail"
        width={500}
        height={250}
        layout="responsive"
        src={event.image.url}
      />
      <h3 className="mb-[0.625rem] text-2xl font-bold">{event.title}</h3>
    </motion.div>
  )
}
