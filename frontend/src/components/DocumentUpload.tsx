import { useState, useRef } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Upload, File, X, CheckCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Progress } from './ui/progress';

interface UploadedFile {
  file: File;
  id: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
  progress: number;
}

// Store uploaded files globally so they appear in history
export const uploadedFilesHistory: Array<{
  id: number;
  name: string;
  type: string;
  date: string;
  time: string;
  status: string;
  size: string;
}> = [];

export default function DocumentUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const newFiles: UploadedFile[] = selectedFiles.map((file) => ({
      file,
      id: `${Date.now()}-${Math.random()}`,
      status: 'pending',
      progress: 0,
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const simulateUpload = async (fileItem: UploadedFile): Promise<void> => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setFiles((prev) =>
            prev.map((f) =>
              f.id === fileItem.id 
                ? { ...f, status: 'success' as const, progress: 100 } 
                : f
            )
          );
          resolve();
        } else {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === fileItem.id 
                ? { ...f, status: 'uploading' as const, progress: Math.floor(progress) } 
                : f
            )
          );
        }
      }, 300);
    });
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error('Please select at least one file');
      return;
    }

    setIsUploading(true);

    try {
      // Simulate uploading each file
      for (const fileItem of files) {
        await simulateUpload(fileItem);
      }

      // Add to global history
      const now = new Date();
      files.forEach((fileItem) => {
        uploadedFilesHistory.unshift({
          id: Date.now() + Math.random(),
          name: fileItem.file.name,
          type: 'Document',
          date: now.toISOString().split('T')[0],
          time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          status: 'Success',
          size: `${(fileItem.file.size / 1024 / 1024).toFixed(2)} MB`,
        });
      });

      toast.success(`Successfully uploaded ${files.length} ${files.length === 1 ? 'file' : 'files'}!`);
      
      // Clear files after 2 seconds
      setTimeout(() => {
        setFiles([]);
      }, 2000);
    } catch (error) {
      toast.error('Failed to upload documents');
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    const newFiles: UploadedFile[] = droppedFiles.map((file) => ({
      file,
      id: `${Date.now()}-${Math.random()}`,
      status: 'pending',
      progress: 0,
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <Card className="bg-white/5 backdrop-blur-xl border-white/10">
      <CardContent className="p-8">
        {/* Upload Area */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
          className="relative border-2 border-dashed border-white/20 rounded-2xl p-16 text-center hover:border-blue-500/50 hover:bg-white/5 transition-all cursor-pointer group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative flex flex-col items-center gap-5">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                <Upload className="w-10 h-10" />
              </div>
            </div>
            <div>
              <p className="text-lg text-white mb-2">
                Drop your files here or click to browse
              </p>
              <p className="text-sm text-slate-400">
                Supports PDF, DOC, DOCX, TXT and other document formats
              </p>
              <p className="text-xs text-slate-500 mt-2">
                Maximum file size: 100MB
              </p>
            </div>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.txt,.xlsx,.xls,.ppt,.pptx"
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* File List */}
        {files.length > 0 && (
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white">Selected Files ({files.length})</h3>
              {files.some(f => f.status === 'pending') && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setFiles([])}
                  className="text-slate-400 hover:text-white"
                >
                  Clear All
                </Button>
              )}
            </div>
            
            <div className="space-y-3">
              {files.map((fileItem) => (
                <div
                  key={fileItem.id}
                  className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    fileItem.status === 'uploading' 
                      ? 'bg-blue-500/20' 
                      : fileItem.status === 'success'
                      ? 'bg-green-500/20'
                      : 'bg-purple-500/20'
                  }`}>
                    {fileItem.status === 'uploading' ? (
                      <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
                    ) : fileItem.status === 'success' ? (
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    ) : (
                      <File className="w-6 h-6 text-purple-400" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="text-white truncate mb-1">{fileItem.file.name}</div>
                    <div className="flex items-center gap-3">
                      <div className="text-sm text-slate-400">
                        {formatFileSize(fileItem.file.size)}
                      </div>
                      {fileItem.status === 'uploading' && (
                        <div className="text-sm text-blue-400">
                          {fileItem.progress}% uploaded
                        </div>
                      )}
                      {fileItem.status === 'success' && (
                        <div className="text-sm text-green-400">
                          Upload complete
                        </div>
                      )}
                    </div>
                    {fileItem.status === 'uploading' && (
                      <Progress value={fileItem.progress} className="h-1.5 mt-2" />
                    )}
                  </div>
                  
                  {fileItem.status === 'pending' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e: any) => {
                        e.stopPropagation();
                        removeFile(fileItem.id);
                      }}
                      className="text-slate-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <Button
              onClick={handleUpload}
              disabled={isUploading || files.every(f => f.status === 'success')}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-lg shadow-blue-500/25"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Uploading & Processing...
                </>
              ) : files.every(f => f.status === 'success') ? (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  All Files Uploaded
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5 mr-2" />
                  Upload {files.length} {files.length === 1 ? 'File' : 'Files'}
                </>
              )}
            </Button>
          </div>
        )}

        {/* Info Cards */}
        {files.length === 0 && (
          <div className="grid md:grid-cols-2 gap-4 mt-8">
            <div className="p-5 bg-blue-500/10 backdrop-blur-xl border border-blue-500/20 rounded-xl">
              <h3 className="text-white mb-2 text-sm">Supported Formats</h3>
              <ul className="text-xs text-slate-400 space-y-1">
                <li>• PDF Documents</li>
                <li>• Word Files (DOC, DOCX)</li>
                <li>• Excel Sheets (XLS, XLSX)</li>
                <li>• PowerPoint (PPT, PPTX)</li>
                <li>• Text Files (TXT)</li>
              </ul>
            </div>
            <div className="p-5 bg-purple-500/10 backdrop-blur-xl border border-purple-500/20 rounded-xl">
              <h3 className="text-white mb-2 text-sm">Processing</h3>
              <ul className="text-xs text-slate-400 space-y-1">
                <li>• Automatic text extraction</li>
                <li>• AI-powered indexing</li>
                <li>• Semantic search enabled</li>
                <li>• Instant availability for queries</li>
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
