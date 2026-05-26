// src/data/backstory.js

export const backstories = [
  {
    id: 'parents_move',
    title: '📦 Переезд от родителей',
    description: 'Родители поддержали твое решение жить самостоятельно, сняли тебе скромную студию на первый месяц и дали подъемные деньги.',
    startBalances: { RUB: 25000, USD: 0, EUR: 0 },
    startClothes: 'Опрятный прикид 🧥',
    startStatus: 50,
    startLicenses: ['Школьный аттестат'], // Начальное образование
    educationText: 'Школьный аттестат 📜',
    difficulty: 'Легко 🟢'
  },
  {
    id: 'kicked_out',
    title: '🎒 Выгнали родаки',
    description: 'После очередного скандала о том, что ты "занимаешься ерундой в своем интернете", тебя выставили за дверь с одним рюкзаком.',
    startBalances: { RUB: 2000, USD: 0, EUR: 0 },
    startClothes: 'Рвань 👕',
    startStatus: 10,
    startLicenses: [], // Нет образования
    educationText: 'Отсутствует (Без образования) ❌',
    difficulty: 'Средне 🟡'
  },
  {
    id: 'bankruptcy',
    title: '📉 Полное банкротство',
    description: 'Твой прошлый бизнес прогорел, приставы забрали всё за долги. Ты остался на улице без копейки в кармане. Начинаем с абсолютного нуля.',
    startBalances: { RUB: 0, USD: 0, EUR: 0 },
    startClothes: 'Рвань 👕',
    startStatus: 1,
    startLicenses: [], // Нет образования
    educationText: 'Отсутствует (Документы утеряны) ❌',
    difficulty: 'Хардкор 🔴'
  }
];