import { useState } from 'react';
import { currencies } from '../data/currencies';

export function useFinanceActions(player, setPlayer, maxLoan, currentCity) {
  const [exchangeAmount, setExchangeAmount] = useState('');

  const handleExchange = (targetCurrency, isBuying) => {
    const amount = parseFloat(exchangeAmount);
    if (!amount || amount <= 0 || isNaN(amount)) return alert("Введите корректную сумму!");
    
    const rate = currencies[targetCurrency]?.rateToRUB;
    if (!rate) return alert("Некорректная валюта!");
    
    const totalCostRUB = Math.round(amount * rate);

    setPlayer(prev => {
      const updatedBalances = { ...prev.balances };
      const currentRUB = updatedBalances.RUB || 0;
      const currentTarget = updatedBalances[targetCurrency] || 0;

      if (isBuying) {
        if (currentRUB < totalCostRUB) { alert("Не хватает рублей!"); return prev; }
        updatedBalances.RUB = currentRUB - totalCostRUB;
        updatedBalances[targetCurrency] = currentTarget + amount;
      } else {
        if (currentTarget < amount) { alert("Не хватает валюты!"); return prev; }
        updatedBalances[targetCurrency] = currentTarget - amount;
        updatedBalances.RUB = currentRUB + totalCostRUB;
      }
      
      setExchangeAmount('');
      return { ...prev, balances: updatedBalances };
    });
  };

  const takeLoan = (amount) => {
    if (player.debt > 0) return alert("Сначала погаси текущий долг!");
    
    // amount in takeLoan is requested in active currency
    const activeCurrencyId = currentCity?.currency || 'RUB';
    const currencyConfig = currencies[activeCurrencyId] || currencies.RUB;
    
    const maxLoanConverted = activeCurrencyId === 'RUB' ? maxLoan : Number((maxLoan / currencyConfig.rateToRUB).toFixed(2));
    
    if (amount > maxLoanConverted) return alert("Банк отказал в такой сумме!");
    
    const totalEarned = player.stats?.earnedWork || 0;
    if (totalEarned < 500 && player.difficulty !== 'Легко') {
      return alert("У вас нет кредитной истории! Поработайте немного руками.");
    }

    let interestRate = 0.12;
    if (player.difficulty === 'Обычная') interestRate = 0.18;
    if (player.difficulty === 'Хардкор' || player.difficulty?.includes('🔴')) interestRate = 0.28;

    const totalDebt = Math.floor(amount + (amount * interestRate));

    setPlayer(prev => ({
      ...prev,
      balances: { ...prev.balances, [activeCurrencyId]: (prev.balances[activeCurrencyId] || 0) + amount },
      debt: totalDebt, // Теперь debt содержит сумму с процентами
      debtCurrency: activeCurrencyId, // Запоминаем в какой валюте взят долг
      hourlyPayment: Math.floor(amount * interestRate) // оставляем как штраф/платеж
    }));
  };

  const repayLoanFull = () => {
    const debtCurrency = player.debtCurrency || 'RUB';
    if ((player.balances?.[debtCurrency] || 0) < player.debt) return alert("Недостаточно средств для полного погашения долга!");
    
    setPlayer(prev => ({ 
      ...prev, 
      balances: { ...prev.balances, [debtCurrency]: (prev.balances[debtCurrency] || 0) - prev.debt }, 
      debt: 0, 
      debtCurrency: null,
      hourlyPayment: 0 
    }));
  };

  return {
    exchangeAmount, setExchangeAmount,
    handleExchange, takeLoan, repayLoanFull
  };
}