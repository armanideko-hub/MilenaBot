import React from 'react';
import { citiesCatalog, travelPrices } from '../../data/cities'; // Импортируем матрицу цен

export function CityScreen({ player, totalStatus, onMoveCity, onBack }) {
  const currentCityId = player.currentCityId || 'smolensk';

  return (
    <div className="menu-screen">
      <div style={{ marginBottom: '8px' }}>
        <h2 style={{ margin: 0, fontSize: '18px', color: '#2481cc', fontWeight: '600', textAlign: 'center' }}>
          ✈️ Путешествия и Переезд
        </h2>
      </div>

      <p style={{ color: '#708499', fontSize: '14px', margin: '12px 0 20px 4px', textAlign: 'center' }}>
        Ваш текущий статус: <strong style={{ color: '#64b5f6' }}>{totalStatus} ⭐</strong>
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {citiesCatalog.map((city) => {
          const isCurrent = city.id === currentCityId;
          
          // ДИНАМИЧЕСКИЙ РАСЧЕТ ЦЕНЫ: Берём цену по маршруту [Где я сейчас] -> [Куда хочу]
          const currentMovePrice = travelPrices[currentCityId]?.[city.id] || 0;

          const hasEnoughStatus = totalStatus >= city.reqStatus;
          const hasEnoughMoney = (player.balances?.RUB || 0) >= currentMovePrice;
          const isLocked = !hasEnoughStatus;

          const cardStyle = {
            border: isCurrent ? '1px solid #4cb64c' : isLocked ? '1px solid #243444' : '1px solid #2b3946',
            opacity: isLocked ? 0.6 : 1,
            position: 'relative'
          };

          return (
            <div key={city.id} className="info-box" style={cardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '16px', fontWeight: '600', color: isCurrent ? '#4cb64c' : '#fff' }}>
                  {city.name}
                </span>
                
                {isCurrent && (
                  <span style={{ background: '#4cb64c', color: '#fff', fontSize: '11px', padding: '2px 8px', borderRadius: '6px', fontWeight: 'bold' }}>
                    Вы здесь
                  </span>
                )}
                {isLocked && (
                  <span style={{ background: 'rgba(229, 57, 53, 0.2)', color: '#ff595a', fontSize: '11px', padding: '2px 8px', borderRadius: '6px', fontWeight: 'bold' }}>
                    🔒 Статус {city.reqStatus}⭐
                  </span>
                )}
              </div>

              <p style={{ display: 'block', fontSize: '13px', color: '#708499', lineHeight: '1.4', margin: '0 0 12px 0' }}>
                {city.desc}
              </p>

              <div style={{ background: '#17212b', padding: '8px 12px', borderRadius: '8px', marginBottom: '12px' }}>
                <p>
                  <span>💰 Билет:</span> 
                  {/* Выводим рассчитанную цену */}
                  <strong>{currentMovePrice === 0 ? 'Бесплатно' : `${currentMovePrice.toLocaleString()}₽`}</strong>
                </p>
                <p>
                  <span>💼 Зарплаты:</span> 
                  <strong style={{ color: '#4cb64c' }}>x{city.salaryMultiplier}</strong>
                </p>
                <p>
                  <span>🛒 Цены на имущество:</span> 
                  <strong style={{ color: city.priceMultiplier > 1 ? '#ff595a' : '#4cb64c' }}>x{city.priceMultiplier}</strong>
                </p>
              </div>

              {!isCurrent && (
                <button
                  disabled={isLocked || !hasEnoughMoney}
                  // Передаем в экшен не просто город, а объект города вместе с актуальной ценой билета!
                  onClick={() => onMoveCity({ ...city, movePrice: currentMovePrice })}
                  className={`btn ${!isLocked && hasEnoughMoney ? 'buy-btn' : ''}`}
                  style={{ margin: 0, padding: '10px', fontSize: '14px' }}
                >
                  {isLocked 
                    ? `Нужен статус ${city.reqStatus}⭐` 
                    : !hasEnoughMoney 
                    ? `Не хватает ${(currentMovePrice - player.balances.RUB).toLocaleString()}₽` 
                    : `Купить билет за ${currentMovePrice.toLocaleString()}₽`}
                </button>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: '20px' }}>
        <button onClick={onBack} className="btn">
          ↩️ В главное меню
        </button>
      </div>
    </div>
  );
}