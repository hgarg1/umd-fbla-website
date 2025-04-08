'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Resource } from '@/types/resource'
import { CDNService } from '@/services/cdn'

// Define allowed MIME types for each resource type
const ALLOWED_TYPES = {
  document: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
    'text/plain'
  ],
  presentation: [
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation', // .pptx
    'application/vnd.google-apps.presentation'
  ],
  spreadsheet: [
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
    'application/vnd.google-apps.spreadsheet',
    'text/csv'
  ],
  other: [] // Allow all types
}

// File extensions for user feedback
const TYPE_EXTENSIONS = {
  document: '.pdf, .doc, .docx, .txt',
  presentation: '.ppt, .pptx',
  spreadsheet: '.xls, .xlsx, .csv',
  other: 'All files'
}

interface ResourceFormProps {
  onSubmit: (resource: Partial<Resource>) => void
  initialData?: Partial<Resource>
  onCancel: () => void
}

export default function ResourceForm({ onSubmit, initialData, onCancel }: ResourceFormProps) {
  const [formData, setFormData] = useState<Partial<Resource>>(initialData || { type: 'document' })
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [tempFileUrl, setTempFileUrl] = useState<string | null>(null)

  // Cleanup temporary URLs when component unmounts
  useEffect(() => {
    return () => {
      if (tempFileUrl) {
        URL.revokeObjectURL(tempFileUrl)
      }
    }
  }, [tempFileUrl])

  const validateFileType = (file: File, type: Resource['type']): boolean => {
    if (type === 'other') return true
    return ALLOWED_TYPES[type].includes(file.type)
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    if (!validateFileType(selectedFile, formData.type as Resource['type'])) {
      setError(`Invalid file type. Please upload ${TYPE_EXTENSIONS[formData.type as Resource['type']]}`)
      e.target.value = '' // Reset file input
      return
    }

    // Cleanup previous temporary URL if it exists
    if (tempFileUrl) {
      URL.revokeObjectURL(tempFileUrl)
    }

    // Create a temporary URL for the file preview
    const newTempUrl = URL.createObjectURL(selectedFile)
    setTempFileUrl(newTempUrl)

    setError(null)
    setFile(selectedFile)
    setFormData(prev => ({
      ...prev,
      name: selectedFile.name,
      url: newTempUrl, // Set temporary URL for preview
      size: formatFileSize(selectedFile.size),
      mimeType: selectedFile.type
    }))
  }

  const handleTypeChange = (type: Resource['type']) => {
    setFormData(prev => ({ ...prev, type }))
    // Clear file if it doesn't match the new type
    if (file && !validateFileType(file, type)) {
      if (tempFileUrl) {
        URL.revokeObjectURL(tempFileUrl)
        setTempFileUrl(null)
      }
      setFile(null)
      setFormData(prev => ({
        ...prev,
        url: undefined,
        name: undefined,
        size: undefined,
        mimeType: undefined
      }))
      setError(`Please upload a new file that matches the selected type: ${TYPE_EXTENSIONS[type]}`)
    } else {
      setError(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setUploading(true)

    try {
      if (file) {
        // Validate file type again before upload
        if (!validateFileType(file, formData.type as Resource['type'])) {
          throw new Error(`Invalid file type. Please upload ${TYPE_EXTENSIONS[formData.type as Resource['type']]}`)
        }

        // Initialize CDN service with config (would come from environment variables)
        const cdnService = new CDNService({
          provider: 'cloudflare', // or 'aws' or 'azure'
          endpoint: process.env.NEXT_PUBLIC_CDN_ENDPOINT,
          bucket: process.env.NEXT_PUBLIC_CDN_BUCKET,
          publicUrl: process.env.NEXT_PUBLIC_CDN_PUBLIC_URL
        })

        // Upload to CDN
        const uploadResponse = await cdnService.uploadResource(file)

        // Update form data with CDN information
        const updatedData = {
          ...formData,
          url: uploadResponse.url,
          cdnUrl: uploadResponse.cdnUrl,
          cdnKey: uploadResponse.cdnKey,
          size: uploadResponse.size,
          mimeType: uploadResponse.mimeType,
          metadata: {
            cdnProvider: 'cloudflare' as const,
            lastModified: new Date().toISOString()
          }
        }

        onSubmit(updatedData)
      } else if (initialData) {
        // If we're editing and no new file is uploaded
        onSubmit(formData)
      } else {
        throw new Error('Please select a file to upload')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload resource')
    } finally {
      setUploading(false)
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">
            {initialData ? 'Edit Resource' : 'Add New Resource'}
          </h2>
          <button
            type="button"
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-fbla-blue focus:ring-fbla-blue sm:text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={formData.description || ''}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-fbla-blue focus:ring-fbla-blue sm:text-sm"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <select
              value={formData.type || 'document'}
              onChange={e => handleTypeChange(e.target.value as Resource['type'])}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-fbla-blue focus:ring-fbla-blue sm:text-sm"
            >
              <option value="document">Document</option>
              <option value="presentation">Presentation</option>
              <option value="spreadsheet">Spreadsheet</option>
              <option value="other">Other</option>
            </select>
            <p className="mt-1 text-sm text-gray-500">
              Accepted files: {TYPE_EXTENSIONS[formData.type as Resource['type']]}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">File</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-fbla-blue file:text-white hover:file:bg-fbla-gold"
              required={!initialData}
            />
            {formData.size && (
              <p className="mt-1 text-sm text-gray-500">Size: {formData.size}</p>
            )}
            {file && (
              <p className="mt-1 text-sm text-gray-500">Selected: {file.name}</p>
            )}
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="px-4 py-2 text-sm font-medium text-white bg-fbla-blue border border-transparent rounded-md hover:bg-fbla-gold disabled:opacity-50"
            >
              {uploading ? 'Uploading...' : initialData ? 'Save Changes' : 'Upload Resource'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
} 