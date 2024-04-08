import prisma from '@/prisma/client';
import { Box, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import IssueDetails from './IssueDetails';
import EditIssueButton from './EditIssueButton';
interface Props {
  params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {
  if (typeof +params.id !== "number") notFound()
  const issue = await prisma.issue.findUnique({ where: { id: +params.id } })
  if (!issue) notFound()

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap={"5"}>
      <Box>
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <EditIssueButton issueId={issue}/>
      </Box>
    </Grid>
  )
}

export default IssueDetailPage
