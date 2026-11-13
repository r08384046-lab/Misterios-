import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'misterios_del_mundo_favorites_v1';

export interface FavoriteItem {
  id: string;
  type: 'country' | 'creature' | 'deity' | 'legend' | 'place' | 'story';
  title: string;
  subtitle: string;
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? (JSON.parse(saved) as FavoriteItem[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // Ignore storage quota errors
    }
  }, [favorites]);

  const isFavorite = useCallback(
    (id: string, type: FavoriteItem['type']) =>
      favorites.some((item) => item.id === id && item.type === type),
    [favorites]
  );

  const toggleFavorite = useCallback((item: FavoriteItem) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.id === item.id && f.type === item.type);
      if (exists) {
        return prev.filter((f) => !(f.id === item.id && f.type === item.type));
      }
      return [item, ...prev];
    });
  }, []);

  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  return { favorites, isFavorite, toggleFavorite, clearFavorites };
}
