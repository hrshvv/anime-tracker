import React, { useState } from 'react';
import { useWatchlist } from '../context/WatchlistContext';
import animeData from '../data/anime.json';
import { AnimeCard } from '../components/cards/AnimeCard';
import { 
  Plus, 
  Minus, 
  Trash2, 
  CheckCircle, 
  Clock, 
  PauseCircle, 
  XCircle, 
  Calendar,
  Grid,
  List as ListIcon
} from 'lucide-react';
import './MyList.css';

export const MyList = () => {
  const { watchlist, updateItemStatus, updateProgress, updateScore, removeFromList } = useWatchlist();
  const [activeTab, setActiveTab] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'

  const categories = [
    { label: 'All', icon: null },
    { label: 'Watching', icon: <Clock size={16} /> },
    { label: 'Completed', icon: <CheckCircle size={16} /> },
    { label: 'On Hold', icon: <PauseCircle size={16} /> },
    { label: 'Dropped', icon: <XCircle size={16} /> },
    { label: 'Plan to Watch', icon: <Calendar size={16} /> }
  ];

  // Map watchlist items with full anime metadata
  const listWithDetails = watchlist.map(item => {
    const anime = animeData.find(a => a.id === item.animeId);
    return { ...item, anime };
  }).filter(item => item.anime !== undefined);

  // Filter based on selected tab
  const filteredItems = activeTab === 'All'
    ? listWithDetails
    : listWithDetails.filter(item => item.category === activeTab);

  return (
    <div className="container my-list-page">
      {/* Header Profile Summary */}
      <div className="my-list-header">
        <div>
          <h1 className="my-list-title">My Anime Watchlist</h1>
          <p className="my-list-subtitle">Manage your watch progression, update scores, and organize shows.</p>
        </div>

        {/* View Toggle */}
        <div className="view-mode-toggle glass">
          <button 
            className={`btn-icon ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
            title="Grid View"
          >
            <Grid size={18} />
          </button>
          <button 
            className={`btn-icon ${viewMode === 'table' ? 'active' : ''}`}
            onClick={() => setViewMode('table')}
            title="Table View"
          >
            <ListIcon size={18} />
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="watchlist-tabs-bar">
        {categories.map((cat) => {
          const count = cat.label === 'All' 
            ? listWithDetails.length 
            : listWithDetails.filter(i => i.category === cat.label).length;

          return (
            <button
              key={cat.label}
              className={`watchlist-tab-btn ${activeTab === cat.label ? 'active' : ''}`}
              onClick={() => setActiveTab(cat.label)}
            >
              {cat.icon}
              <span>{cat.label}</span>
              <span className="tab-counter">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      {filteredItems.length === 0 ? (
        <div className="empty-list-state glass">
          <div className="empty-emoji">📺</div>
          <h3>No titles found in "{activeTab}"</h3>
          <p>Explore titles from the catalog and add them to your tracking queue.</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="anime-grid">
          {filteredItems.map(({ anime }) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      ) : (
        /* Detailed Table / Tracker View */
        <div className="watchlist-table-container glass">
          <table className="watchlist-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Progress</th>
                <th>Score</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map(({ anime, category, progress, totalEpisodes, score }) => (
                <tr key={anime.id}>
                  {/* Anime Info */}
                  <td className="table-title-cell">
                    <img src={anime.image} alt={anime.title} className="table-poster-thumb" />
                    <div>
                      <span className="table-anime-title">{anime.title}</span>
                      <span className="table-anime-meta">{anime.releaseYear} • {anime.type}</span>
                    </div>
                  </td>

                  {/* Category Status */}
                  <td>
                    <select 
                      className="table-select"
                      value={category}
                      onChange={(e) => updateItemStatus(anime.id, e.target.value, anime.episodes)}
                    >
                      <option value="Watching">Watching</option>
                      <option value="Completed">Completed</option>
                      <option value="On Hold">On Hold</option>
                      <option value="Dropped">Dropped</option>
                      <option value="Plan to Watch">Plan to Watch</option>
                    </select>
                  </td>

                  {/* Episode Progress with +/- */}
                  <td>
                    <div className="table-progress-control">
                      <button 
                        className="btn btn-sm btn-ghost counter-btn"
                        onClick={() => updateProgress(anime.id, -1)}
                        disabled={progress <= 0}
                      >
                        <Minus size={14} />
                      </button>
                      
                      <span className="progress-counter-text">
                        {progress} / {totalEpisodes}
                      </span>

                      <button 
                        className="btn btn-sm btn-ghost counter-btn"
                        onClick={() => updateProgress(anime.id, 1)}
                        disabled={progress >= totalEpisodes}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </td>

                  {/* Rating Score */}
                  <td>
                    <div className="table-score-wrapper">
                      <span className="score-star">★</span>
                      <select 
                        className="table-select score-select"
                        value={score}
                        onChange={(e) => updateScore(anime.id, Number(e.target.value))}
                      >
                        <option value={0}>-</option>
                        {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map(n => (
                          <option key={n} value={n}>{n} / 10</option>
                        ))}
                      </select>
                    </div>
                  </td>

                  {/* Remove Button */}
                  <td>
                    <button 
                      className="btn btn-ghost btn-sm remove-row-btn"
                      onClick={() => removeFromList(anime.id)}
                      title="Remove from watchlist"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
