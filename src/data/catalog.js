// src/data/catalog.js

export const clothesCatalog = [
  { id: 'hudie', name: 'Стильный Худи 🧥', price: 4500, statusBoost: 40 },
  { id: 'suit', name: 'Деловой Костюм 👔', price: 35000, statusBoost: 300 },
  { id: 'tuxedo', name: 'Смокинг Миллионера 🕴️', price: 850000, statusBoost: 4500 }
];

export const transportCatalog = [
  { id: 'scooter', name: 'Электросамокат 🛴', price: 25000, statusBoost: 100 },
  { id: 'zhiguli', name: 'Жигули "Боевая Классика" 🚗', price: 150000, statusBoost: 400 },
  { id: 'porsche', name: 'Porsche 911 🏎️', price: 15000000, statusBoost: 12000 }
];

export const housesCatalog = [
  { id: 'rent_room', name: 'Комната в коммуналке (Аренда) 🚪', price: 5000, rentIncome: 150, isRent: true, statusBoost: 5 },
  { id: 'rent_flat', name: 'Однокомнатная квартира (Аренда) 🏢', price: 15000, rentIncome: 450, isRent: true, statusBoost: 15 },
  { id: 'buy_flat', name: 'Собственная Студия (Покупка) 🔑', price: 2500000, rentIncome: 100, isRent: false, statusBoost: 50 },
  { id: 'flat', name: 'Однокомнатная квартира 🏢', price: 4500000, rentIncome: 250, isRent: false, statusBoost: 600 },
  { id: 'penth', name: 'Пентхаус в Сити 🏙️', price: 85000000, rentIncome: 2500, isRent: false, statusBoost: 4000 },
  { id: 'villa', name: 'Загородная вилла 🏰', price: 500000000, rentIncome: 15000, isRent: false, statusBoost: 35000 }
];

export const startupCatalog = [
  { id: 'shawarma', name: 'Ларек с Шавермой 🌯', price: 350000, reqStatus: 200, income: 15000 },
  { id: 'carwash', name: 'Умная Автомойка 🧼', price: 4000000, reqStatus: 800, income: 180000 }
];

export const buyoutCatalog = [
  { id: 'fc_club', name: 'Футбольный Клуб ⚽', price: 300000000, reqStatus: 25000, income: 9000000 },
  { id: 'airline', name: 'Авиакомпания "Milena Air" ✈️', price: 2500000000, reqStatus: 150000, income: 85000000 }
];

export const educationCatalog = [
  { id: 'school_9', name: 'Начальное образование (9 классов) 🎒', price: 5000, reqStatus: 0, statusBoost: 15, license: 'Аттестат за 9 классов' },
  { id: 'school_11', name: 'Среднее общее образование (11 классов) 📜', price: 12000, reqStatus: 30, statusBoost: 40, license: 'Аттестат за 11 классов' },
  { id: 'college_tech', name: 'Колледж: Сварщик / Механик 🛠️', price: 45000, reqStatus: 60, statusBoost: 120, license: 'Диплом Механика-Сварщика' },
  { id: 'college_economy', name: 'Экономический Колледж 📉', price: 180000, reqStatus: 150, statusBoost: 250, license: 'Диплом Экономиста' },
  { id: 'courses_design', name: 'Курсы веб-дизайна 🎨', price: 12000, reqStatus: 20, statusBoost: 50, license: 'Сертификат Дизайнера' },
  { id: 'uni_it', name: 'ВУЗ: Факультет Программирования 💻', price: 420000, reqStatus: 500, statusBoost: 700, license: 'Диплом Программиста' },
  { id: 'uni_pilot', name: 'Академия Гражданской Авиации (Пилот) ✈️', price: 850000, reqStatus: 800, statusBoost: 1000, license: 'Лицензия Пилота' },
  { id: 'university_management', name: 'Университет Управления 🏛️', price: 950000, reqStatus: 1000, statusBoost: 1200, license: 'Магистр Бизнеса' }
];

export const jobsCatalog = [
  { id: 'promoter', name: 'Промоутер у метро 🫱📄', salary: 150, energyCost: 10, reqStatus: 10, reqLicense: null },
  { id: 'courier', name: 'Курьер на самокате 🚴', salary: 450, energyCost: 15, reqStatus: 40, reqLicense: null },
  { id: 'welder', name: 'Электросварщик 3-го разряда 👨‍🏭', salary: 1800, energyCost: 25, reqStatus: 80, reqLicense: 'Диплом Механика-Сварщика' },
  { id: 'mechanic', name: 'Автомеханик в СТО 🔧', salary: 2500, energyCost: 25, reqStatus: 100, reqLicense: 'Диплом Механика-Сварщика' },
  { id: 'designer', name: 'Фриланс Веб-Дизайнер 🎨', salary: 1200, energyCost: 20, reqStatus: 100, reqLicense: 'Сертификат Дизайнера' },
  { id: 'banker', name: 'Младший Экономист в банк 📊', salary: 3500, energyCost: 25, reqStatus: 300, reqLicense: 'Диплом Экономиста' },
  { id: 'director', name: 'Генеральный Директор СТО 👔', salary: 12000, energyCost: 35, reqStatus: 1500, reqLicense: 'Магистр Бизнеса' }
];
