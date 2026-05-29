export const initialState = {
  currentCityId: 'smolensk',
  backstoryId: 'homeless', 
  difficulty: 'Легко',
  
  balances: { 
    RUB: 1000, 
    USD: 0, 
    EUR: 0 
  },
  energy: 100,
  baseStatus: 10,
  debt: 0,
  hourlyPayment: 0,
  inventory: {
    clothes: 'Старая одежда 👕',
    transport: 'Ноги 👣',
    houses: [],
    businesses: [],
    licenses: [],
    maxSlots: 8,
    items: []
  },
  stats: { 
    earnedWork: 0,     // Заработанные с работы
    earnedBusiness: 0, // Заработанные с бизнеса
    earnedCasino: 0,   // Выигранные в казино (чистый выигрыш)
    lostCasino: 0,     // Проигранные в казино
    assets: [] 
  }
};