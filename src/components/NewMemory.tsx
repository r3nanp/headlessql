import toast from 'react-hot-toast'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FolderOpenIcon } from '@heroicons/react/outline'

import { Button } from './Button'
import { Input } from './Input'
import { TextArea } from './Textarea'
import { resolver } from '@/utils/validations'
import { createMemory } from '@/apis/createMemory'

type CreateMemory = {
  name: string
  story: string
}

export const NewMemory = ({ eventId }: { eventId: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<CreateMemory>({
    resolver
  })

  const onSubmit: SubmitHandler<CreateMemory> = async ({ name, story }) => {
    toast.promise(createMemory({ name, story, eventId }), {
      loading: 'Loading...',
      success: <p>Your memory is going to be reviewed soon.</p>,
      error: <p>Something went wrong!</p>
    })
  }

  return (
    <form
      className="my-8 flex max-w-2xl flex-col"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="text-4xl font-bold">Add your memories</h3>

      <div className="my-4">
        <Input
          {...register('name')}
          label="Your name"
          name="name"
          error={errors?.name?.message}
          variant={errors.name ? 'error' : 'primary'}
        />
      </div>

      <div className="my-4">
        <TextArea
          {...register('story')}
          name="story"
          label="Your story"
          error={errors?.story?.message}
          variant={errors.story ? 'error' : 'primary'}
        />
      </div>

      <div className="max-w-20">
        <Button
          type="submit"
          isLoading={isSubmitting}
          startIcon={<FolderOpenIcon className="h-8 w-8" />}
        >
          Add story
        </Button>
      </div>
    </form>
  )
}
