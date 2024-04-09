"use client"
import 'easymde/dist/easymde.min.css';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { issueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import { z } from 'zod';

type IssueFormData = z.infer<typeof issueSchema>

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  })
  const router = useRouter()
  const [error, setError] = useState("")
  const [isSubmmiting, setIsSubmmiting] = useState(false)

  const onSubmit = async (data: any) => {
    try {
      setIsSubmmiting(true)
      if (issue) await axios.patch("/api/issues/" + issue.id, data)
      else await axios.post("/api/issues", data)
      router.push("/issues/list")
      router.refresh();
    } catch (error) {
      setIsSubmmiting(false)
      setError("An expected Error occured")
    }
  }

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root className="mb-3" color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3"
        onSubmit={handleSubmit((data) => onSubmit(data))}
      >
        <TextField.Root>
          <TextField.Input
            defaultValue={issue?.title}
            placeholder="Title"
            {...register("title")}
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.descripiton}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />

        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmmiting}>
          {issue ? "Update Issue" : "Submit new Issue "}{" "}
          {isSubmmiting && <Spinner />}
        </Button>
      </form>
    </div>
  )
}

export default IssueForm
