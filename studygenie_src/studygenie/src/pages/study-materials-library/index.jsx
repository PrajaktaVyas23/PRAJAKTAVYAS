import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ContextualHeader from '../../components/ui/ContextualHeader';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import StudyFlowBreadcrumb from '../../components/ui/StudyFlowBreadcrumb';
import QuickActionFAB from '../../components/ui/QuickActionFAB';
import FilterChips from './components/FilterChips';
import SearchBar from './components/SearchBar';
import SortOptions from './components/SortOptions';
import MaterialsGrid from './components/MaterialsGrid';
import BulkActions from './components/BulkActions';

const StudyMaterialsLibrary = () => {
  const navigate = useNavigate();
  
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({});
  const [sortBy, setSortBy] = useState('dateCreated');
  const [sortOrder, setSortOrder] = useState('desc');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Mock data
  const [materials, setMaterials] = useState([
    {
      id: 1,
      title: "Calculus Fundamentals: Derivatives and Applications",
      subject: "mathematics",
      type: "summary",
      difficulty: "intermediate",
      thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop",
      createdAt: "2025-01-20T10:30:00Z",
      lastAccessed: "2025-01-22T14:20:00Z",
      wordCount: 2450,
      progress: 75,
      isBookmarked: true,
      language: "english"
    },
    {
      id: 2,
      title: "Organic Chemistry Reaction Mechanisms",
      subject: "chemistry",
      type: "flashcards",
      difficulty: "advanced",
      thumbnail: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=300&fit=crop",
      createdAt: "2025-01-19T16:45:00Z",
      lastAccessed: "2025-01-21T09:15:00Z",
      wordCount: 1890,
      progress: 45,
      isBookmarked: false,
      language: "english"
    },
    {
      id: 3,
      title: "Photosynthesis Process and Light Reactions",
      subject: "biology",
      type: "quiz",
      difficulty: "beginner",
      thumbnail: "https://images.unsplash.com/photo-1574482620831-29d2c43c4b4d?w=400&h=300&fit=crop",
      createdAt: "2025-01-18T11:20:00Z",
      lastAccessed: "2025-01-22T16:30:00Z",
      wordCount: 1650,
      progress: 90,
      isBookmarked: true,
      language: "english"
    },
    {
      id: 4,
      title: "Newton\'s Laws of Motion - Physics Notes",
      subject: "physics",
      type: "notes",
      difficulty: "intermediate",
      thumbnail: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop",
      createdAt: "2025-01-17T14:10:00Z",
      lastAccessed: "2025-01-20T12:45:00Z",
      wordCount: 3200,
      progress: 30,
      isBookmarked: false,
      language: "english"
    },
    {
      id: 5,
      title: "English Grammar: Tenses and Usage",
      subject: "english",
      type: "summary",
      difficulty: "beginner",
      thumbnail: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
      createdAt: "2025-01-16T09:30:00Z",
      lastAccessed: "2025-01-19T15:20:00Z",
      wordCount: 2100,
      progress: 60,
      isBookmarked: true,
      language: "english"
    },
    {
      id: 6,
      title: "World War II Timeline and Key Events",
      subject: "history",
      type: "flashcards",
      difficulty: "intermediate",
      thumbnail: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=400&h=300&fit=crop",
      createdAt: "2025-01-15T13:45:00Z",
      lastAccessed: "2025-01-18T10:30:00Z",
      wordCount: 2800,
      progress: 20,
      isBookmarked: false,
      language: "english"
    },
    {
      id: 7,
      title: "Data Structures: Arrays and Linked Lists",
      subject: "computer-science",
      type: "quiz",
      difficulty: "advanced",
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
      createdAt: "2025-01-14T17:20:00Z",
      lastAccessed: "2025-01-21T14:10:00Z",
      wordCount: 3500,
      progress: 85,
      isBookmarked: true,
      language: "english"
    },
    {
      id: 8,
      title: "गणित के मूल सिद्धांत - बीजगणित",
      subject: "mathematics",
      type: "summary",
      difficulty: "beginner",
      thumbnail: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=300&fit=crop",
      createdAt: "2025-01-13T12:15:00Z",
      lastAccessed: "2025-01-17T11:45:00Z",
      wordCount: 1950,
      progress: 40,
      isBookmarked: false,
      language: "hindi"
    }
  ]);

  // Filter and sort materials
  const getFilteredAndSortedMaterials = () => {
    let filtered = [...materials];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered?.filter(material =>
        material?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        material?.subject?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    // Apply category filters
    Object.entries(selectedFilters)?.forEach(([category, filters]) => {
      if (filters?.length > 0) {
        filtered = filtered?.filter(material => {
          if (category === 'subjects') return filters?.includes(material?.subject);
          if (category === 'contentTypes') return filters?.includes(material?.type);
          if (category === 'languages') return filters?.includes(material?.language);
          if (category === 'difficulty') return filters?.includes(material?.difficulty);
          return true;
        });
      }
    });

    // Apply sorting
    filtered?.sort((a, b) => {
      let aValue = a?.[sortBy];
      let bValue = b?.[sortBy];

      if (sortBy === 'dateCreated' || sortBy === 'lastAccessed') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (sortBy === 'title') {
        aValue = aValue?.toLowerCase();
        bValue = bValue?.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  };

  const filteredMaterials = getFilteredAndSortedMaterials();

  // Event handlers
  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleSearchSubmit = (query) => {
    setSearchQuery(query);
    // In a real app, this would trigger a search API call
  };

  const handleFilterChange = (category, filters) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: filters
    }));
  };

  const handleClearAllFilters = () => {
    setSelectedFilters({});
  };

  const handleSortChange = (newSortBy, newSortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const handleStudyNow = (material) => {
    // Navigate to appropriate study interface based on material type
    if (material?.type === 'quiz') {
      navigate('/ai-tutor-chat-interface', { state: { material, mode: 'quiz' } });
    } else {
      navigate('/ai-tutor-chat-interface', { state: { material, mode: 'study' } });
    }
  };

  const handleGenerateQuiz = (material) => {
    navigate('/ai-tutor-chat-interface', { state: { material, mode: 'generateQuiz' } });
  };

  const handleCreateFlashcards = (material) => {
    navigate('/ai-tutor-chat-interface', { state: { material, mode: 'createFlashcards' } });
  };

  const handleBookmark = (materialId) => {
    setMaterials(prev => prev?.map(material =>
      material?.id === materialId
        ? { ...material, isBookmarked: !material?.isBookmarked }
        : material
    ));
  };

  const handleMaterialSelect = (materialId) => {
    setSelectedMaterials(prev =>
      prev?.includes(materialId)
        ? prev?.filter(id => id !== materialId)
        : [...prev, materialId]
    );
  };

  const handleClearSelection = () => {
    setSelectedMaterials([]);
  };

  const handleBulkAction = (actionType, materialIds) => {
    switch (actionType) {
      case 'bookmark':
        setMaterials(prev => prev?.map(material =>
          materialIds?.includes(material?.id)
            ? { ...material, isBookmarked: true }
            : material
        ));
        break;
      case 'unbookmark':
        setMaterials(prev => prev?.map(material =>
          materialIds?.includes(material?.id)
            ? { ...material, isBookmarked: false }
            : material
        ));
        break;
      case 'createFolder':
        // Handle folder creation
        console.log('Creating folder for materials:', materialIds);
        break;
      case 'generateQuiz': navigate('/ai-tutor-chat-interface', { 
          state: { 
            materials: materials?.filter(m => materialIds?.includes(m?.id)), 
            mode: 'bulkQuiz' 
          } 
        });
        break;
      case 'createFlashcards': navigate('/ai-tutor-chat-interface', { 
          state: { 
            materials: materials?.filter(m => materialIds?.includes(m?.id)), 
            mode: 'bulkFlashcards' 
          } 
        });
        break;
      case 'export':
        // Handle export
        console.log('Exporting materials:', materialIds);
        break;
      case 'delete':
        setMaterials(prev => prev?.filter(material => !materialIds?.includes(material?.id)));
        break;
    }
    setSelectedMaterials([]);
  };

  const handleLoadMore = () => {
    setLoading(true);
    // Simulate loading more materials
    setTimeout(() => {
      setLoading(false);
      setHasMore(false); // For demo purposes
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <ContextualHeader />
      <StudyFlowBreadcrumb />
      <main className="lg:ml-64 pb-20 lg:pb-6">
        <div className="px-4 lg:px-6 py-6 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Study Materials Library</h1>
              <p className="text-muted-foreground mt-1">
                {filteredMaterials?.length} material{filteredMaterials?.length !== 1 ? 's' : ''} available
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                iconName="Filter"
                iconPosition="left"
                className="lg:hidden"
              >
                Filters
              </Button>
              <Button
                variant="default"
                onClick={() => navigate('/material-upload-processing')}
                iconName="Upload"
                iconPosition="left"
              >
                <span className="hidden sm:inline">Upload Material</span>
                <span className="sm:hidden">Upload</span>
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            onSearchSubmit={handleSearchSubmit}
          />

          {/* Desktop Filters */}
          <div className="hidden lg:block">
            <FilterChips
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
              onClearAll={handleClearAllFilters}
            />
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="lg:hidden">
              <FilterChips
                selectedFilters={selectedFilters}
                onFilterChange={handleFilterChange}
                onClearAll={handleClearAllFilters}
              />
            </div>
          )}

          {/* Sort and View Options */}
          <SortOptions
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSortChange={handleSortChange}
            viewMode={viewMode}
            onViewModeChange={handleViewModeChange}
          />

          {/* Bulk Actions */}
          <BulkActions
            selectedMaterials={selectedMaterials}
            onClearSelection={handleClearSelection}
            onBulkAction={handleBulkAction}
          />

          {/* Materials Grid */}
          <MaterialsGrid
            materials={filteredMaterials}
            viewMode={viewMode}
            loading={loading}
            onStudyNow={handleStudyNow}
            onGenerateQuiz={handleGenerateQuiz}
            onCreateFlashcards={handleCreateFlashcards}
            onBookmark={handleBookmark}
            onLoadMore={handleLoadMore}
            hasMore={hasMore}
          />

          {/* Empty State for No Results */}
          {filteredMaterials?.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No materials found</h3>
                <p className="text-muted-foreground mb-6">
                  {searchQuery || Object.values(selectedFilters)?.some(f => f?.length > 0)
                    ? "Try adjusting your search terms or filters to find what you're looking for."
                    : "Upload your first study material to get started with personalized learning."
                  }
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  {(searchQuery || Object.values(selectedFilters)?.some(f => f?.length > 0)) && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedFilters({});
                      }}
                      iconName="X"
                      iconPosition="left"
                    >
                      Clear Filters
                    </Button>
                  )}
                  <Button
                    variant="default"
                    onClick={() => navigate('/material-upload-processing')}
                    iconName="Upload"
                    iconPosition="left"
                  >
                    Upload Material
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <BottomTabNavigation />
      <QuickActionFAB />
    </div>
  );
};

export default StudyMaterialsLibrary;