import React from 'react';
import Select from '../../../components/ui/Select';

const ContentTypeSelector = ({ selectedType, onTypeChange, selectedSubject, onSubjectChange, className = '' }) => {
  const contentTypeOptions = [
    { value: 'textbook', label: 'Textbook Chapter', description: 'Academic textbook content' },
    { value: 'notes', label: 'Class Notes', description: 'Handwritten or typed notes' },
    { value: 'handouts', label: 'Study Handouts', description: 'Teacher-provided materials' },
    { value: 'research', label: 'Research Paper', description: 'Academic research content' },
    { value: 'worksheet', label: 'Worksheet/Assignment', description: 'Practice problems and exercises' },
    { value: 'presentation', label: 'Presentation Slides', description: 'PowerPoint or slide content' },
    { value: 'reference', label: 'Reference Material', description: 'Additional study resources' }
  ];

  const subjectOptions = [
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'physics', label: 'Physics' },
    { value: 'chemistry', label: 'Chemistry' },
    { value: 'biology', label: 'Biology' },
    { value: 'computer-science', label: 'Computer Science' },
    { value: 'english', label: 'English Literature' },
    { value: 'history', label: 'History' },
    { value: 'geography', label: 'Geography' },
    { value: 'economics', label: 'Economics' },
    { value: 'political-science', label: 'Political Science' },
    { value: 'psychology', label: 'Psychology' },
    { value: 'sociology', label: 'Sociology' },
    { value: 'philosophy', label: 'Philosophy' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'medicine', label: 'Medicine' },
    { value: 'law', label: 'Law' },
    { value: 'business', label: 'Business Studies' },
    { value: 'arts', label: 'Arts & Design' },
    { value: 'languages', label: 'Foreign Languages' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Content Type"
          description="Help us understand your material better"
          options={contentTypeOptions}
          value={selectedType}
          onChange={onTypeChange}
          searchable
          required
        />

        <Select
          label="Subject Category"
          description="Select the academic subject"
          options={subjectOptions}
          value={selectedSubject}
          onChange={onSubjectChange}
          searchable
          required
        />
      </div>

      {selectedType && selectedSubject && (
        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <div className="w-5 h-5 rounded-full bg-primary flex-shrink-0 mt-0.5 flex items-center justify-center">
              <div className="w-2 h-2 bg-primary-foreground rounded-full" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-primary-foreground">
                Processing Optimization
              </p>
              <p className="text-xs text-primary-foreground/80 mt-1">
                Based on your selections, we'll optimize the AI processing for {selectedType} content in {selectedSubject} to provide the most relevant summaries and study materials.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentTypeSelector;