import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import animeData from '../data/anime.json';
import { useWatchlist } from '../context/WatchlistContext';
import { 
  Star, 
  ExternalLink, 
  Plus, 
  Check, 
  Eye, 
  EyeOff, 
  Calendar, 
  Tv, 
  ArrowLeft 
} from 'lucide-react';
import './AnimeDetail.css';

export const AnimeDetail = () => {
  const { id } = useParams();
  const anime = animeData.find(a => a.id === Number(id)) || animeData[0];
  const { watchlist, updateItemStatus, updateProgress } = useWatchlist();

  const [revealSpoiler, setRevealSpoiler] = useState(false);

  const watchItem = watchlist.find(item => item.animeId === anime.id);
  const status = watchItem?.category || 'Not in List';
  const progress = watchItem?.progress || 0;

  const categories = ['Watching', 'Completed', 'On Hold', 'Dropped', 'Plan to Watch'];

  return (
    <div className="anime-detail-page">
      {/* Background Banner */}
      <div 
        className="detail-backdrop"
        style={{ backgroundImage: `url(${anime.bannerImage})` }}
      >
        <div className="detail-backdrop-overlay" />
      </div>

      <div className="container detail-content-wrap">
        <Link to="/browse" className="back-link">
          <ArrowLeft size={16} /> Back to Browse
        </Link>

        <div className="detail-hero-card glass">
          {/* Cover Poster */}
          <div className="detail-poster-wrap">
            <img src={anime.image} alt={anime.title} className="detail-poster-img" />
          </div>

          {/* Core Info */}
          <div className="detail-info-main">
            <div className="detail-tags-row">
              <span className="badge badge-accent">★ {anime.rating} Rating</span>
              <span className="badge badge-success">{anime.status}</span>
              <span className="badge badge-warning">{anime.type}</span>
            </div>

            <h1 className="detail-title">{anime.title}</h1>
            <h2 className="detail-title-jp">{anime.titleJp}</h2>

            <div className="detail-meta-grid">
              <div><strong>Year:</strong> {anime.releaseYear} ({anime.season})</div>
              <div><strong>Episodes:</strong> {anime.episodes}</div>
              <div><strong>Studio:</strong> {anime.studio}</div>
              <div><strong>Language:</strong> {anime.language}</div>
            </div>

            <div className="detail-genres-row">
              {anime.genres.map(genre => (
                <span key={genre} className="badge badge-secondary">{genre}</span>
              ))}
            </div>

            {/* Synopsis */}
            <p className="detail-synopsis-text">{anime.synopsis}</p>

            {/* Interactive Tracking Control Box */}
            <div className="detail-tracker-box glass">
              <div className="tracker-status-select-wrap">
                <span className="tracker-label">My Watch Status:</span>
                <select 
                  className="table-select"
                  value={status}
                  onChange={(e) => updateItemStatus(anime.id, e.target.value, anime.episodes)}
                >
                  <option value="Not in List">Not in List</option>
                  {categories.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {watchItem && (
                <div className="tracker-episode-controls">
                  <span className="tracker-label">Episode Progress:</span>
                  <div className="detail-progress-btns">
                    <button 
                      className="btn btn-sm btn-secondary" 
                      onClick={() => updateProgress(anime.id, -1)}
                      disabled={progress <= 0}
                    >
                      -1
                    </button>
                    <span className="tracker-ep-count">
                      <strong>{progress}</strong> / {anime.episodes}
                    </span>
                    <button 
                      className="btn btn-sm btn-primary" 
                      onClick={() => updateProgress(anime.id, 1)}
                      disabled={progress >= anime.episodes}
                    >
                      +1 Ep
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Streaming Platform Links */}
            {anime.streamingLinks && anime.streamingLinks.length > 0 && (
              <div className="detail-streaming-section">
                <span className="streaming-label">Where to Watch:</span>
                <div className="streaming-links-group">
                  {anime.streamingLinks.map(stream => (
                    <a 
                      key={stream.platform} 
                      href={stream.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-secondary btn-sm"
                    >
                      {stream.platform} <ExternalLink size={14} />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Community Spoiler & Discussion Demonstration Block */}
        <div className="spoiler-demo-card glass">
          <div className="spoiler-demo-header">
            <h3>Community Plot Discussion (Season Climax)</h3>
            <button 
              className="btn btn-ghost btn-sm"
              onClick={() => setRevealSpoiler(!revealSpoiler)}
            >
              {revealSpoiler ? <EyeOff size={16} /> : <Eye size={16} />}
              {revealSpoiler ? 'Hide Spoilers' : 'Reveal Spoilers'}
            </button>
          </div>
          <p className="spoiler-explanation">
            Spoiler protection blur prevents uninvited plot reveals:
          </p>
          <div className={`spoiler-text-container ${revealSpoiler ? 'revealed' : ''}`}>
            <p className="spoiler-content">
              [MAJOR SPOILER ALERT]: In the climactic episode of this series, the true origins of the curse 
              and the protagonist's ancestor vow are revealed, triggering an earth-shattering shift in power!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
