import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FileUploadZone = ({ onFilesSelected, isProcessing, className = '' }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const supportedFormats = [
    { type: 'PDF', icon: 'FileText', color: 'text-red-500' },
    { type: 'JPG', icon: 'Image', color: 'text-blue-500' },
    { type: 'PNG', icon: 'Image', color: 'text-green-500' }
  ];

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e?.dataTransfer?.files);
    onFilesSelected(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e?.target?.files);
    onFilesSelected(files);
  };

  const openFileDialog = () => {
    fileInputRef?.current?.click();
  };

  const openCamera = () => {
    if (fileInputRef?.current) {
      fileInputRef?.current?.setAttribute('capture', 'environment');
      fileInputRef?.current?.click();
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center spring-transition ${
          isDragOver
            ? 'border-primary bg-primary/5'
            : isProcessing
            ? 'border-muted bg-muted/20' :'border-border hover:border-primary/50 hover:bg-muted/20'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="flex flex-col items-center space-y-4">
          {/* Upload Icon */}
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
            isProcessing ? 'bg-muted' : 'bg-primary/10'
          }`}>
            <Icon 
              name={isProcessing ? 'Loader2' : 'Upload'} 
              size={32} 
              className={`${
                isProcessing ? 'text-muted-foreground animate-spin' : 'text-primary'
              }`} 
            />
          </div>

          {/* Upload Text */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">
              {isProcessing ? 'Processing Files...' : 'Upload Study Materials'}
            </h3>
            <p className="text-sm text-muted-foreground max-w-md">
              {isProcessing 
                ? 'Please wait while we process your files and extract content'
                : 'Drag and drop your files here, or click to browse. Support for PDFs, images, and handwritten notes.'
              }
            </p>
          </div>

          {/* Action Buttons */}
          {!isProcessing && (
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="default"
                onClick={openFileDialog}
                iconName="FolderOpen"
                iconPosition="left"
                className="min-w-[140px]"
              >
                Browse Files
              </Button>
              <Button
                variant="outline"
                onClick={openCamera}
                iconName="Camera"
                iconPosition="left"
                className="min-w-[140px] sm:hidden"
              >
                Take Photo
              </Button>
            </div>
          )}

          {/* Supported Formats */}
          <div className="flex items-center justify-center space-x-6 pt-4">
            {supportedFormats?.map((format) => (
              <div key={format?.type} className="flex items-center space-x-2">
                <Icon name={format?.icon} size={16} className={format?.color} />
                <span className="text-xs text-muted-foreground font-medium">
                  {format?.type}
                </span>
              </div>
            ))}
          </div>

          {/* File Size Limit */}
          <p className="text-xs text-muted-foreground">
            Maximum file size: 10MB per file
          </p>
        </div>
      </div>
    </div>
  );
};

export default FileUploadZone;