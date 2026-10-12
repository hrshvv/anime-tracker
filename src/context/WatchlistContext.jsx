import React, { createContext, useContext, useState, useEffect } from 'react';

const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('anipulse_watchlist');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse watchlist from storage:', e);
      }
    }
    // Default starter watchlist
    return [
      {
        animeId: 1,
        category: 'Watching',
        progress: 14,
        totalEpisodes: 28,
        score: 9,
        updatedAt: new Date().toISOString()
      },
      {
        animeId: 4,
        category: 'Completed',
        progress: 28,
        totalEpisodes: 28,
        score: 10,
        updatedAt: new Date().toISOString()
      },
      {
        animeId: 2,
        category: 'Plan to Watch',
        progress: 0,
        totalEpisodes: 23,
        score: 0,
        updatedAt: new Date().toISOString()
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('anipulse_watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const updateItemStatus = (animeId, category, totalEpisodes = 12) => {
    setWatchlist(prev => {
      const existing = prev.find(item => item.animeId === animeId);
      if (existing) {
        return prev.map(item =>
          item.animeId === animeId
            ? { ...item, category, updatedAt: new Date().toISOString() }
            : item
        );
      }
      return [
        ...prev,
        {
          animeId,
          category,
          progress: category === 'Completed' ? totalEpisodes : 0,
          totalEpisodes,
          score: 0,
          updatedAt: new Date().toISOString()
        }
      ];
    });
  };

  const updateProgress = (animeId, increment = 1) => {
    setWatchlist(prev =>
      prev.map(item => {
        if (item.animeId === animeId) {
          const newProgress = Math.max(0, Math.min(item.totalEpisodes, item.progress + increment));
          const newCategory = newProgress === item.totalEpisodes ? 'Completed' : item.category === 'Plan to Watch' ? 'Watching' : item.category;
          return {
            ...item,
            progress: newProgress,
            category: newCategory,
            updatedAt: new Date().toISOString()
          };
        }
        return item;
      })
    );
  };

  const updateScore = (animeId, score) => {
    setWatchlist(prev =>
      prev.map(item =>
        item.animeId === animeId
          ? { ...item, score, updatedAt: new Date().toISOString() }
          : item
      )
    );
  };

  const removeFromList = (animeId) => {
    setWatchlist(prev => prev.filter(item => item.animeId !== animeId));
  };

  const getItem = (animeId) => {
    return watchlist.find(item => item.animeId === animeId);
  };

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        updateItemStatus,
        updateProgress,
        updateScore,
        removeFromList,
        getItem
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => useContext(WatchlistContext);
