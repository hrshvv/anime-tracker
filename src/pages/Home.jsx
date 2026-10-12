import React from 'react';
import { Link } from 'react-router-dom';
import { Play, TrendingUp, Sparkles } from 'lucide-react';
import { AnimeCard } from '../components/cards/AnimeCard';
import animeData from '../data/anime.json';
import './Home.css';

export const Home = () => {
  const featured = animeData.find(a => a.id === 1) || animeData[0];
  const trending = animeData.slice(0, 4);
  const topRated = [...animeData].sort((a, b) => b.rating - a.rating).slice(0, 4);

  return (
    <div className="home-page">
      {/* Hero Showcase Banner */}
      <section className="hero-banner">
        <div 
          className="hero-backdrop" 
          style={{ backgroundImage: `url(${featured.bannerImage})` }}
        />
        <div className="hero-gradient" />
        
        <div className="container hero-content">
          <div className="hero-tag">
            <Sparkles size={16} />
            <span>Featured Anime</span>
          </div>

          <h1 className="hero-title">{featured.title}</h1>
          <p className="hero-title-jp">{featured.titleJp}</p>
          
          <p className="hero-synopsis">{featured.synopsis}</p>

          <div className="hero-meta">
            <span className="badge badge-accent">★ {featured.rating} Rating</span>
            <span className="badge badge-success">{featured.status}</span>
            <span>{featured.releaseYear}</span>
            <span>•</span>
            <span>{featured.studio}</span>
          </div>

          <div className="hero-actions">
            <Link to={`/anime/${featured.id}`} className="btn btn-primary">
              <Play size={18} /> View Show Details
            </Link>
            <Link to="/browse" className="btn btn-secondary">
              Explore All Titles
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Feed */}
      <div className="container home-sections">
        {/* Trending Now */}
        <section className="section-block">
          <div className="section-header">
            <div className="section-title-wrap">
              <TrendingUp className="section-icon" />
              <h2>Trending Right Now</h2>
            </div>
            <Link to="/browse" className="section-link">View all &rarr;</Link>
          </div>

          <div className="anime-grid">
            {trending.map((anime) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>
        </section>

        {/* Top Rated Picks */}
        <section className="section-block">
          <div className="section-header">
            <div className="section-title-wrap">
              <span className="section-emoji">🏆</span>
              <h2>Highest Rated Hits</h2>
            </div>
            <Link to="/browse" className="section-link">View rankings &rarr;</Link>
          </div>

          <div className="anime-grid">
            {topRated.map((anime) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
