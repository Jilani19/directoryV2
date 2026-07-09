"use client";

/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";

export function useBookmarks() {
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("cgxp_bookmarked_companies");
      if (stored) {
        setBookmarkedIds(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load bookmarks", error);
    }
    setIsLoaded(true);
  }, []);

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const isBookmarked = prev.includes(id);
      const next = isBookmarked ? prev.filter((i) => i !== id) : [...prev, id];
      try {
        localStorage.setItem("cgxp_bookmarked_companies", JSON.stringify(next));
      } catch (error) {
        console.error("Failed to save bookmarks", error);
      }
      return next;
    });
  };

  const isBookmarked = (id: string) => bookmarkedIds.includes(id);

  return { bookmarkedIds, toggleBookmark, isBookmarked, isLoaded };
}
