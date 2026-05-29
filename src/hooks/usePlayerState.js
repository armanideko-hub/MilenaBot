import { useState, useEffect } from 'react';
import { initialState } from '../constants/initialState';
import { citiesCatalog } from '../data/cities';
import { useGameTimer } from './useGameTimer';

export function usePlayerState() {
  const hasSavedGame = localStorage.getItem('milena_v4_player');
  const [menuState, setMenuState] = useState(hasSavedGame ? 'main' : 'story_selection');

  // Инициализация игрока
  const [player, setPlayer] = useState(() => {
    try {
      const saved = localStorage.getItem('milena_v4_player');
      if (!saved) return initialState;
      const parsed = JSON.parse(saved);
      
      return {
        ...initialState,
        ...parsed,
        balances: { ...initialState.balances, ...parsed.balances },
        inventory: { ...initialState.inventory, ...parsed.inventory },
        stats: { ...initialState.stats, ...parsed.stats }
      };
    } catch (e) {
      console.error("Ошибка загрузки сохранения:", e);
      return initialState;
    }
  });

  // ВЫЧИСЛЯЕМЫЕ ПЕРЕМЕННЫЕ
  const currentCity = citiesCatalog.find(c => c.id === player.currentCityId) || citiesCatalog[0];

  const rawStatus = player && player.inventory?.houses 
    ? (player.baseStatus + player.inventory.houses.reduce((sum, h) => sum + (h.statusBoost || 0), 0)) 
    : player?.baseStatus || 0;

  const totalStatus = player.debt > 0 ? Math.floor(rawStatus * 0.8) : rawStatus;
  const maxLoan = Math.max(1000, totalStatus * 1500);

  // Автосохранение
  useEffect(() => {
    if (player) {
      localStorage.setItem('milena_v4_player', JSON.stringify(player));
    }
  }, [player]);

  // Таймер
  useGameTimer(player, setPlayer);

  // Чит-код
  useEffect(() => {
    const runAdminCheat = () => {
      setPlayer(p => {
        if (!p) return p;
        return {
          ...p,
          balances: { 
            RUB: (p.balances.RUB || 0) + 10000000, 
            USD: (p.balances.USD || 0) + 5000, 
            EUR: (p.balances.EUR || 0) + 3000 
          },
          baseStatus: (p.baseStatus || 0) + 1000
        };
      });
    };
    window.runAdminCheat = runAdminCheat;
    return () => { delete window.runAdminCheat; };
  }, []);

  return {
    player, setPlayer,
    menuState, setMenuState,
    currentCity, totalStatus, maxLoan
  };
}