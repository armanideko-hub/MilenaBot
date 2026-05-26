// src/data/currencies.js

export const currencies = {
  RUB: { id: 'RUB', name: 'Рубль', symbol: '₽', rateToRUB: 1 },
  USD: { id: 'USD', name: 'Доллар', symbol: '$', rateToRUB: 92.5 }, // 1 доллар = 92.5 рублей
  EUR: { id: 'EUR', name: 'Евро', symbol: '€', rateToRUB: 101.2 }  // 1 евро = 101.2 рублей
};

// Функция форматирования денег (на всякий случай)
export const formatMoney = (amountInRUB, targetCurrencyId = 'RUB') => {
  const currency = currencies[targetCurrencyId] || currencies.RUB;
  const converted = amountInRUB / currency.rateToRUB;
  
  const fractionDigits = targetCurrencyId === 'RUB' ? 0 : 2;
  
  return `${converted.toLocaleString('ru-RU', { minimumFractionDigits: fractionDigits, maximumFractionDigits: fractionDigits })}${currency.symbol}`;
};