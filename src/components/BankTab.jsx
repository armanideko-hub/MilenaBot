import React from 'react';

function BankTab({ player, totalStatus, maxLoan, onTakeLoan, onRepayFull }) {
  return (
    <div>
      <h3>Кредитный отдел</h3>
      <p>Твой статус ({totalStatus}⭐) позволяет взять до {maxLoan}$</p>
      <button className="btn" onClick={() => onTakeLoan(1000)}>Взять мелкий кредит (1 000$)</button>
      <button className="btn" onClick={() => onTakeLoan(10000)}>Взять ипотеку (10 000$)</button>
      {player.debt > 0 && (
        <button className="btn danger-btn" onClick={onRepayFull}>Закрыть весь долг ({player.debt}$)</button>
      )}
    </div>
  );
}

export default BankTab;