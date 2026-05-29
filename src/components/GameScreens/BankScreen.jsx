import React from 'react';
import { formatMoney } from '../../data/currencies';
import { currencies } from '../../data/currencies';

export function BankScreen({ player, maxLoan, takeLoan, repayLoanFull, onBack, currentCity }) {
  const activeCurrencyId = currentCity?.currency || 'RUB';
  const currencyConfig = currencies[activeCurrencyId] || currencies.RUB;
  const maxLoanConverted = activeCurrencyId === 'RUB' ? maxLoan : Number((maxLoan / currencyConfig.rateToRUB).toFixed(2));
  
  // Долг может быть взят в другой валюте, берем его оригинальную валюту, или RUB если еще не взят
  const debtCurrency = player.debtCurrency || activeCurrencyId;
  
  let interestRate = 0.12;
  if (player.difficulty === 'Обычная') interestRate = 0.18;
  if (player.difficulty === 'Хардкор' || player.difficulty?.includes('🔴')) interestRate = 0.28;
  const displayInterest = Math.round(interestRate * 100);

  return (
    <div className="menu-screen">
      <h3>🏦 Центральный Банк</h3>
      <div className="info-box" style={{marginBottom: '15px'}}>
        <p>Кредитный лимит: <strong>{formatMoney(maxLoanConverted, activeCurrencyId)}</strong></p>
        <p>Текущий долг: <strong style={{color: '#ef4444'}}>{formatMoney(player.debt || 0, debtCurrency)}</strong></p>
        {player.debt === 0 && (
          <p style={{fontSize: '12px', color: '#708499', marginTop: '5px'}}>Процентная ставка: {displayInterest}%</p>
        )}
      </div>
      {player.debt === 0 ? (
        <div style={{display:'flex', gap: '10px'}}>
          <button className="btn buy-btn" style={{margin:0}} onClick={() => takeLoan(maxLoanConverted)}>Взять максимум</button>
        </div>
      ) : (
        <button className="btn" style={{background: '#4cb64c'}} onClick={repayLoanFull}>Погасить кредит</button>
      )}
      <button className="btn" style={{marginTop: '15px'}} onClick={onBack}>↩️ Назад</button>
    </div>
  );
}