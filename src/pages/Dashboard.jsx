import React from 'react';
import { useWatchlist } from '../context/WatchlistContext';
import animeData from '../data/anime.json';
import { 
  BarChart2, 
  CheckCircle, 
  Clock, 
  Tv, 
  Flame, 
  Star 
} from 'lucide-react';
import './Dashboard.css';

export const Dashboard = () => {
  const { watchlist } = useWatchlist();

  // Metrics calculations
  const totalEntries = watchlist.length;
  const completedCount = watchlist.filter(i => i.category === 'Completed').length;
  const watchingCount = watchlist.filter(i => i.category === 'Watching').length;
  const planCount = watchlist.filter(i => i.category === 'Plan to Watch').length;

  const totalEpisodesWatched = watchlist.reduce((acc, curr) => acc + curr.progress, 0);
  // Estimate ~24 mins per anime episode -> hours
  const totalHoursSpent = Math.round((totalEpisodesWatched * 24) / 60);

  const ratedItems = watchlist.filter(i => i.score > 0);
  const averageScore = ratedItems.length > 0
    ? (ratedItems.reduce((acc, curr) => acc + curr.score, 0) / ratedItems.length).toFixed(1)
    : 'N/A';

  const completionRate = totalEntries > 0 ? Math.round((completedCount / totalEntries) * 100) : 0;

  // Breakdown by genre from tracked list
  const genreCounts = {};
  watchlist.forEach(item => {
    const anime = animeData.find(a => a.id === item.animeId);
    if (anime) {
      anime.genres.forEach(g => {
        genreCounts[g] = (genreCounts[g] || 0) + 1;
      });
    }
  });

  const maxGenreCount = Math.max(...Object.values(genreCounts), 1);

  return (
    <div className="container dashboard-page">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Watching Stats & Analytics</h1>
        <p className="dashboard-subtitle">Visual breakdown of your viewing habits, progress, and genre interests.</p>
      </div>

      {/* Metric Stat Cards */}
      <div className="stats-metric-grid">
        <div className="glass-card stat-card">
          <div className="stat-card-icon icon-purple">
            <Tv size={24} />
          </div>
          <div>
            <div className="stat-value">{totalEntries}</div>
            <div className="stat-label">Total Shows in List</div>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-card-icon icon-blue">
            <Clock size={24} />
          </div>
          <div>
            <div className="stat-value">{totalEpisodesWatched}</div>
            <div className="stat-label">Episodes Watched ({totalHoursSpent} hrs)</div>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-card-icon icon-green">
            <CheckCircle size={24} />
          </div>
          <div>
            <div className="stat-value">{completionRate}%</div>
            <div className="stat-label">Completion Ratio</div>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-card-icon icon-yellow">
            <Star size={24} />
          </div>
          <div>
            <div className="stat-value">{averageScore}</div>
            <div className="stat-label">Mean Rating Score</div>
          </div>
        </div>
      </div>

      {/* Visual Analytics Sections */}
      <div className="charts-grid">
        {/* Watch Status Distribution */}
        <div className="glass-card chart-card">
          <h2 className="chart-title">Watch Status Distribution</h2>
          <div className="status-bars-list">
            <div className="bar-stat-row">
              <div className="bar-labels">
                <span>Watching</span>
                <span>{watchingCount}</span>
              </div>
              <div className="bar-bg">
                <div 
                  className="bar-fill bar-watching" 
                  style={{ width: `${totalEntries ? (watchingCount / totalEntries) * 100 : 0}%` }} 
                />
              </div>
            </div>

            <div className="bar-stat-row">
              <div className="bar-labels">
                <span>Completed</span>
                <span>{completedCount}</span>
              </div>
              <div className="bar-bg">
                <div 
                  className="bar-fill bar-completed" 
                  style={{ width: `${totalEntries ? (completedCount / totalEntries) * 100 : 0}%` }} 
                />
              </div>
            </div>

            <div className="bar-stat-row">
              <div className="bar-labels">
                <span>Plan to Watch</span>
                <span>{planCount}</span>
              </div>
              <div className="bar-bg">
                <div 
                  className="bar-fill bar-plan" 
                  style={{ width: `${totalEntries ? (planCount / totalEntries) * 100 : 0}%` }} 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Top Genre Affinity */}
        <div className="glass-card chart-card">
          <h2 className="chart-title">Preferred Anime Genres</h2>
          {Object.keys(genreCounts).length === 0 ? (
            <p className="no-stats-text">Add titles to your list to generate genre affinity analytics.</p>
          ) : (
            <div className="genre-bars-list">
              {Object.entries(genreCounts).map(([genre, count]) => (
                <div key={genre} className="genre-stat-item">
                  <div className="genre-meta-label">
                    <span>{genre}</span>
                    <span>{count} title{count > 1 ? 's' : ''}</span>
                  </div>
                  <div className="bar-bg">
                    <div 
                      className="bar-fill bar-genre" 
                      style={{ width: `${(count / maxGenreCount) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
