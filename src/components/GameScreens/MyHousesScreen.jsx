import React from 'react';
// Импортируем каталог городов, чтобы брать названия из него
import { citiesCatalog } from '../../data/cities'; 

export function MyHousesScreen({ player, setMenuState }) {
  const currentCityId = player.currentCityId || 'smolensk';
  const houses = player.inventory?.houses || [];

  // Динамическое отображение названий городов из общего каталога
  const getCityName = (id) => {
    const city = citiesCatalog.find(c => c.id === id);
    return city ? city.name : id;
  };

  return (
    <div className="menu-screen">
      <h3 style={{ color: '#4cb64c' }}>🏠 Ваша недвижимость</h3>
      
      <p style={{ color: '#708499', fontSize: '13px', textAlign: 'center', marginBottom: '16px' }}>
        Жилье в текущем городе восстанавливает энергию. Дома в других городах автоматически сдаются в аренду.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
        {houses.length === 0 ? (
          <div className="info-box" style={{ textAlign: 'center', color: '#708499' }}>
            ⛺ У вас пока нет собственного жилья. Вы бомжуете или снимаете комнату.
          </div>
        ) : (
          houses.map((house) => {
            // Проверяем, в этом ли городе находится дом
            const isCurrentCity = house.purchasedInCity === currentCityId;
            const isDisabled = house.disabled;

            let statusText = '';
            let statusColor = '';
            let borderColor = '';
            let bgColor = '';

            if (isDisabled) {
              statusText = house.type === 'rent' ? '❌ Выселен за неуплату' : '❌ Отключено (нет денег на ЖКХ)';
              statusColor = '#ef4444';
              borderColor = '1px solid #ef4444';
              bgColor = '#2a1616';
            } else if (isCurrentCity) {
              statusText = '🏠 Живёте тут';
              statusColor = '#4cb64c';
              borderColor = '1px solid #4cb64c';
              bgColor = '#1c2a21';
            } else {
              statusText = '💰 В аренде';
              statusColor = '#64b5f6';
              borderColor = '1px solid #2b3946';
              bgColor = '#17212b';
            }

            return (
              <div 
                key={house.instanceId} 
                className="info-box" 
                style={{ 
                  border: borderColor,
                  background: bgColor
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                  <span>{house.name}</span>
                  <span style={{ color: statusColor, fontSize: '12px' }}>
                    {statusText}
                  </span>
                </div>

                <div style={{ fontSize: '13px', marginTop: '6px', color: '#708499' }}>
                  <p style={{ margin: '2px 0' }}>📍 Город: <strong>{getCityName(house.purchasedInCity)}</strong></p>
                  <p style={{ margin: '2px 0' }}>⭐ Статус: <strong>+{house.statusBoost || 0}</strong></p>
                  {!isCurrentCity && !isDisabled && (
                    <p style={{ margin: '2px 0', color: '#4cb64c' }}>
                      💵 Доход: <strong>+{house.rentIncome?.toLocaleString() || 0}₽ / мин</strong>
                    </p>
                  )}
                  {isDisabled && house.type !== 'rent' && (
                    <p style={{ margin: '2px 0', color: '#ef4444' }}>
                      Оплатите {house.rentIncome?.toLocaleString() || 0}₽, чтобы вернуть доступ.
                    </p>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Кнопка возврата внизу */}
      <button className="btn" onClick={() => setMenuState('main')}>↩️ Назад</button>
    </div>
  );
}