import React, { useState } from 'react';
import { Users, MessageSquare, Plus, Check, Award } from 'lucide-react';
import './Clubs.css';

const initialClubs = [
  {
    id: 1,
    name: "Shingeki Lore Explorers",
    description: "Deep-dives into Attack on Titan worldbuilding, Eldian history, and theories.",
    members: 1420,
    banner: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80",
    category: "Lore & Discussion",
    joined: true
  },
  {
    id: 2,
    name: "Jujutsu Sorcery Hub",
    description: "Discussing JJK domain expansions, animation choreography, and manga leaks.",
    members: 2890,
    banner: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80",
    category: "Action / Shonen",
    joined: false
  },
  {
    id: 3,
    name: "Retro Anime & 90s Classics",
    description: "Appreciating Cowboy Bebop, Evangelion, Yu Yu Hakusho, and vintage cel animation.",
    members: 950,
    banner: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80",
    category: "Classics",
    joined: false
  }
];

export const Clubs = () => {
  const [clubs, setClubs] = useState(initialClubs);
  const [activePollVote, setActivePollVote] = useState(null);
  const [pollVotes, setPollVotes] = useState({
    "Eren Jaeger": 340,
    "Satoru Gojo": 610,
    "Levi Ackerman": 480
  });

  const toggleJoin = (id) => {
    setClubs(prev => prev.map(club => {
      if (club.id === id) {
        return {
          ...club,
          joined: !club.joined,
          members: club.joined ? club.members - 1 : club.members + 1
        };
      }
      return club;
    }));
  };

  const castVote = (candidate) => {
    if (activePollVote) return;
    setActivePollVote(candidate);
    setPollVotes(prev => ({
      ...prev,
      [candidate]: prev[candidate] + 1
    }));
  };

  const totalVotes = Object.values(pollVotes).reduce((a, b) => a + b, 0);

  return (
    <div className="container clubs-page">
      <div className="clubs-header">
        <div>
          <h1 className="clubs-title">Community Clubs & Polls</h1>
          <p className="clubs-subtitle">Join customized fan clubs, vote on community polls, and discuss episodes.</p>
        </div>
      </div>

      {/* Featured Weekly Community Poll */}
      <section className="poll-showcase-card glass">
        <div className="poll-badge">
          <Award size={16} /> Weekly Featured Poll
        </div>
        <h2 className="poll-question">Who is the most influential modern anime character?</h2>
        <p className="poll-instructions">Cast your vote to see real-time community results:</p>

        <div className="poll-options-list">
          {Object.entries(pollVotes).map(([candidate, count]) => {
            const percentage = Math.round((count / totalVotes) * 100);
            const isVoted = activePollVote === candidate;

            return (
              <div 
                key={candidate} 
                className={`poll-option-card glass ${isVoted ? 'voted' : ''}`}
                onClick={() => castVote(candidate)}
              >
                <div 
                  className="poll-option-progress" 
                  style={{ width: `${percentage}%` }}
                />
                <div className="poll-option-content">
                  <span className="poll-candidate-name">{candidate}</span>
                  <span className="poll-percentage">{percentage}% ({count} votes)</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Clubs Grid */}
      <section className="clubs-section">
        <h2 className="clubs-section-heading">Featured Clubs</h2>
        <div className="clubs-grid">
          {clubs.map(club => (
            <div key={club.id} className="glass-card club-card">
              <div 
                className="club-banner" 
                style={{ backgroundImage: `url(${club.banner})` }}
              >
                <span className="badge badge-accent club-category-tag">{club.category}</span>
              </div>
              <div className="club-body">
                <h3 className="club-name">{club.name}</h3>
                <p className="club-desc">{club.description}</p>
                <div className="club-footer">
                  <div className="club-members-count">
                    <Users size={16} />
                    <span>{club.members.toLocaleString()} fans</span>
                  </div>
                  <button 
                    className={`btn btn-sm ${club.joined ? 'btn-secondary joined' : 'btn-primary'}`}
                    onClick={() => toggleJoin(club.id)}
                  >
                    {club.joined ? <Check size={14} /> : <Plus size={14} />}
                    {club.joined ? 'Joined' : 'Join Club'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
