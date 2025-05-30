import React from 'react'
import { Upload, CheckCircle } from 'lucide-react'

const FileUploadSection = ({ resumeFile, uploadError, onFileChange }: {
  resumeFile: File | null
  uploadError: string
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Upload className="h-4 w-4" />
          <span className="text-sm font-medium">Upload Resume (PDF)</span>
        </div>
        {resumeFile && <CheckCircle className="h-4 w-4 text-green-500" />}
      </div>
      <input
        type="file"
        id="resume-upload"
        accept=".pdf"
        onChange={onFileChange}
        className="hidden"
      />
      <label
        htmlFor="resume-upload"
        className="w-full flex flex-col items-center justify-center px-4 py-6 bg-muted/50 rounded-md border-2 border-dashed border-muted-foreground/30 hover:border-primary cursor-pointer"
      >
        {resumeFile ? (
          <span className="text-sm">{resumeFile.name}</span>
        ) : (
          <div className="flex gap-2">
            <Upload className="h-4 w-4" />
            <span className="text-sm text-muted-foreground">
              Click to upload PDF resume (Max 8MB)
            </span>
          </div>
        )}
      </label>
      {uploadError && <p className="text-xs text-red-500">{uploadError}</p>}
    </div>
  )
}
export default FileUploadSection