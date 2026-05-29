import React, { useState } from 'react';
import Twemoji from 'react-twemoji';

export function ProfileScreen({ player, totalStatus, onBack, setPlayer, setMenuState }) {
  const [isBagOpen, setIsBagOpen] = useState(false);

  const items = player.inventory?.items || [];
  const maxSlots = player.inventory?.maxSlots || 8;
  const slots = Array.from({ length: maxSlots }, (_, index) => items[index] || null);

  // Считаем количество недвижимости игрока
  const housesCount = player.inventory?.houses?.length || 0;

  // Считаем общий итог на лету
  const totalEarned = (player.stats?.earnedWork || 0) + 
                      (player.stats?.earnedBusiness || 0) + 
                      (player.stats?.earnedCasino || 0);

  const upgradeBag = () => {
    if ((player.balances?.RUB || 0) < 5000) {
      alert('⚠️ Не хватает денег! Спортивный рюкзак стоит 5,000₽');
      return;
    }
    
    setPlayer(p => ({
      ...p,
      balances: { ...p.balances, RUB: p.balances.RUB - 5000 },
      inventory: { ...p.inventory, maxSlots: 16 }
    }));
    alert('🎒 Успех! Ты купил рюкзак на 16 слотов.');
  };

  return (
    <Twemoji options={{ className: 'twemoji' }}>
      <div className="menu-screen" style={{ maxWidth: '480px', margin: '0 auto' }}>
        <h3>👤 Личное Дело</h3>
        
        <div className="info-box" style={{ marginBottom: '15px', padding: '12px', textAlign: 'left' }}>
          <p style={{ margin: '4px 0' }}>Уровень солидности: <strong style={{ color: '#facc15' }}>{totalStatus} ⭐</strong></p>
          <p style={{ margin: '4px 0' }}>Одежда: <strong>{player.inventory?.clothes || 'Нет'}</strong></p>
          <p style={{ margin: '4px 0' }}>Транспорт: <strong>{player.inventory?.transport || 'Нет'}</strong></p>
          <p style={{ margin: '4px 0' }}>Недвижимость: <strong>{housesCount > 0 ? `${housesCount} шт.` : 'Нет объектов'}</strong></p>
          
          <hr style={{ border: '0', borderTop: '1px solid #243447', margin: '8px 0' }} />
          <p style={{ margin: '4px 0', fontSize: '13px', color: '#4cb64c' }}>Всего заработано: <strong>{totalEarned.toLocaleString()}₽</strong></p>
          
          {/* НОВАЯ КНОПКА ПЕРЕХОДА К ЖИЛЬЮ ВНУТРИ ИНФО-БОКСА */}
          <button 
            className="btn" 
            style={{ 
              background: '#2e7d32', 
              marginTop: '12px', 
              marginBottom: '4px',
              padding: '8px', 
              fontSize: '13px', 
              width: '100%',
              fontWeight: '600'
            }} 
            onClick={() => setMenuState('my_houses')}
          >
            🏠 Управление недвижимостью
          </button>
        </div>

        <button 
          className="btn" 
          style={{ background: isBagOpen ? '#2b3946' : '#3b82f6', marginBottom: '15px', width: '100%' }}
          onClick={() => setIsBagOpen(!isBagOpen)}
        >
          {isBagOpen ? '📂 Закрыть инвентарь' : '🎒 Открыть инвентарь'}
        </button>

        {isBagOpen && (
          <div style={{ background: '#18222f', padding: '15px', borderRadius: '10px', marginBottom: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '13px', color: '#708499' }}>Ячейки: {items.length} / {maxSlots}</span>
              {maxSlots === 8 && (
                <button onClick={upgradeBag} style={{ background: '#d97706', border: 'none', color: '#fff', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', cursor: 'pointer' }}>
                  ➕ Купить рюкзак (5,000₽)
                </button>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginTop: '10px' }}>
              {slots.map((item, index) => (
                <div 
                  key={index} 
                  style={{ 
                    aspectRatio: '1/1', 
                    background: item ? '#243447' : '#111823', 
                    borderRadius: '8px', 
                    border: item ? '1px solid #3b82f655' : '1px dashed #243447',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '20px', position: 'relative'
                  }}
                  title={item ? item.name : 'Пустой слот'}
                >
                  {item ? item.name.split(' ').pop() : ''} 
                  {item && (
                    <span style={{ position: 'absolute', bottom: '2px', left: '2px', fontSize: '8px', color: '#708499', maxWidth: '90%', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                      {item.name.slice(0, 6)}..
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <button className="btn" onClick={onBack}>↩️ Назад</button>
      </div>
    </Twemoji>
  );
}