import { ChangeEvent, useState } from 'react'

export const NewMemory = ({ eventId }: { eventId: string }) => {
  const [name, setName] = useState('')
  const [story, setStory] = useState('')

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()

    await fetch('/api/memories/add', {
      method: 'POST',
      body: JSON.stringify({ name, story, eventId }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    setName('')
    setStory('')
  }

  return (
    <form className="my-8 flex max-w-2xl flex-col" onSubmit={handleSubmit}>
      <div className="my-4">
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Your name
        </label>
        <input
          type="text"
          required
          value={name}
          onChange={event => setName(event.target.value)}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        />
      </div>
      <div className="my-4">
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400"
        >
          Your story
        </label>

        <textarea
          id="story"
          value={story}
          onChange={event => setStory(event.target.value)}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        />
      </div>

      <div className="max-w-20">
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
        >
          Add story
        </button>
      </div>
    </form>
  )
}
