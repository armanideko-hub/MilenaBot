// src/data/catalog.js

export const clothesCatalog = [
  { id: 'cap', name: 'Кепка с Маркета 🧢', price: 1200, statusBoost: 8 },
  { id: 'hoodie', name: 'Стильный Худи 🧥', price: 4500, statusBoost: 40 },
  { id: 'jacket', name: 'Кожаная Куртка 🧥', price: 18000, statusBoost: 140 },
  { id: 'suit', name: 'Деловой Костюм 👔', price: 35000, statusBoost: 300 },
  { id: 'lux_watch', name: 'Швейцарские Часы ⌚', price: 250000, statusBoost: 1200 },
  { id: 'tuxedo', name: 'Смокинг Миллионера 🕴️', price: 850000, statusBoost: 4500 },
  { id: 'diamond_set', name: 'Бриллиантовый Комплект 💎', price: 7500000, statusBoost: 18000 }
];

export const transportCatalog = [
  { id: 'bike', name: 'Старый Велосипед 🚲', price: 8000, statusBoost: 25 },
  { id: 'scooter', name: 'Электросамокат 🛴', price: 25000, statusBoost: 100 },
  { id: 'moto', name: 'Спортивный Мотоцикл 🏍️', price: 350000, statusBoost: 900 },
  { id: 'zhiguli', name: 'Жигули "Боевая Классика" 🚗', price: 150000, statusBoost: 400 },
  { id: 'camry', name: 'Toyota Camry 🚘', price: 3500000, statusBoost: 3500 },
  { id: 'tesla', name: 'Tesla Model S ⚡', price: 9500000, statusBoost: 8500 },
  { id: 'porsche', name: 'Porsche 911 🏎️', price: 15000000, statusBoost: 12000 },
  { id: 'lambo', name: 'Lamborghini Aventador 🐂', price: 45000000, statusBoost: 32000 },
  { id: 'helicopter', name: 'Личный Вертолёт 🚁', price: 180000000, statusBoost: 95000 }
];

export const housesCatalog = [
  { id: 'rent_room', name: 'Комната в коммуналке (Аренда) 🚪', price: 5000, rentIncome: 150, isRent: true, statusBoost: 5 },
  { id: 'rent_flat', name: 'Однокомнатная квартира (Аренда) 🏢', price: 15000, rentIncome: 450, isRent: true, statusBoost: 15 },

  { id: 'buy_flat', name: 'Собственная Студия 🔑', price: 2500000, rentIncome: 100, isRent: false, statusBoost: 50 },

  { id: 'flat', name: 'Однокомнатная квартира 🏢', price: 4500000, rentIncome: 250, isRent: false, statusBoost: 600 },

  { id: 'townhouse', name: 'Таунхаус 🏘️', price: 18000000, rentIncome: 700, isRent: false, statusBoost: 1800 },

  { id: 'penth', name: 'Пентхаус в Сити 🏙️', price: 85000000, rentIncome: 2500, isRent: false, statusBoost: 4000 },

  { id: 'villa', name: 'Загородная вилла 🏰', price: 500000000, rentIncome: 15000, isRent: false, statusBoost: 35000 },

  { id: 'island', name: 'Частный Остров 🌴', price: 3500000000, rentIncome: 85000, isRent: false, statusBoost: 250000 }
];

export const startupCatalog = [
  { id: 'shawarma', name: 'Ларек с Шавермой 🌯', price: 350000, reqStatus: 200, income: 15000 },

  { id: 'coffee', name: 'Мини-Кофейня ☕', price: 850000, reqStatus: 350, income: 32000 },

  { id: 'carwash', name: 'Умная Автомойка 🧼', price: 4000000, reqStatus: 800, income: 180000 },

  { id: 'barbershop', name: 'Барбершоп 💈', price: 9500000, reqStatus: 1800, income: 420000 },

  { id: 'itstudio', name: 'IT-Студия 💻', price: 45000000, reqStatus: 6000, income: 1800000 },

  { id: 'restaurant', name: 'Сеть Ресторанов 🍽️', price: 120000000, reqStatus: 15000, income: 5500000 }
];

export const buyoutCatalog = [
  { id: 'fc_club', name: 'Футбольный Клуб ⚽', price: 300000000, reqStatus: 25000, income: 9000000 },

  { id: 'bank', name: 'Коммерческий Банк 🏦', price: 850000000, reqStatus: 70000, income: 32000000 },

  { id: 'airline', name: 'Авиакомпания "Milena Air" ✈️', price: 2500000000, reqStatus: 150000, income: 85000000 },

  { id: 'media', name: 'Медиахолдинг 📺', price: 7500000000, reqStatus: 350000, income: 250000000 }
];

export const educationCatalog = [
  { id: 'school_9', name: 'Начальное образование (9 классов) 🎒', price: 5000, reqStatus: 0, statusBoost: 15, license: 'Аттестат за 9 классов' },

  { id: 'school_11', name: 'Среднее общее образование (11 классов) 📜', price: 12000, reqStatus: 30, statusBoost: 40, license: 'Аттестат за 11 классов' },

  { id: 'courses_design', name: 'Курсы веб-дизайна 🎨', price: 12000, reqStatus: 20, statusBoost: 50, license: 'Сертификат Дизайнера' },

  { id: 'college_tech', name: 'Колледж: Сварщик / Механик 🛠️', price: 45000, reqStatus: 60, statusBoost: 120, license: 'Диплом Механика-Сварщика' },

  { id: 'college_economy', name: 'Экономический Колледж 📉', price: 180000, reqStatus: 150, statusBoost: 250, license: 'Диплом Экономиста' },

  { id: 'law_school', name: 'Юридическая Академия ⚖️', price: 350000, reqStatus: 350, statusBoost: 500, license: 'Диплом Юриста' },

  { id: 'uni_it', name: 'ВУЗ: Факультет Программирования 💻', price: 420000, reqStatus: 500, statusBoost: 700, license: 'Диплом Программиста' },

  { id: 'uni_pilot', name: 'Академия Гражданской Авиации ✈️', price: 850000, reqStatus: 800, statusBoost: 1000, license: 'Лицензия Пилота' },

  { id: 'university_management', name: 'Университет Управления 🏛️', price: 950000, reqStatus: 1000, statusBoost: 1200, license: 'Магистр Бизнеса' },

  { id: 'mba_elite', name: 'MBA Международного Уровня 🌍', price: 4500000, reqStatus: 5000, statusBoost: 6500, license: 'MBA CEO' }
];

export const jobsCatalog = [
  { id: 'promoter', name: 'Промоутер у метро 🫱📄', salary: 150, energyCost: 10, reqStatus: 10, reqLicense: null },

  { id: 'courier', name: 'Курьер на самокате 🚴', salary: 450, energyCost: 15, reqStatus: 40, reqLicense: null },

  { id: 'waiter', name: 'Официант в кафе 🍽️', salary: 850, energyCost: 18, reqStatus: 55, reqLicense: null },

  { id: 'welder', name: 'Электросварщик 👨‍🏭', salary: 1800, energyCost: 25, reqStatus: 80, reqLicense: 'Диплом Механика-Сварщика' },

  { id: 'mechanic', name: 'Автомеханик в СТО 🔧', salary: 2500, energyCost: 25, reqStatus: 100, reqLicense: 'Диплом Механика-Сварщика' },

  { id: 'designer', name: 'Фриланс Веб-Дизайнер 🎨', salary: 1200, energyCost: 20, reqStatus: 100, reqLicense: 'Сертификат Дизайнера' },

  { id: 'banker', name: 'Младший Экономист 📊', salary: 3500, energyCost: 25, reqStatus: 300, reqLicense: 'Диплом Экономиста' },

  { id: 'developer', name: 'Frontend Разработчик 💻', salary: 6500, energyCost: 28, reqStatus: 700, reqLicense: 'Диплом Программиста' },

  { id: 'lawyer', name: 'Корпоративный Юрист ⚖️', salary: 8200, energyCost: 30, reqStatus: 1200, reqLicense: 'Диплом Юриста' },

  { id: 'pilot', name: 'Пилот Гражданской Авиации ✈️', salary: 15000, energyCost: 35, reqStatus: 2500, reqLicense: 'Лицензия Пилота' },

  { id: 'director', name: 'Генеральный Директор 👔', salary: 12000, energyCost: 35, reqStatus: 1500, reqLicense: 'Магистр Бизнеса' },

  { id: 'ceo', name: 'CEO IT-Компании 🧠', salary: 45000, energyCost: 45, reqStatus: 12000, reqLicense: 'MBA CEO' }
];

export const avitoJobsPool = [
  { id: 'avito_ads', name: 'Расклейка объявлений 📋', salary: 200, energyCost: 8, tax: 0, reqStatus: 0, desc: 'Быстрая расклейка по району. Чистая наличка.' },

  { id: 'avito_flyers', name: 'Раздача листовок 📇', salary: 250, energyCost: 9, tax: 0, reqStatus: 0, desc: 'Раздача флаеров прохожим.' },

  { id: 'avito_husky', name: 'Выгул хаски 🦮', salary: 320, energyCost: 10, tax: 0, reqStatus: 5, desc: 'Активная прогулка с собакой в парке.' },

  { id: 'avito_moving', name: 'Помощь с переездом 📦', salary: 600, energyCost: 25, tax: 0, reqStatus: 10, desc: 'Разгрузка вещей. Тяжелый физический труд.' },

  { id: 'avito_stream', name: 'Модератор стрима 🎥', salary: 850, energyCost: 15, tax: 0.03, reqStatus: 25, desc: 'Следить за чатом и порядком.' },

  { id: 'avito_buyer', name: 'Тайный покупатель 🕵️‍♂️', salary: 500, energyCost: 12, tax: 0.04, reqStatus: 15, desc: 'Проверка супермаркета. Официальный подбор.' },

  { id: 'avito_photo', name: 'Фотограф товаров 📸', salary: 1200, energyCost: 18, tax: 0.05, reqStatus: 60, desc: 'Съемка товаров для маркетплейсов.' }
];