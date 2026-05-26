import React from 'react';

export function BankScreen({ player, maxLoan, takeLoan, repayLoanFull, onBack }) {
  return (
    <div className="menu-screen">
      <h3>🏦 Центральный Банк</h3>
      <div className="info-box" style={{marginBottom: '15px'}}>
        <p>Кредитный лимит: <strong>{maxLoan?.toLocaleString()}₽</strong></p>
        <p>Текущий долг: <strong style={{color: '#ef4444'}}>{player.debt?.toLocaleString()}₽</strong></p>
      </div>
      {player.debt === 0 ? (
        <div style={{display:'flex', gap: '10px'}}>
          <button className="btn buy-btn" style={{margin:0}} onClick={() => takeLoan(maxLoan)}>Взять максимум</button>
        </div>
      ) : (
        <button className="btn" style={{background: '#4cb64c'}} onClick={repayLoanFull}>Погасить кредит</button>
      )}
      <button className="btn" style={{marginTop: '15px'}} onClick={onBack}>↩️ Назад</button>
    </div>
  );
}