import React, { useState } from 'react';
import animeData from '../data/anime.json';
import { AnimeCard } from '../components/cards/AnimeCard';
import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import './Browse.css';

export const Browse = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState('rating'); // 'rating', 'title', 'year'

  // Extract unique genres
  const genres = ['All', ...new Set(animeData.flatMap(a => a.genres))];

  // Filtering & Sorting pipeline
  const filteredAnime = animeData
    .filter(anime => {
      const matchesSearch = anime.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            anime.titleJp.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = selectedGenre === 'All' || anime.genres.includes(selectedGenre);
      const matchesStatus = selectedStatus === 'All' || anime.status === selectedStatus;
      return matchesSearch && matchesGenre && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'year') return b.releaseYear - a.releaseYear;
      return 0;
    });

  return (
    <div className="container browse-page">
      <div className="browse-header">
        <h1 className="browse-title">Discover & Browse Anime</h1>
        <p className="browse-subtitle">Filter through top anime by genre, broadcast status, and community ratings.</p>
      </div>

      {/* Control Filters Toolbar */}
      <div className="browse-controls glass">
        {/* Search input */}
        <div className="search-input-wrap">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by title, Japanese name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Filter controls */}
        <div className="filter-selects-group">
          {/* Genre Filter */}
          <div className="filter-item">
            <span className="filter-label">Genre:</span>
            <select 
              value={selectedGenre} 
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="table-select"
            >
              {genres.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="filter-item">
            <span className="filter-label">Status:</span>
            <select 
              value={selectedStatus} 
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="table-select"
            >
              <option value="All">All Statuses</option>
              <option value="Completed">Completed</option>
              <option value="Airing">Airing</option>
              <option value="Upcoming">Upcoming</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="filter-item">
            <span className="filter-label">Sort:</span>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="table-select"
            >
              <option value="rating">Top Rated</option>
              <option value="title">Title (A-Z)</option>
              <option value="year">Newest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Meta */}
      <div className="results-count-bar">
        <span>Found <strong>{filteredAnime.length}</strong> matching titles</span>
      </div>

      {/* Grid listing */}
      {filteredAnime.length === 0 ? (
        <div className="empty-list-state glass">
          <div className="empty-emoji">🔍</div>
          <h3>No matching anime found</h3>
          <p>Try adjusting your search query or reset genre/status filters.</p>
        </div>
      ) : (
        <div className="anime-grid">
          {filteredAnime.map(anime => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      )}
    </div>
  );
};
