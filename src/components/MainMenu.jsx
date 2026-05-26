import React, { useState } from 'react';

export function ShopMenu({ setMenuState }) {
  return (
    <div className="menu-screen">
      <h3>Магазины</h3>
      <button className="btn" onClick={() => setMenuState('shop_clothes')}>👕 Магазин одежды</button>
      <button className="btn" onClick={() => setMenuState('shop_transport')}>🚗 Автосалон</button>
      <button className="btn" onClick={() => setMenuState('shop_houses')}>🏠 Недвижимость</button>
      <button className="btn" onClick={() => setMenuState('shop_biz')}>🚀 Стартапы</button>
      <button className="btn" onClick={() => setMenuState('main')}>↩️ В главное меню</button>
    </div>
  );
}

export function MainMenu({ setMenuState }) {
  return (
    <div className="menu-screen">
      <h3>Главное меню</h3>
      <button className="btn" onClick={() => setMenuState('profile')}>👤 Профиль</button>
      <button className="btn" onClick={() => setMenuState('work')}>💼 Работа</button>
      <button className="btn" onClick={() => setMenuState('education')}>🎓 Образование</button>
      <button className="btn" onClick={() => setMenuState('shop')}>🛒 Магазин</button>
      <button className="btn" onClick={() => setMenuState('buyout')}>🤝 Выкуп бизнеса</button>
      <button className="btn" onClick={() => setMenuState('exchange')}>💱 Обмен валюты</button>
      <button className="btn" onClick={() => setMenuState('bank')}>🏦 Банк и Кредиты</button>
      {/* НАША НОВАЯ КНОПКА */}
      <button className="btn" style={{ background: '#a855f7' }} onClick={() => setMenuState('entertainment')}>🎰 Развлечения</button>
    </div>
  );
}
