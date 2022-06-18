type CreateMemory = {
  name: string
  story: string
  eventId: string
}

export const createMemory = async ({ name, eventId, story }: CreateMemory) =>
  await fetch('/api/memories/add', {
    method: 'POST',
    body: JSON.stringify({ name, story, eventId }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
