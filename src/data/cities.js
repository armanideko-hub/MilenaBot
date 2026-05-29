export const citiesCatalog = [
  { 
    id: 'smolensk', 
    name: 'Смоленск 🏙️', 
    reqStatus: 0, 
    salaryMultiplier: 1.0, 
    priceMultiplier: 1.0,
    currency: 'RUB',
    desc: 'Твой родной и уютный город. Цены низкие, но и миллионы тут заработать непросто.' 
  },

  { 
    id: 'voronezh', 
    name: 'Воронеж 🌆', 
    reqStatus: 20, 
    salaryMultiplier: 1.1, 
    priceMultiplier: 1.05,
    currency: 'RUB',
    desc: 'Спокойный город с недорогой жизнью и первыми шансами для бизнеса.' 
  },

  { 
    id: 'kazan', 
    name: 'Казань 🕌', 
    reqStatus: 80, 
    salaryMultiplier: 1.4, 
    priceMultiplier: 1.25,
    currency: 'RUB',
    desc: 'Современный город с развивающимся IT и хорошими зарплатами.' 
  },

  { 
    id: 'krasnodar', 
    name: 'Краснодар ☀️', 
    reqStatus: 120, 
    salaryMultiplier: 1.5, 
    priceMultiplier: 1.3,
    currency: 'RUB',
    desc: 'Теплый южный город. Больше возможностей для стартапов и среднего бизнеса.' 
  },

  { 
    id: 'spb', 
    name: 'Санкт-Петербург 🌉', 
    reqStatus: 350, 
    salaryMultiplier: 2.0, 
    priceMultiplier: 1.8,
    currency: 'RUB',
    desc: 'Город айтишников, творчества и дорогой недвижимости. Возможностей намного больше.' 
  },

  { 
    id: 'moscow', 
    name: 'Москва-Сити 💎', 
    reqStatus: 500, 
    salaryMultiplier: 2.7, 
    priceMultiplier: 2.2,
    currency: 'RUB',
    desc: 'Огромные деньги, бешеный ритм. Бизнес стоит дорого, но доходы перекрывают всё.' 
  },

  { 
    id: 'dubai', 
    name: 'Дубай 🏝️', 
    reqStatus: 1200, 
    salaryMultiplier: 3.8, 
    priceMultiplier: 3.5,
    currency: 'USD',
    desc: 'Город роскоши. Все расчеты, покупки и зарплаты ведутся строго в долларах.' 
  },

  { 
    id: 'newyork', 
    name: 'Нью-Йорк 🗽', 
    reqStatus: 3500, 
    salaryMultiplier: 5.5, 
    priceMultiplier: 5.0,
    currency: 'USD',
    desc: 'Мировой центр финансов. Здесь играют по-крупному и принимают только баксы.' 
  }
];

// Матрица цен билетов. 
// ВАЖНО: Валюта цены определяется валютой города ОТКУДА летит игрок!
export const travelPrices = {
  smolensk: {
    smolensk: 0,
    voronezh: 8000,    // в рублях
    kazan: 25000,     // в рублях
    krasnodar: 15000, // в рублях
    spb: 45000,       // в рублях
    moscow: 60000,    // в рублях
    dubai: 450000,    // в рублях
    newyork: 2500000  // в рублях
  },

  voronezh: {
    smolensk: 5000,   // Плацкарт домой (в рублях)
    voronezh: 0,
    kazan: 18000,
    krasnodar: 12000,
    spb: 40000,
    moscow: 35000,
    dubai: 420000,
    newyork: 2400000
  },

  kazan: {
    smolensk: 5000,   // Плацкарт домой (в рублях)
    voronezh: 18000,
    kazan: 0,
    krasnodar: 22000,
    spb: 35000,
    moscow: 40000,
    dubai: 350000,
    newyork: 2200000
  },

  krasnodar: {
    smolensk: 5000,   // Плацкарт домой (в рублях)
    voronezh: 12000,
    kazan: 22000,
    krasnodar: 0,
    spb: 50000,
    moscow: 45000,
    dubai: 300000,
    newyork: 2300000
  },

  spb: {
    smolensk: 5000,   // Плацкарт домой (в рублях)
    voronezh: 40000,
    kazan: 35000,
    krasnodar: 50000,
    spb: 0,
    moscow: 15000,
    dubai: 500000,
    newyork: 1800000
  },

  moscow: {
    smolensk: 5000,   // Плацкарт домой (в рублях)
    voronezh: 30000,
    kazan: 35000,
    krasnodar: 45000,
    spb: 15000,
    moscow: 0,
    dubai: 400000,
    newyork: 2000000
  },

  // ИГРОК НАХОДИТСЯ В ДУБАЕ (Цены перелетов списываются в USD!)
  dubai: {
    smolensk: 60,     // Депортация/эвакуация домой (всего $60)
    voronezh: 4500,   // в долларах
    kazan: 3800,      // в долларах
    krasnodar: 3200,  // в долларах
    spb: 5500,        // в долларах
    moscow: 4000,     // в долларах
    dubai: 0,
    newyork: 15000    // в долларах
  },

  // ИГРОК НАХОДИТСЯ В НЬЮ-ЙОРКЕ (Цены перелетов списываются в USD!)
  newyork: {
    smolensk: 60,     // Билет до Смоленска ($60)
    voronezh: 24000,  // в долларах
    kazan: 22000,     // в долларах
    krasnodar: 23000, // в долларах
    spb: 18000,       // в долларах
    moscow: 17000,    // в долларах
    dubai: 15000,     // в долларах
    newyork: 0
  }
};