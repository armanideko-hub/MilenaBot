import React from 'react';

function LifeTab({ player, setPlayer, totalStatus }) {
  
  // Попросить милостыню (Тратит 5 энергии, дает от 1 до 5$)
  const beg = () => {
    if (player.energy < 5) return alert("Нет энергии!");
    if (totalStatus > 150) return alert("Ты слишком солидно выглядишь, тебе никто не подает!");
    
    const earned = Math.floor(Math.random() * 5) + 1;
    setPlayer(prev => ({
      ...prev,
      money: prev.money + earned,
      energy: prev.energy - 5
    }));
  };

  // Работать курьером (Тратит 10 энергии, дает 35$, нужен статус 40)
  const workCourier = () => {
    if (player.energy < 10) return alert("Нет энергии!");
    if (totalStatus < 40) return alert("Твой статус слишком мал, тебя не берут даже курьером.");
    
    setPlayer(prev => ({
      ...prev,
      money: prev.money + 35,
      energy: prev.energy - 10
    }));
  };

  // Покупка костюма
  const buyNewClothes = () => {
    if (player.money < 500) return alert("Не хватает денег на костюм!");
    if (player.inventory.clothes === 'Костюмчик 👔') return alert("У тебя уже есть этот костюм!");

    setPlayer(prev => ({
      ...prev,
      money: prev.money - 500,
      baseStatus: prev.baseStatus + 150,
      inventory: {
        ...prev.inventory,
        clothes: 'Костюмчик 👔'
      }
    }));
  };

  return (
  <div>
    <h3>Работа и Клик</h3>
    <button className="btn" onClick={beg}>
      🫴 Попросить милостыню (+1-5$, -5⚡)
    </button>
    
    <button className="btn" onClick={workCourier}>
      🚴 Работать курьером (+35$, -10⚡)
    </button>
    
    <h3>Твой гардероб и стиль</h3>
    <div className="info-box">
      <p>Одежда: <strong>{player.inventory.clothes}</strong></p>
      <p>Транспорт: <strong>{player.inventory.transport}</strong></p>
    </div>
    
    <button className="btn buy-btn" onClick={buyNewClothes}>
      👔 Купить костюм (500$, +150⭐)
    </button>

    <button 
      className="btn" 
      style={{ background: '#d97706', marginTop: '30px', border: 'none' }} 
      onClick={() => setPlayer(p => ({ ...p, money: p.money + 50000, baseStatus: p.baseStatus + 1000 }))}
    >
      💥 Чит-код: +50 000$ и +1000⭐
    </button>
  </div>
);
}

export default LifeTab;