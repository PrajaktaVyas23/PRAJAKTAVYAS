import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ContextualHeader from '../../components/ui/ContextualHeader';
import StudyFlowBreadcrumb from '../../components/ui/StudyFlowBreadcrumb';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import QuickActionFAB from '../../components/ui/QuickActionFAB';
import FileUploadZone from './components/FileUploadZone';
import FilePreviewList from './components/FilePreviewList';
import ProcessingStatus from './components/ProcessingStatus';
import LanguageSelector from './components/LanguageSelector';
import ContentTypeSelector from './components/ContentTypeSelector';
import ProcessedContentPreview from './components/ProcessedContentPreview';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const MaterialUploadProcessing = () => {
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState('auto');
  const [detectedLanguage, setDetectedLanguage] = useState('');
  const [contentType, setContentType] = useState('');
  const [subject, setSubject] = useState('');
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [processingComplete, setProcessingComplete] = useState(false);
  const [extractedText, setExtractedText] = useState('');
  const [confidenceScore, setConfidenceScore] = useState(0);

  const processingSteps = [
    {
      title: 'File Upload',
      description: 'Uploading and validating your files'
    },
    {
      title: 'OCR Processing',
      description: 'Extracting text from images and PDFs'
    },
    {
      title: 'Content Analysis',
      description: 'Analyzing and structuring the content'
    },
    {
      title: 'AI Enhancement',
      description: 'Generating summaries and study materials'
    },
    {
      title: 'Finalization',
      description: 'Preparing your interactive study content'
    }
  ];

  const mockExtractedText = `Chapter 5: Photosynthesis

Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods with the help of chlorophyll pigments. During photosynthesis, plants convert carbon dioxide and water into glucose and oxygen using light energy.

The process can be summarized by the equation:
6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂

Key Components:
1. Chloroplasts - contain chlorophyll pigments
2. Stomata - allow gas exchange
3. Guard cells - control stomatal opening
4. Mesophyll cells - primary site of photosynthesis

Light-dependent reactions occur in the thylakoids, while light-independent reactions (Calvin cycle) occur in the stroma. The process is essential for life on Earth as it produces oxygen and forms the base of most food chains.

Factors affecting photosynthesis:
- Light intensity
- Carbon dioxide concentration
- Temperature
- Water availability
- Chlorophyll content

Understanding photosynthesis is crucial for comprehending plant biology, ecology, and the global carbon cycle.`;

  const handleFilesSelected = (files) => {
    const newFiles = files?.map(file => ({
      ...file,
      status: 'pending'
    }));
    setSelectedFiles(prev => [...prev, ...newFiles]);
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles(prev => prev?.filter((_, i) => i !== index));
  };

  const startProcessing = () => {
    if (selectedFiles?.length === 0) return;
    
    setIsProcessing(true);
    setProcessingStep(0);
    
    // Update file statuses to processing
    setSelectedFiles(prev => prev?.map(file => ({
      ...file,
      status: 'processing'
    })));

    // Simulate processing steps
    const stepDuration = 2000; // 2 seconds per step
    
    processingSteps?.forEach((_, index) => {
      setTimeout(() => {
        setProcessingStep(index);
        
        // Simulate language detection on first step
        if (index === 1) {
          setDetectedLanguage('English');
        }
        
        // Complete processing on last step
        if (index === processingSteps?.length - 1) {
          setTimeout(() => {
            setSelectedFiles(prev => prev?.map(file => ({
              ...file,
              status: 'completed'
            })));
            setIsProcessing(false);
            setProcessingComplete(true);
            setExtractedText(mockExtractedText);
            setConfidenceScore(92);
          }, stepDuration);
        }
      }, index * stepDuration);
    });
  };

  const handleContinueToLibrary = () => {
    navigate('/study-materials-library');
  };

  const canStartProcessing = selectedFiles?.length > 0 && contentType && subject && !isProcessing;

  return (
    <div className="min-h-screen bg-background">
      <ContextualHeader />
      <StudyFlowBreadcrumb />
      <main className="lg:ml-64 pb-20 lg:pb-6">
        <div className="max-w-4xl mx-auto px-4 lg:px-6 py-6 space-y-8">
          
          {!processingComplete ? (
            <>
              {/* Page Header */}
              <div className="text-center space-y-2">
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                  Upload Study Materials
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Transform your PDFs, images, and handwritten notes into interactive study content with AI-powered processing.
                </p>
              </div>

              {/* Upload Zone */}
              <FileUploadZone
                onFilesSelected={handleFilesSelected}
                isProcessing={isProcessing}
              />

              {/* File Preview */}
              <FilePreviewList
                files={selectedFiles}
                onRemoveFile={handleRemoveFile}
              />

              {/* Advanced Options */}
              {selectedFiles?.length > 0 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-foreground">
                      Processing Options
                    </h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                      iconName={showAdvancedOptions ? 'ChevronUp' : 'ChevronDown'}
                      iconPosition="right"
                    >
                      {showAdvancedOptions ? 'Hide' : 'Show'} Advanced Options
                    </Button>
                  </div>

                  <ContentTypeSelector
                    selectedType={contentType}
                    onTypeChange={setContentType}
                    selectedSubject={subject}
                    onSubjectChange={setSubject}
                  />

                  {showAdvancedOptions && (
                    <LanguageSelector
                      selectedLanguage={selectedLanguage}
                      onLanguageChange={setSelectedLanguage}
                      detectedLanguage={detectedLanguage}
                    />
                  )}
                </div>
              )}

              {/* Processing Status */}
              {isProcessing && (
                <ProcessingStatus
                  currentStep={processingStep}
                  steps={processingSteps}
                />
              )}

              {/* Action Buttons */}
              {selectedFiles?.length > 0 && !isProcessing && (
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button
                    variant="default"
                    onClick={startProcessing}
                    disabled={!canStartProcessing}
                    iconName="Zap"
                    iconPosition="left"
                    className="flex-1"
                  >
                    Start AI Processing
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedFiles([])}
                    iconName="RotateCcw"
                    iconPosition="left"
                    className="flex-1 sm:flex-initial"
                  >
                    Clear All
                  </Button>
                </div>
              )}

              {/* Help Section */}
              <div className="bg-muted/30 rounded-xl p-6">
                <div className="flex items-start space-x-4">
                  <Icon name="HelpCircle" size={24} className="text-primary flex-shrink-0 mt-1" />
                  <div className="space-y-3">
                    <h3 className="font-semibold text-foreground">
                      Tips for Better Processing
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start space-x-2">
                        <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                        <span>Use high-quality, well-lit images for better text recognition</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                        <span>Ensure text is clearly visible and not blurred or distorted</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                        <span>Select the correct content type and subject for optimal AI processing</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                        <span>Multiple files will be processed together for comprehensive study materials</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Processing Complete */
            (<ProcessedContentPreview
              extractedText={extractedText}
              confidenceScore={confidenceScore}
              onContinue={handleContinueToLibrary}
            />)
          )}
        </div>
      </main>
      <BottomTabNavigation />
      <QuickActionFAB />
    </div>
  );
};

export default MaterialUploadProcessing;