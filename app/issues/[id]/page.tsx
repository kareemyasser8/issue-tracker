import React from "react"
import prisma from "@/prisma/client"
import { notFound } from "next/navigation"
import { Card, Flex, Heading, Text } from "@radix-ui/themes"
import IssueStatusBadge from "@/app/components/IssueStatusBadge"

interface Props {
  params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {
  if (typeof +params.id !== "number") notFound()

  const issue = await prisma.issue.findUnique({ where: { id: +params.id } })

  if (!issue) notFound()

  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex gap={"2"} my={"2"}>
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card>
        <p>{issue.descripiton}</p>
      </Card>
    </div>
  )
}

export default IssueDetailPage
