export interface BlogPost {
  id:           string
  created_at:   string
  updated_at:   string
  title:        string
  slug:         string
  excerpt:      string | null
  content:      string | null
  category:     string | null
  author:       string
  published:    boolean
  published_at: string | null
  cover_image:  string | null
  reading_time: number | null
  tags:         string[] | null
  seo_title:    string | null
  seo_desc:     string | null
}

export interface Document {
  id:             string
  created_at:     string
  title:          string
  description:    string | null
  category:       string | null
  file_path:      string
  file_name:      string | null
  file_size_kb:   number | null
  download_count: number
  published:      boolean
  requires_email: boolean
  tags:           string[] | null
}

export interface Lead {
  id:         string
  created_at: string
  name:       string
  email:      string
  company:    string | null
  phone:      string | null
  service:    string | null
  timeline:   string | null
  message:    string | null
  source:     string
  status:     string
}

