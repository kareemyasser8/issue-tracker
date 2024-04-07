import { IssueStatusBadge } from "@/app/components"
import { Issue } from "@prisma/client"
import { Box, Heading, Flex, Card, Text } from "@radix-ui/themes"
import React from "react"
import ReactMarkDown from "react-markdown"

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex gap={"2"} my={"2"}>
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose" mt={"4"}>
        <ReactMarkDown>{issue.descripiton}</ReactMarkDown>
      </Card>
    </>
  )
}

export default IssueDetails
