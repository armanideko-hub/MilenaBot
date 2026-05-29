import React from 'react';
// Импортируем каталог городов, чтобы шапка знала, где мы находимся
import { citiesCatalog } from '../data/cities'; 

export function GameHeader({ player, totalStatus }) {
  // Находим текущий город игрока
  const currentCity = citiesCatalog.find(c => c.id === player.currentCityId) || citiesCatalog[0];
  const activeCurrency = currentCity.currency || 'RUB';

  return (
    <div className="main-stats">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Милена RPG 🎰</h2>
        {/* Показываем красивую плашку текущего города */}
        <span style={{ fontSize: '13px', background: '#243447', padding: '4px 8px', borderRadius: '6px', color: '#fff', fontWeight: '600' }}>
          📍 {currentCity.name}
        </span>
      </div>

      {/* Сетка валют с динамической подсветкой активной */}
      <div className="currency-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '10px', textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>
        {/* РУБЛИ */}
        <div style={{ 
          color: '#facc15', 
          background: activeCurrency === 'RUB' ? '#facc1522' : 'transparent',
          border: activeCurrency === 'RUB' ? '1px solid #facc1555' : '1px solid transparent',
          borderRadius: '6px', padding: '4px'
        }}>
          💰 {player.balances?.RUB?.toLocaleString('ru-RU')}₽
        </div>
        
        {/* ДОЛЛАРЫ */}
        <div style={{ 
          color: '#4cb64c', 
          background: activeCurrency === 'USD' ? '#4cb64c22' : 'transparent',
          border: activeCurrency === 'USD' ? '1px solid #4cb64c55' : '1px solid transparent',
          borderRadius: '6px', padding: '4px'
        }}>
          💵 {player.balances?.USD?.toLocaleString('ru-RU')}$
        </div>
        
        {/* ЕВРО */}
        <div style={{ 
          color: '#38bdf8', 
          background: activeCurrency === 'EUR' ? '#38bdf822' : 'transparent',
          border: activeCurrency === 'EUR' ? '1px solid #38bdf855' : '1px solid transparent',
          borderRadius: '6px', padding: '4px'
        }}>
          💶 {player.balances?.EUR?.toLocaleString('ru-RU')}€
        </div>
      </div>

      <div className="stats-row">
        <span className="stat-item" style={{color: '#708499'}}>⚡ Энергия: {player.energy}/100</span>
        <span className="stat-item" style={{color: '#708499'}}>⭐ Статус: {totalStatus}</span>
      </div>
      
      <div className="energy-bar-container">
        <div className="energy-bar-fill" style={{ width: `${player.energy}%` }}></div>
      </div>
      
      {player.debt > 0 && <div className="debt-warning">⚠️ Долг: {player.debt?.toLocaleString()}₽</div>}
    </div>
  );
}