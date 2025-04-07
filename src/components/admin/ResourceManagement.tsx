'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  DocumentIcon, 
  PencilIcon, 
  TrashIcon,
  PlusIcon,
  XMarkIcon,
  ArrowDownTrayIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline'

interface Resource {
  id: string
  title: string
  description: string
  type: 'document' | 'presentation' | 'spreadsheet' | 'other'
  url: string
  size: string
  createdAt: string
  updatedAt: string
}

interface ResourceManagementProps {
  onClose?: () => void
}

export default function ResourceManagement({ onClose }: ResourceManagementProps) {
  const [resources, setResources] = useState<Resource[]>([])
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editForm, setEditForm] = useState<Partial<Resource>>({})
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('')

  useEffect(() => {
    // Load resources from localStorage
    const storedResources = JSON.parse(localStorage.getItem('resources') || '[]')
    setResources(storedResources)
  }, [])

  const handleSaveResource = (resourceData: Partial<Resource>) => {
    if (!resourceData.id) return

    const updatedResources = resources.map(resource => 
      resource.id === resourceData.id ? { ...resource, ...resourceData, updatedAt: new Date().toISOString() } : resource
    )
    setResources(updatedResources)
    localStorage.setItem('resources', JSON.stringify(updatedResources))
    setShowEditModal(false)
    setSelectedResource(null)
  }

  const handleAddResource = (resourceData: Partial<Resource>) => {
    const newResource: Resource = {
      id: String(Date.now()),
      title: resourceData.title || '',
      description: resourceData.description || '',
      type: resourceData.type || 'other',
      url: resourceData.url || '',
      size: resourceData.size || '0 KB',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    const updatedResources = [...resources, newResource]
    setResources(updatedResources)
    localStorage.setItem('resources', JSON.stringify(updatedResources))
    setShowAddModal(false)
  }

  const handleDeleteResource = (resourceId: string) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      const updatedResources = resources.filter(resource => resource.id !== resourceId)
      setResources(updatedResources)
      localStorage.setItem('resources', JSON.stringify(updatedResources))
    }
  }

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = !filterType || resource.type === filterType
    return matchesSearch && matchesType
  })

  const resourceTypes = [
    { id: 'document', name: 'Document' },
    { id: 'presentation', name: 'Presentation' },
    { id: 'spreadsheet', name: 'Spreadsheet' },
    { id: 'other', name: 'Other' }
  ]

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h2 className="text-xl font-semibold text-gray-900">Resource Management</h2>
          <p className="mt-2 text-sm text-gray-700">
            Manage downloadable resources and documents for FBLA members.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-fbla-blue px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-fbla-gold focus:outline-none focus:ring-2 focus:ring-fbla-blue focus:ring-offset-2 sm:w-auto"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
            Add Resource
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="mb-4 flex gap-4">
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-fbla-blue focus:ring-fbla-blue sm:text-sm"
              />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="block rounded-md border-gray-300 shadow-sm focus:border-fbla-blue focus:ring-fbla-blue sm:text-sm"
              >
                <option value="">All Types</option>
                {resourceTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>

            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Title</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Type</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Size</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Last Updated</th>
                    <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredResources.map((resource) => (
                    <tr key={resource.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div className="flex items-center">
                          <DocumentTextIcon className="h-5 w-5 flex-shrink-0 text-gray-400" />
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">{resource.title}</div>
                            <div className="text-gray-500">{resource.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          resource.type === 'document' ? 'bg-blue-100 text-blue-800' :
                          resource.type === 'presentation' ? 'bg-yellow-100 text-yellow-800' :
                          resource.type === 'spreadsheet' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {resourceTypes.find(type => type.id === resource.type)?.name || 'Other'}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{resource.size}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {new Date(resource.updatedAt).toLocaleDateString()}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button
                          onClick={() => {
                            setSelectedResource(resource)
                            setEditForm(resource)
                            setShowEditModal(true)
                          }}
                          className="text-fbla-blue hover:text-fbla-gold mr-4"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteResource(resource.id)}
                          className="text-red-600 hover:text-red-900 mr-4"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-gray-900"
                        >
                          <ArrowDownTrayIcon className="h-5 w-5" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Resource Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Edit Resource</h3>
              <button
                onClick={() => {
                  setShowEditModal(false)
                  setSelectedResource(null)
                }}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault()
              handleSaveResource(editForm)
            }} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={editForm.title || ''}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-fbla-blue focus:ring-fbla-blue sm:text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={3}
                  value={editForm.description || ''}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-fbla-blue focus:ring-fbla-blue sm:text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                  Resource URL
                </label>
                <input
                  type="url"
                  id="url"
                  value={editForm.url || ''}
                  onChange={(e) => setEditForm({ ...editForm, url: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-fbla-blue focus:ring-fbla-blue sm:text-sm"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                    Resource Type
                  </label>
                  <select
                    id="type"
                    value={editForm.type || 'other'}
                    onChange={(e) => setEditForm({ ...editForm, type: e.target.value as Resource['type'] })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-fbla-blue focus:ring-fbla-blue sm:text-sm"
                    required
                  >
                    {resourceTypes.map(type => (
                      <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="size" className="block text-sm font-medium text-gray-700">
                    File Size
                  </label>
                  <input
                    type="text"
                    id="size"
                    value={editForm.size || ''}
                    onChange={(e) => setEditForm({ ...editForm, size: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-fbla-blue focus:ring-fbla-blue sm:text-sm"
                    placeholder="e.g., 2.5 MB"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false)
                    setSelectedResource(null)
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-fbla-blue border border-transparent rounded-md hover:bg-fbla-gold"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Add Resource Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Add New Resource</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault()
              handleAddResource(editForm)
            }} className="space-y-4">
              <div>
                <label htmlFor="new-title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  id="new-title"
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-fbla-blue focus:ring-fbla-blue sm:text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="new-description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="new-description"
                  rows={3}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-fbla-blue focus:ring-fbla-blue sm:text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="new-url" className="block text-sm font-medium text-gray-700">
                  Resource URL
                </label>
                <input
                  type="url"
                  id="new-url"
                  onChange={(e) => setEditForm({ ...editForm, url: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-fbla-blue focus:ring-fbla-blue sm:text-sm"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="new-type" className="block text-sm font-medium text-gray-700">
                    Resource Type
                  </label>
                  <select
                    id="new-type"
                    onChange={(e) => setEditForm({ ...editForm, type: e.target.value as Resource['type'] })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-fbla-blue focus:ring-fbla-blue sm:text-sm"
                    required
                  >
                    <option value="">Select a type</option>
                    {resourceTypes.map(type => (
                      <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="new-size" className="block text-sm font-medium text-gray-700">
                    File Size
                  </label>
                  <input
                    type="text"
                    id="new-size"
                    onChange={(e) => setEditForm({ ...editForm, size: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-fbla-blue focus:ring-fbla-blue sm:text-sm"
                    placeholder="e.g., 2.5 MB"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-fbla-blue border border-transparent rounded-md hover:bg-fbla-gold"
                >
                  Add Resource
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
} 