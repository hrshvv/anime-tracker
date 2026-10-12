import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Plus, Check, Play, Eye } from 'lucide-react';
import { useWatchlist } from '../../context/WatchlistContext';
import './AnimeCard.css';

export const AnimeCard = ({ anime }) => {
  const { watchlist, updateItemStatus, updateProgress } = useWatchlist();
  const [menuOpen, setMenuOpen] = useState(false);

  const watchItem = watchlist.find(item => item.animeId === anime.id);
  const status = watchItem?.category || 'Not in List';
  const progress = watchItem?.progress || 0;
  const isCompleted = status === 'Completed';

  const categories = ['Watching', 'Completed', 'On Hold', 'Dropped', 'Plan to Watch'];

  return (
    <div className="glass-card anime-card">
      {/* Poster Image */}
      <div className="anime-card-poster-wrapper">
        <img src={anime.image} alt={anime.title} className="anime-card-poster" loading="lazy" />
        
        {/* Overlay Tags */}
        <div className="anime-card-badges">
          <span className="badge badge-accent">★ {anime.rating}</span>
          <span className="badge badge-secondary">{anime.type}</span>
        </div>

        {/* Quick Hover Controls */}
        <div className="anime-card-overlay">
          <Link to={`/anime/${anime.id}`} className="btn btn-secondary btn-sm overlay-btn">
            <Eye size={16} /> Details
          </Link>
          
          {watchItem && (
            <button 
              className="btn btn-primary btn-sm overlay-btn"
              onClick={(e) => {
                e.preventDefault();
                updateProgress(anime.id, 1);
              }}
              title="Add +1 watched episode"
              disabled={isCompleted}
            >
              <Plus size={16} /> +1 Ep
            </button>
          )}
        </div>
      </div>

      {/* Card Info Content */}
      <div className="anime-card-body">
        <Link to={`/anime/${anime.id}`}>
          <h3 className="anime-card-title" title={anime.title}>{anime.title}</h3>
        </Link>
        
        <div className="anime-card-meta">
          <span>{anime.releaseYear}</span>
          <span>•</span>
          <span>{anime.episodes} Eps</span>
          <span>•</span>
          <span className="anime-card-genre">{anime.genres[0]}</span>
        </div>

        {/* Progress Bar (if in list) */}
        {watchItem && (
          <div className="anime-progress-container">
            <div className="progress-labels">
              <span>Progress</span>
              <span>{progress} / {anime.episodes}</span>
            </div>
            <div className="progress-bar-track">
              <div 
                className="progress-bar-fill"
                style={{ width: `${Math.min(100, (progress / anime.episodes) * 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Status Dropdown Trigger */}
        <div className="anime-card-actions">
          <div className="status-dropdown">
            <button 
              className={`btn btn-sm ${watchItem ? 'btn-secondary status-btn-active' : 'btn-primary'}`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {watchItem ? (
                <>
                  <Check size={14} /> {status}
                </>
              ) : (
                <>
                  <Plus size={14} /> Add to List
                </>
              )}
            </button>

            {menuOpen && (
              <div className="status-menu glass">
                {categories.map((cat) => (
                  <button 
                    key={cat} 
                    className={`status-menu-item ${status === cat ? 'selected' : ''}`}
                    onClick={() => {
                      updateItemStatus(anime.id, cat, anime.episodes);
                      setMenuOpen(false);
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
