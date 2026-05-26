import React from 'react';

export function GameHeader({ player, totalStatus }) {
  return (
    <div className="main-stats">
      <h2>Милена RPG 🎰</h2>
      <div className="currency-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.9fr 0.9fr', gap: '8px', marginBottom: '10px', textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>
        <div style={{ color: '#facc15' }}>💰 {player.balances?.RUB?.toLocaleString('ru-RU')}₽</div>
        <div style={{ color: '#4cb64c' }}>💵 {player.balances?.USD?.toLocaleString('ru-RU')}$</div>
        <div style={{ color: '#38bdf8' }}>💶 {player.balances?.EUR?.toLocaleString('ru-RU')}€</div>
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