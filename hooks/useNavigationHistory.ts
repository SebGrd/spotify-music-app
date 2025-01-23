'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const HISTORY_KEY = 'navigation_history';

interface HistoryEntry {
  url: string;
  order: number;
}


export const useHistoryState = () => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [currentOrder, setCurrentOrder] = useState<number>(0); // Tracks the current order in the history
  const pathname = usePathname();

  const currentRoute =
    history.find((entry) => entry.order === currentOrder)?.url || null;

  const previousRoute =
    history.find((entry) => entry.order === currentOrder - 1)?.url || null;

  const nextRoute =
    history.find((entry) => entry.order === currentOrder + 1)?.url || null;

  // Load history on initial render
  useEffect(() => {
    const savedHistory = sessionStorage.getItem(HISTORY_KEY);
    if (savedHistory) {
      const parsedHistory: HistoryEntry[] = JSON.parse(savedHistory);
      setHistory(parsedHistory);
      setCurrentOrder(parsedHistory.length - 1); // Start at the most recent route
    }
  }, []);

  // Add a new route to history when the pathname or searchParams change
  useEffect(() => {
    const url = `${pathname}`;

    setHistory((prev) => {
      const existingEntry = prev.find((entry) => entry.url === url);

      // If the current route is already in history, update the order
      if (existingEntry) {
        setCurrentOrder(existingEntry.order);
        return prev;
      }

      // Trim history if navigating forward from an earlier point
      const newHistory = prev.filter((entry) => entry.order <= currentOrder);

      // Add the new route
      const updatedHistory = [
        ...newHistory,
        { url, order: currentOrder + 1 },
      ];

      sessionStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
      setCurrentOrder(currentOrder + 1); // Update to the new route's order
      return updatedHistory;
    });
  }, [pathname, currentOrder]);

  // Listen to `popstate` to track browser back/forward actions
  useEffect(() => {
    const handlePopState = () => {
      const savedHistory = sessionStorage.getItem(HISTORY_KEY);
      if (savedHistory) {
        const parsedHistory: HistoryEntry[] = JSON.parse(savedHistory);

        // Find the current URL in the history and update the currentOrder
        const currentUrl = `${window.location.pathname}`;
        const currentEntry = parsedHistory.find(
          (entry) => entry.url === currentUrl
        );

        if (currentEntry) {
          setHistory(parsedHistory); // Sync history
          setCurrentOrder(currentEntry.order); // Update current order
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return { previousRoute, currentRoute, nextRoute };
};
