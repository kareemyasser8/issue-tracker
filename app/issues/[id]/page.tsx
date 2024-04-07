import React from "react"
import prisma from "@/prisma/client"
import { notFound } from "next/navigation"

interface Props {
  params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {
  if (typeof params.id !== "number") notFound()

  const issue = await prisma.issue.findUnique({ where: { id: +params.id } })

  if (!issue) notFound()

  return (
    <div>
      <p>{issue.title}</p>
      <p>{issue.descripiton}</p>
      <p>{issue.status}</p>
      <p>{issue.createdAt.toDateString()}</p>
    </div>
  )
}

export default IssueDetailPage
