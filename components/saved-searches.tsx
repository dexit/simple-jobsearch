import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SavedSearch, SearchFilters } from "@/types/job-search"
import { Search, X } from 'lucide-react'

interface SavedSearchesProps {
  searches: SavedSearch[]
  onSelect: (filters: SearchFilters) => void
  onDelete: (id: string) => void
}

export function SavedSearches({ searches, onSelect, onDelete }: SavedSearchesProps) {
  if (searches.length === 0) return null

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {searches.map((search) => (
        <Card key={search.id} className="flex-shrink-0">
          <CardContent className="flex items-center gap-2 p-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-sm"
              onClick={() => onSelect(search.filters)}
            >
              <Search className="mr-2 h-4 w-4" />
              {search.name}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onDelete(search.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

