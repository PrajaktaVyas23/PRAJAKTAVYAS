import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const SearchBar = ({ 
  searchQuery, 
  onSearchChange, 
  onSearchSubmit,
  suggestions = [],
  className = '' 
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);

  const mockSuggestions = [
    { id: 1, text: 'calculus derivatives', type: 'topic', count: 12 },
    { id: 2, text: 'organic chemistry reactions', type: 'topic', count: 8 },
    { id: 3, text: 'photosynthesis process', type: 'topic', count: 15 },
    { id: 4, text: 'newton laws of motion', type: 'topic', count: 6 },
    { id: 5, text: 'english grammar rules', type: 'topic', count: 20 },
    { id: 6, text: 'world war 2 timeline', type: 'topic', count: 4 },
    { id: 7, text: 'data structures algorithms', type: 'topic', count: 18 }
  ];

  const filteredSuggestions = searchQuery?.length > 0 
    ? mockSuggestions?.filter(suggestion => 
        suggestion?.text?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      )?.slice(0, 5)
    : [];

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    onSearchChange(value);
    setShowSuggestions(value?.length > 0);
    setSelectedSuggestionIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions || filteredSuggestions?.length === 0) {
      if (e?.key === 'Enter') {
        onSearchSubmit(searchQuery);
      }
      return;
    }

    switch (e?.key) {
      case 'ArrowDown':
        e?.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev < filteredSuggestions?.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e?.preventDefault();
        setSelectedSuggestionIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e?.preventDefault();
        if (selectedSuggestionIndex >= 0) {
          handleSuggestionClick(filteredSuggestions?.[selectedSuggestionIndex]);
        } else {
          onSearchSubmit(searchQuery);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        break;
    }
  };

  const handleSuggestionClick = (suggestion) => {
    onSearchChange(suggestion?.text);
    onSearchSubmit(suggestion?.text);
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
  };

  const handleClearSearch = () => {
    onSearchChange('');
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
    searchRef?.current?.focus();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef?.current && !searchRef?.current?.contains(event?.target)) {
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      <div className="relative">
        <Icon 
          name="Search" 
          size={16} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
        />
        <Input
          type="search"
          placeholder="Search materials, topics, or notes..."
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="pl-10 pr-10"
        />
        {searchQuery && (
          <button
            onClick={handleClearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground spring-transition"
            aria-label="Clear search"
          >
            <Icon name="X" size={16} />
          </button>
        )}
      </div>
      {/* Search Suggestions */}
      {showSuggestions && filteredSuggestions?.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-elevation-2 z-50 max-h-60 overflow-y-auto"
        >
          {filteredSuggestions?.map((suggestion, index) => (
            <button
              key={suggestion?.id}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-muted spring-transition ${
                index === selectedSuggestionIndex ? 'bg-muted' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon name="Search" size={14} className="text-muted-foreground" />
                <div>
                  <span className="text-sm text-foreground">{suggestion?.text}</span>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-muted-foreground capitalize">{suggestion?.type}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{suggestion?.count} results</span>
                  </div>
                </div>
              </div>
              <Icon name="ArrowUpRight" size={14} className="text-muted-foreground" />
            </button>
          ))}
        </div>
      )}
      {/* No Results */}
      {showSuggestions && searchQuery?.length > 0 && filteredSuggestions?.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-elevation-2 z-50">
          <div className="px-4 py-6 text-center">
            <Icon name="Search" size={24} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No suggestions found</p>
            <p className="text-xs text-muted-foreground mt-1">
              Press Enter to search for "{searchQuery}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;