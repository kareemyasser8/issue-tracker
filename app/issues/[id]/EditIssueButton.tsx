import { Issue } from "@prisma/client"
import { Pencil2Icon } from "@radix-ui/react-icons"
import { Button } from "@radix-ui/themes"
import Link from "next/link"

const EditIssueButton = ({ issueId }: { issueId: Issue }) => {
  return (
    <Button>
      <Pencil2Icon />
      <Link href={`/issues/${issueId.id}/edit`}>Edit Issue</Link>
    </Button>
  )
}

export default EditIssueButton
