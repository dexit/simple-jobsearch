import { Job } from "@/types/job-search"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDistance } from 'date-fns'

interface JobListProps {
  jobs: Job[]
  isLoading: boolean
}

export function JobList({ jobs, isLoading }: JobListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-4 p-4 border rounded-lg">
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <Skeleton className="h-4 w-[100px]" />
          </div>
        ))}
      </div>
    )
  }

  if (jobs.length === 0) {
    return <p className="text-center py-8 text-muted-foreground">No jobs found. Try adjusting your search criteria.</p>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[40%]">Title</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Posted</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobs.map((job) => (
          <TableRow key={job.id}>
            <TableCell>
              <a
                href={job.redirect_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {job.title}
              </a>
            </TableCell>
            <TableCell>{job.company.display_name}</TableCell>
            <TableCell>{job.location.display_name}</TableCell>
            <TableCell>{job.category.label}</TableCell>
            <TableCell>
              {formatDistance(new Date(job.created), new Date(), { addSuffix: true })}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

