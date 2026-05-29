import React from 'react';
import { currencies } from '../../data/currencies';
import { formatMoney } from '../../data/currencies';

export function ExchangeScreen({ exchangeAmount, setExchangeAmount, handleExchange, onBack }) {
  return (
    <div className="menu-screen">
      <h3>💱 Обмен валюты</h3>
      <div className="info-box" style={{fontSize: '14px', marginBottom: '15px'}}>
        <p>Курс ЦБ РФ: 1$ = {currencies.USD.rateToRUB}₽ | 1€ = {currencies.EUR.rateToRUB}₽</p>
      </div>
      <input 
        type="number" 
        className="loan-input" 
        placeholder="Количество валюты..." 
        value={exchangeAmount} 
        onChange={(e) => setExchangeAmount(e.target.value)} 
        style={{width: '100%', padding: '12px', marginBottom: '15px', background: '#1e2b38', border: '1px solid #2b3946', borderRadius: '8px', color: '#fff', textAlign: 'center'}}
      />
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px'}}>
        <button className="btn buy-btn" style={{margin:0}} onClick={() => handleExchange('USD', true)}>Купить $</button>
        <button className="btn" style={{margin:0, background:'#b45309'}} onClick={() => handleExchange('USD', false)}>Продать $</button>
      </div>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px'}}>
        <button className="btn buy-btn" style={{margin:0, background:'#38bdf8'}} onClick={() => handleExchange('EUR', true)}>Купить €</button>
        <button className="btn" style={{margin:0, background:'#b45309'}} onClick={() => handleExchange('EUR', false)}>Продать €</button>
      </div>
      <button className="btn" onClick={onBack}>↩️ Назад</button>
    </div>
  );
}