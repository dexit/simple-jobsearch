import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Category, SearchFilters } from "@/types/job-search"

interface SearchFormProps {
  onSearch: (filters: SearchFilters) => void
  onSave: (name: string, filters: SearchFilters) => void
  initialFilters?: SearchFilters
}

export function SearchForm({ onSearch, onSave, initialFilters }: SearchFormProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [filters, setFilters] = useState<SearchFilters>({
    what: '',
    where: '',
    category: '',
    contract_type: '',
    distance: '10',
    salary_min: '',
    page: 1,
    ...initialFilters
  })

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories')
        const data = await response.json()
        setCategories(data.results || [])
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      }
    }
    fetchCategories()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(filters)
  }

  const handleSave = () => {
    const name = prompt('Enter a name for this search:')
    if (name) {
      onSave(name, filters)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div className="space-y-2">
        <Label htmlFor="what">Keywords</Label>
        <Input
          id="what"
          value={filters.what}
          onChange={(e) => setFilters(prev => ({ ...prev, what: e.target.value }))}
          placeholder="Job title, skills, or company"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="where">Location</Label>
        <Input
          id="where"
          value={filters.where}
          onChange={(e) => setFilters(prev => ({ ...prev, where: e.target.value }))}
          placeholder="City or postcode"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select
          value={filters.category}
          onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}
        >
          <SelectTrigger id="category">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.tag} value={category.tag}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contract_type">Contract Type</Label>
        <Select
          value={filters.contract_type}
          onValueChange={(value) => setFilters(prev => ({ ...prev, contract_type: value }))}
        >
          <SelectTrigger id="contract_type">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="permanent">Permanent</SelectItem>
            <SelectItem value="contract">Contract</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="distance">Distance (miles)</Label>
        <Select
          value={filters.distance}
          onValueChange={(value) => setFilters(prev => ({ ...prev, distance: value }))}
        >
          <SelectTrigger id="distance">
            <SelectValue placeholder="Select distance" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5 miles</SelectItem>
            <SelectItem value="10">10 miles</SelectItem>
            <SelectItem value="20">20 miles</SelectItem>
            <SelectItem value="30">30 miles</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="salary_min">Minimum Salary</Label>
        <Input
          id="salary_min"
          type="number"
          value={filters.salary_min}
          onChange={(e) => setFilters(prev => ({ ...prev, salary_min: e.target.value }))}
          placeholder="e.g. 30000"
        />
      </div>

      <div className="col-span-full flex gap-2">
        <Button type="submit">Search</Button>
        <Button type="button" variant="outline" onClick={handleSave}>
          Save Search
        </Button>
      </div>
    </form>
  )
}

