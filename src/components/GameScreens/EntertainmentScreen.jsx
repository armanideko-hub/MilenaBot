import React, { useState } from 'react';
import Twemoji from 'react-twemoji';
import { formatMoney } from '../../data/currencies';

// 1. Принимаем currentCity в пропсах
export function EntertainmentScreen({ player, setPlayer, onBack, currentCity }) {
  // 2. Определяем активную валюту
  const activeCurrency = currentCity?.currency || 'RUB';
  
  const [bet, setBet] = useState(1000);
  const [slots, setSlots] = useState(['🎰', '🎰', '🎰']);
  const [statusMessage, setStatusMessage] = useState('Испытай свою удачу!');

  const emojis = ['🍒', '🍋', '💎', '7️⃣'];

  const playSlots = () => {
    // 3. Используем активную валюту для проверки баланса
    const currencyConfig = require('../../data/currencies').currencies[activeCurrency] || require('../../data/currencies').currencies.RUB;
    const betConverted = activeCurrency === 'RUB' ? bet : Number((bet / currencyConfig.rateToRUB).toFixed(2));
    
    const playerBalance = player.balances?.[activeCurrency] || 0;
    if (playerBalance < betConverted) return alert(`Не хватает средств! Нужно ${formatMoney(bet, activeCurrency)}`);

    const randomChance = Math.random() * 100;
    let res1, res2, res3;
    let prize = 0;
    let message = '';

    if (randomChance <= 15) {
      const winEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      res1 = res2 = res3 = winEmoji;
      prize = betConverted * 4; 
      // 4. Форматируем сообщения выигрыша/проигрыша
      // Передаем prize в оригинальной валюте для formatMoney? Нет, formatMoney сам конвертирует.
      // Нам нужно передать рублевый эквивалент выигрыша в formatMoney
      const prizeRub = bet * 4;
      message = `🎉 КРУПНЫЙ ВЫИГРЫШ! Вы забрали ${formatMoney(prizeRub - bet, activeCurrency)}!`;
    } else {
      res1 = emojis[Math.floor(Math.random() * emojis.length)];
      res2 = emojis[Math.floor(Math.random() * emojis.length)];
      res3 = emojis[Math.floor(Math.random() * emojis.length)];
      
      if (res1 === res2 && res2 === res3) {
        res1 = emojis[(emojis.indexOf(res1) + 1) % emojis.length];
      }

      prize = 0;
      message = `😢 Увы, мимо... Автомат забирает ${formatMoney(bet, activeCurrency)}`;
    }

    setSlots([res1, res2, res3]);
    setStatusMessage(message);

    setPlayer(prev => {
      const currentBalance = prev.balances?.[activeCurrency] || 0;
      const totalLost = prev.stats?.lostCasino || 0;
      const totalEarned = prev.stats?.earnedCasino || 0;

      const prizeRub = bet * 4;

      return {
        ...prev,
        balances: {
          ...prev.balances,
          // 5. Обновляем нужную валюту
          [activeCurrency]: Number((Math.max(0, currentBalance - betConverted + prize)).toFixed(2))
        },
        stats: {
          ...prev.stats,
          lostCasino: prize === 0 ? totalLost + bet : totalLost,
          earnedCasino: prize > 0 ? totalEarned + (prizeRub - bet) : totalEarned
        }
      };
    });
  };

  return (
    <Twemoji options={{ className: 'twemoji' }}>
      <div className="menu-screen" style={{ maxWidth: '480px', margin: '0 auto' }}>
        <h3>🎰 Казино "Вулкан Милены"</h3>
        
        <div style={{ background: '#111827', padding: '20px', borderRadius: '12px', textAlign: 'center', marginBottom: '15px', border: '2px solid #a855f7' }}>
          <div style={{ fontSize: '36px', letterSpacing: '10px', marginBottom: '10px' }}>
            {slots[0]} {slots[1]} {slots[2]}
          </div>
          <p style={{ fontSize: '13px', color: '#eab308', margin: 0, fontWeight: 'bold' }}>{statusMessage}</p>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontSize: '12px', color: '#9ca3af', display: 'block', marginBottom: '5px' }}>Выбери ставку:</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '5px' }}>
            {/* 6. Динамически выводим ставки через formatMoney */}
            {[1000, 10000, 100000].map(val => {
              // Конвертируем рублевую ставку в текущую валюту для отображения
              const currencyConfig = require('../../data/currencies').currencies[activeCurrency] || require('../../data/currencies').currencies.RUB;
              const convertedVal = activeCurrency === 'RUB' ? val : Number((val / currencyConfig.rateToRUB).toFixed(2));
              
              return (
                <button 
                  key={val}
                  className="btn" 
                  style={{ margin: 0, padding: '6px', background: bet === val ? '#a855f7' : '#1e2b38' }} 
                  onClick={() => setBet(val)}
                >
                  {formatMoney(val, activeCurrency)}
                </button>
              );
            })}
          </div>
        </div>

        <button className="btn" style={{ background: '#eab308', color: '#000', fontWeight: 'bold', fontSize: '16px' }} onClick={playSlots}>🎰 ДЁРНУТЬ РЫЧАГ</button>
        <button className="btn" onClick={onBack}>↩️ В главное меню</button>
      </div>
    </Twemoji>
  );
}