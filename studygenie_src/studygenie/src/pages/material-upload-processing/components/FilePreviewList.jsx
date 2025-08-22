import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilePreviewList = ({ files, onRemoveFile, className = '' }) => {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const getFileIcon = (type) => {
    if (type?.includes('pdf')) return 'FileText';
    if (type?.includes('image')) return 'Image';
    return 'File';
  };

  const getFileIconColor = (type) => {
    if (type?.includes('pdf')) return 'text-red-500';
    if (type?.includes('image')) return 'text-blue-500';
    return 'text-muted-foreground';
  };

  if (files?.length === 0) return null;

  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-lg font-semibold text-foreground">
        Selected Files ({files?.length})
      </h3>
      <div className="space-y-3">
        {files?.map((file, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 p-4 bg-card border border-border rounded-lg"
          >
            {/* File Icon */}
            <div className="flex-shrink-0">
              <Icon 
                name={getFileIcon(file?.type)} 
                size={24} 
                className={getFileIconColor(file?.type)} 
              />
            </div>

            {/* File Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {file?.name}
              </p>
              <div className="flex items-center space-x-3 mt-1">
                <span className="text-xs text-muted-foreground">
                  {formatFileSize(file?.size)}
                </span>
                <span className="text-xs text-muted-foreground">
                  {file?.type?.split('/')?.[1]?.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="flex-1 max-w-[120px] hidden sm:block">
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full spring-transition ${
                    file?.status === 'completed' 
                      ? 'bg-success' 
                      : file?.status === 'processing' ?'bg-primary'
                      : file?.status === 'error' ?'bg-destructive' :'bg-muted-foreground'
                  }`}
                  style={{ 
                    width: file?.status === 'completed' ? '100%' : 
                           file?.status === 'processing' ? '60%' : 
                           file?.status === 'error' ? '100%' : '0%' 
                  }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1 capitalize">
                {file?.status || 'pending'}
              </p>
            </div>

            {/* Status Icon */}
            <div className="flex-shrink-0">
              {file?.status === 'completed' && (
                <Icon name="CheckCircle" size={20} className="text-success" />
              )}
              {file?.status === 'processing' && (
                <Icon name="Loader2" size={20} className="text-primary animate-spin" />
              )}
              {file?.status === 'error' && (
                <Icon name="AlertCircle" size={20} className="text-destructive" />
              )}
            </div>

            {/* Remove Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemoveFile(index)}
              className="flex-shrink-0 text-muted-foreground hover:text-destructive"
              aria-label="Remove file"
            >
              <Icon name="X" size={16} />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilePreviewList;