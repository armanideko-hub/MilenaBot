import React from 'react';

// Наш каталог недвижимости
const housesCatalog = [
  { id: 'flat', name: 'Однокомнатная квартира', price: 15000, reqStatus: 100, statusBoost: 600, rentIncome: 350 },
  { id: 'penth', name: 'Пентхаус в Сити', price: 120000, reqStatus: 1500, statusBoost: 4000, rentIncome: 3200 },
  { id: 'villa', name: 'Загородная вилла', price: 850000, reqStatus: 10000, statusBoost: 35000, rentIncome: 25000 }
];

function PropertyTab({ player, setPlayer, totalStatus }) {
  
  const buyHouse = (house) => {
    if (player.money < house.price) return alert("Не хватает денег! Можно взять кредит в Банке.");
    if (totalStatus < house.reqStatus) return alert("Риелтор отказался работать с вами из-за низкого Статуса.");

    const newHouse = {
      instanceId: Date.now(), // Уникальный ID для конкретной покупки
      name: house.name,
      type: 'live',           // По умолчанию игрок заселяется сам
      statusBoost: house.statusBoost,
      rentIncome: house.rentIncome
    };

    setPlayer(prev => ({
      ...prev,
      money: prev.money - house.price,
      inventory: {
        ...prev.inventory,
        houses: [...prev.inventory.houses, newHouse]
      }
    }));
  };

  // Переключение: жить самому <-> сдать в аренду
  const toggleHouseType = (instanceId) => {
    setPlayer(prev => {
      const updatedHouses = prev.inventory.houses.map(h => {
        if (h.instanceId === instanceId) {
          return { ...h, type: h.type === 'live' ? 'rent' : 'live' };
        }
        return h;
      });
      return {
        ...prev,
        inventory: { ...prev.inventory, houses: updatedHouses }
      };
    });
  };

  return (
    <div>
      <h3>Рынок Недвижимости</h3>
      {housesCatalog.map(h => (
        <div key={h.id} className="catalog-item">
          <h4>{h.name}</h4>
          <p>Цена: <strong>{h.price}$</strong> | Нужен статус: <strong>{h.reqStatus}⭐</strong></p>
          <p>В аренду: <span style={{color: '#4cb64c'}}>+{h.rentIncome}$/час</span></p>
          <p>Для себя: <span style={{color: '#64b5f6'}}>+{h.statusBoost}⭐ к Статусу</span></p>
          <button className="btn buy-btn" onClick={() => buyHouse(h)}>Купить</button>
        </div>
      ))}

      <h3>Твоё имущество</h3>
      {player.inventory.houses.length === 0 ? (
        <p style={{color: '#708499', textAlign: 'center', fontSize: '14px'}}>У тебя пока нет недвижимости.</p>
      ) : (
        player.inventory.houses.map(h => (
          <div key={h.instanceId} className="my-item" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div>
              <div style={{fontWeight: '600'}}>{h.name}</div>
              <div style={{fontSize: '13px', color: '#708499'}}>
                {h.type === 'live' ? '🟢 Живешь сам (+⭐)' : '💰 Сдаешь в аренду (+💵)'}
              </div>
            </div>
            <button className="btn buy-btn" style={{width: 'auto', padding: '8px 12px', fontSize: '12px', margin: 0}} onClick={() => toggleHouseType(h.instanceId)}>
              {h.type === 'live' ? 'Сдать' : 'Заселиться'}
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default PropertyTab;