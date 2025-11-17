import { useState } from 'react';
import { Upload, FileText, X, CheckCircle, Loader, Trash2, Download } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
}

export function DocumentUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([
    {
      id: '1',
      name: 'Годовой отчет 2024.pdf',
      size: '3.2 MB',
      progress: 100,
      status: 'completed',
    },
    {
      id: '2',
      name: 'Договор аренды помещения.docx',
      size: '1.1 MB',
      progress: 65,
      status: 'uploading',
    },
    {
      id: '3',
      name: 'Презентация для инвесторов.pdf',
      size: '5.8 MB',
      progress: 100,
      status: 'completed',
    },
  ]);

  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    // Handle file drop
  };

  const toggleFileSelection = (id: string) => {
    const newSelection = new Set(selectedFiles);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedFiles(newSelection);
  };

  const removeFile = (id: string) => {
    setFiles(files.filter(f => f.id !== id));
    const newSelection = new Set(selectedFiles);
    newSelection.delete(id);
    setSelectedFiles(newSelection);
  };

  const getFileIcon = (name: string) => {
    return <FileText className="w-5 h-5" />;
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 mb-1">Загрузка документов</h1>
        <p className="text-gray-500">Загрузите документы для обработки AI-ассистентом</p>
      </div>

      {/* Upload Zone */}
      <Card
        className="p-12 border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors cursor-pointer bg-gray-50 hover:bg-blue-50/50"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-4">
            <Upload className="w-10 h-10 text-blue-600" />
          </div>
          <h3 className="text-gray-900 mb-2">
            Перетащите файлы сюда или нажмите для выбора
          </h3>
          <p className="text-gray-500 mb-4">
            Максимальный размер файла: 25 MB
          </p>
          <div className="flex gap-2 flex-wrap justify-center">
            <Badge variant="outline" className="bg-white">PDF</Badge>
            <Badge variant="outline" className="bg-white">DOCX</Badge>
            <Badge variant="outline" className="bg-white">JPG</Badge>
            <Badge variant="outline" className="bg-white">PNG</Badge>
            <Badge variant="outline" className="bg-white">TXT</Badge>
            <Badge variant="outline" className="bg-white">XLSX</Badge>
          </div>
        </div>
      </Card>

      {/* Upload Queue */}
      {files.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-gray-900">Очередь загрузки ({files.length})</h2>
            {selectedFiles.size > 0 && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Скачать выбранные
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Удалить выбранные
                </Button>
              </div>
            )}
          </div>

          <Card className="divide-y divide-gray-100">
            {files.map((file) => (
              <div key={file.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={selectedFiles.has(file.id)}
                    onChange={() => toggleFileSelection(file.id)}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />

                  {/* File Icon */}
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600">
                    {getFileIcon(file.name)}
                  </div>

                  {/* File Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-gray-900 truncate">{file.name}</span>
                      {file.status === 'completed' && (
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      )}
                      {file.status === 'uploading' && (
                        <Loader className="w-4 h-4 text-blue-600 flex-shrink-0 animate-spin" />
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-gray-500 text-xs">{file.size}</span>
                      {file.status === 'uploading' && (
                        <>
                          <div className="flex-1 max-w-xs">
                            <Progress value={file.progress} className="h-1" />
                          </div>
                          <span className="text-gray-500 text-xs">{file.progress}%</span>
                        </>
                      )}
                      {file.status === 'completed' && (
                        <Badge className="bg-green-100 text-green-700">Завершено</Badge>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(file.id)}
                    className="flex-shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </Card>
        </div>
      )}

      {/* Thumbnails Preview */}
      {files.filter(f => f.status === 'completed').length > 0 && (
        <div className="space-y-4">
          <h2 className="text-gray-900">Загруженные документы</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {files.filter(f => f.status === 'completed').map((file) => (
              <Card key={file.id} className="p-4 hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-3 flex items-center justify-center">
                  <FileText className="w-12 h-12 text-gray-400" />
                </div>
                <div className="text-gray-900 text-sm truncate mb-1">{file.name}</div>
                <div className="text-gray-500 text-xs">{file.size}</div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
