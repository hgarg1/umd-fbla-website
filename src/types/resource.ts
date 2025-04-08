export interface Resource {
  id: string
  title: string
  description: string
  type: 'document' | 'presentation' | 'spreadsheet' | 'other'
  url: string
  cdnUrl?: string
  cdnKey?: string
  size: string
  mimeType?: string
  lastModified: string
  isPublic: boolean
  metadata?: {
    cdnProvider?: 'cloudflare' | 'aws' | 'azure'
    cacheControl?: string
    contentEncoding?: string
    etag?: string
  }
  createdAt: string
  updatedAt: string
}

export interface ResourceUploadResponse {
  success: boolean
  url: string
  cdnUrl?: string
  cdnKey?: string
  size: string
  mimeType: string
}

export interface CDNConfig {
  provider: 'cloudflare' | 'aws' | 'azure'
  region?: string
  bucket?: string
  endpoint?: string
  publicUrl?: string
} 