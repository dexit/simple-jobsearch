export interface Job {
  id: string;
  title: string;
  company: {
    display_name: string;
  };
  location: {
    display_name: string;
    area: string[];
  };
  description: string;
  redirect_url: string;
  created: string;
  category: {
    label: string;
    tag: string;
  };
  salary_min: number;
  salary_max: number;
  contract_type: string;
}

export interface JobSearchResponse {
  results: Job[];
  count: number;
}

export interface SavedSearch {
  id: string;
  name: string;
  filters: SearchFilters;
  createdAt: string;
}

export interface SearchFilters {
  what: string;
  where: string;
  category: string;
  contract_type: string;
  distance: string;
  salary_min: string;
  page: number;
}

export interface Category {
  label: string;
  tag: string;
}

