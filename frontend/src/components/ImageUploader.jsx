import { useState } from 'react'

// Configuration
const CHUNK_SIZE = 256 * 1024 // 256 KB chunks
const MAX_RETRIES = 3

export default function ImageUploader({ onUpload, label = 'Upload image' }) {
  const [status, setStatus] = useState('')
  const [preview, setPreview] = useState('')

  // Generate a unique upload ID
  const generateUploadId = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  // Split file into chunks
  const createChunks = (file) => {
    const chunks = []
    let start = 0
    let index = 0
    while (start < file.size) {
      const end = Math.min(start + CHUNK_SIZE, file.size)
      chunks.push({
        index,
        blob: file.slice(start, end),
        start,
        end,
        isLast: end === file.size
      })
      start = end
      index++
    }
    return chunks
  }

  // Upload a single chunk with retry logic
  const uploadChunk = async (baseUrl, uploadId, chunk, totalChunks, retries = 0) => {
    const formData = new FormData()
    formData.append('chunk', chunk.blob)
    formData.append('uploadId', uploadId)
    formData.append('chunkIndex', chunk.index.toString())
    formData.append('totalChunks', totalChunks.toString())
    formData.append('isLast', chunk.isLast.toString())

    const response = await fetch(`${baseUrl}/api/upload/chunk`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    })

    if (!response.ok) {
      if (retries < MAX_RETRIES) {
        // Wait before retry with exponential backoff
        await new Promise(resolve => setTimeout(resolve, 1000 * (retries + 1)))
        return uploadChunk(baseUrl, uploadId, chunk, totalChunks, retries + 1)
      }
      const error = await response.json().catch(() => ({}))
      throw new Error(error.error || `Failed to upload chunk ${chunk.index + 1}`)
    }

    return response.json()
  }

  // Finalize the upload
  const finalizeUpload = async (baseUrl, uploadId, fileName, fileType, totalChunks) => {
    const response = await fetch(`${baseUrl}/api/upload/finalize`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uploadId, fileName, fileType, totalChunks }),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.error || 'Failed to finalize upload')
    }

    return response.json()
  }

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      setStatus('Only image files (JPEG, PNG, WebP, GIF) are allowed.')
      return
    }

    setStatus('Preparing upload...')
    setPreview('')

    try {
      const baseUrl = import.meta.env.VITE_API_URL || ''
      const uploadId = generateUploadId()
      const chunks = createChunks(file)
      const totalChunks = chunks.length

      setStatus(`Uploading... (0/${totalChunks} chunks)`)

      // Upload all chunks in parallel
      let uploadedChunks = 0
      await Promise.all(
        chunks.map(async (chunk) => {
          await uploadChunk(baseUrl, uploadId, chunk, totalChunks)
          uploadedChunks += 1
          setStatus(`Uploading... (${uploadedChunks}/${totalChunks} chunks)`)
        })
      )

      setStatus('Finalizing upload...')
      const result = await finalizeUpload(baseUrl, uploadId, file.name, file.type, totalChunks)

      setStatus('Upload successful')
      setPreview(result.url)
      onUpload(result.url)
    } catch (error) {
      setStatus(error.message || 'Upload failed')
      setPreview('')
      onUpload('')
    }
  }

  return (
    <div className="image-uploader">
      <label className="upload-label">
        {label}
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </label>
      {status && <p className="upload-status">{status}</p>}
      {preview && (
        <div className="upload-preview">
          <img src={preview} alt="Uploaded preview" />
          <p>{preview}</p>
        </div>
      )}
    </div>
  )
}
