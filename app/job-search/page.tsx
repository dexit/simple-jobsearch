'use client'

import { useEffect, useState } from 'react'
import { Job, SavedSearch, SearchFilters } from '@/types/job-search'
import { SearchForm } from '@/components/search-form'
import { SavedSearches } from '@/components/saved-searches'
import { JobList } from '@/components/job-list'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const SAVED_SEARCHES_KEY = 'jobSearchSavedSearches'

export default function JobSearch() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalJobs, setTotalJobs] = useState(0)
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([])
  const [currentFilters, setCurrentFilters] = useState<SearchFilters>({
    what: '',
    where: '',
    category: '',
    contract_type: '',
    distance: '10',
    salary_min: '',
    page: 1
  })

  useEffect(() => {
    const saved = localStorage.getItem(SAVED_SEARCHES_KEY)
    if (saved) {
      setSavedSearches(JSON.parse(saved))
    }
  }, [])

  const saveSearches = (searches: SavedSearch[]) => {
    setSavedSearches(searches)
    localStorage.setItem(SAVED_SEARCHES_KEY, JSON.stringify(searches))
  }

  const handleSearch = async (filters: SearchFilters) => {
    setIsLoading(true)
    setError(null)
    setCurrentFilters(filters)

    const queryParams = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'all') queryParams.append(key, value.toString())
    })

    try {
      const response = await fetch(`/api/job-search?${queryParams}`)
      if (!response.ok) throw new Error('Failed to fetch jobs')
      const data = await response.json()
      setJobs(data.results)
      setTotalJobs(data.count)
      setCurrentPage(filters.page)
    } catch (err) {
      setError('An error occurred while fetching jobs. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveSearch = (name: string, filters: SearchFilters) => {
    const newSearch: SavedSearch = {
      id: Date.now().toString(),
      name,
      filters,
      createdAt: new Date().toISOString()
    }
    saveSearches([...savedSearches, newSearch])
  }

  const handleDeleteSavedSearch = (id: string) => {
    saveSearches(savedSearches.filter(search => search.id !== id))
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
    handleSearch({ ...currentFilters, page: newPage })
  }

  const totalPages = Math.ceil(totalJobs / 10)

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Job Search</h1>
      
      <SavedSearches
        searches={savedSearches}
        onSelect={handleSearch}
        onDelete={handleDeleteSavedSearch}
      />

      <SearchForm
        onSearch={handleSearch}
        onSave={handleSaveSearch}
        initialFilters={currentFilters}
      />

      {error && <p className="text-red-500">{error}</p>}

      <JobList jobs={jobs} isLoading={isLoading} />

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}

