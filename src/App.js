import React, { useState, useEffect } from 'react';
import './App.css';

import { clothesCatalog, transportCatalog, housesCatalog, startupCatalog, buyoutCatalog } from './data/catalog';
import { currencies } from './data/currencies'; 

// Импортируем разбитые UI блоки
import { GameHeader } from './components/GameHeader';
import { ExchangeScreen } from './components/ExchangeScreen';
import { BankScreen } from './components/BankScreen';
import { MainMenu, ShopMenu } from './components/MainMenu';

// Импортируем игровые экраны
import { ProfileScreen, WorkScreen, CatalogScreen, EducationScreen, StorySelectionScreen, EntertainmentScreen } from './components/GameScreens';

const initialState = {
  balances: { RUB: 1000, USD: 0, EUR: 0 },
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
    items: [
      { id: 'key_home', name: 'Ключи от дома 🔑' },
      { id: 'phone_old', name: 'Старый телефон 📱' }
    ]
  },
  stats: { earnedWork: 0, earnedCasino: 0, earnedBusiness: 0, lostCasino: 0, assets: [] }
};

function App() {
  const hasSavedGame = localStorage.getItem('milena_v4_player');
  const [menuState, setMenuState] = useState(hasSavedGame ? 'main' : 'story_selection');
  const [exchangeAmount, setExchangeAmount] = useState('');

  const [player, setPlayer] = useState(() => {
    try {
      const saved = localStorage.getItem('milena_v4_player');
      if (!saved) return initialState;
      const parsed = JSON.parse(saved);
      
      return {
        ...initialState,
        ...parsed,
        balances: { ...initialState.balances, ...parsed.balances },
        inventory: { ...initialState.inventory, ...parsed.inventory },
        stats: { ...initialState.stats, ...parsed.stats }
      };
    } catch (e) {
      console.error("Ошибка загрузки сохранения:", e);
      return initialState;
    }
  });

  const totalStatus = player && player.inventory?.houses 
    ? (player.baseStatus + player.inventory.houses.reduce((sum, h) => sum + (h.statusBoost || 0), 0)) 
    : player?.baseStatus || 0;

  const maxLoan = totalStatus * 5000; 

  useEffect(() => {
    if (player) {
      localStorage.setItem('milena_v4_player', JSON.stringify(player));
    }
  }, [player]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlayer(prev => {
        if (!prev || !prev.balances || !prev.inventory) return prev;

        const housingExpenses = prev.inventory.houses?.reduce((sum, h) => sum + (h.rentIncome || 0), 0) || 0;
        const bizIncome = prev.inventory.businesses?.reduce((sum, b) => sum + (b.income || 0), 0) || 0;
        
        const hasHome = prev.inventory.houses && prev.inventory.houses.length > 0;
        const energyRecovery = hasHome ? 5 : 1;

        const currentRUB = prev.balances.RUB || 0;
        const currentHourlyPayment = prev.hourlyPayment || 0;
        
        let newRUB = currentRUB + bizIncome - housingExpenses - currentHourlyPayment;
        let newDebt = prev.debt - Math.max(0, currentHourlyPayment - Math.floor(currentHourlyPayment * 0.1));
        let nextHourlyPayment = currentHourlyPayment;

        if (newDebt <= 0) { 
          newDebt = 0; 
          nextHourlyPayment = 0; 
        }

        return {
          ...prev,
          balances: { ...prev.balances, RUB: Math.max(0, newRUB) },
          debt: Math.max(0, newDebt),
          hourlyPayment: nextHourlyPayment,
          energy: Math.min(100, (prev.energy || 0) + energyRecovery)
        };
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Функция админ-чита вынесена наружу и сделана секретной
  const runAdminCheat = () => {
    setPlayer(p => {
      if (!p) return p;
      return {
        ...p,
        balances: { 
          RUB: (p.balances.RUB || 0) + 10000000, 
          USD: (p.balances.USD || 0) + 5000, 
          EUR: (p.balances.EUR || 0) + 3000 
        },
        baseStatus: (p.baseStatus || 0) + 1000
      };
    });
  };

  // Прокидываем чит-код в глобальное окно браузера, чтобы им мог пользоваться только разработчик
  useEffect(() => {
    window.runAdminCheat = runAdminCheat;
    return () => {
      delete window.runAdminCheat;
    };
  }, []);

  const handleSelectStory = (story) => {
    const initialPlayerState = {
      ...initialState,
      balances: { RUB: story.startBalances?.RUB || 0, USD: 0, EUR: 0 },
      energy: 100,
      baseStatus: story.startStatus || 10,
      inventory: { 
        ...initialState.inventory,
        clothes: story.startClothes || 'Старая одежда 👕', 
        licenses: [...(story.startLicenses || [])],
      }
    };
    
    setPlayer(initialPlayerState);
    localStorage.setItem('milena_v4_player', JSON.stringify(initialPlayerState));
    setMenuState('main');
  };

  const handleWork = (job) => {
    if (player.energy < job.energyCost) return alert("Вы слишком устали!");
    setPlayer(prev => ({
      ...prev,
      balances: { ...prev.balances, RUB: (prev.balances.RUB || 0) + job.salary },
      energy: prev.energy - job.energyCost,
      stats: {
        ...prev.stats,
        earnedWork: (prev.stats?.earnedWork || 0) + job.salary
      }
    }));
  };

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
        if (currentRUB < totalCostRUB) {
          alert("Не хватает рублей!");
          return prev;
        }
        updatedBalances.RUB = currentRUB - totalCostRUB;
        updatedBalances[targetCurrency] = currentTarget + amount;
      } else {
        if (currentTarget < amount) {
          alert("Не хватает валюты!");
          return prev;
        }
        updatedBalances[targetCurrency] = currentTarget - amount;
        updatedBalances.RUB = currentRUB + totalCostRUB;
      }
      
      setExchangeAmount('');
      return { ...prev, balances: updatedBalances };
    });
  };

  const takeLoan = (amount) => {
    if (player.debt > 0) return alert("Сначала погаси текущий долг!");
    if (amount > maxLoan) return alert("Банк отказал!");
    setPlayer(prev => ({
      ...prev,
      balances: { ...prev.balances, RUB: (prev.balances.RUB || 0) + amount },
      debt: amount,
      hourlyPayment: Math.floor(amount * 0.12)
    }));
  };

  const repayLoanFull = () => {
    if ((player.balances?.RUB || 0) < player.debt) return alert("Недостаточно средств!");
    setPlayer(prev => ({ 
      ...prev, 
      balances: { ...prev.balances, RUB: (prev.balances.RUB || 0) - prev.debt }, 
      debt: 0, 
      hourlyPayment: 0 
    }));
  };

  const handlePurchase = (item, type) => {
    if ((player.balances?.RUB || 0) < item.price) return alert("Не хватает рублей!");

    const typesRequiringStatus = ['clothes', 'transport', 'education'];
    if (typesRequiringStatus.includes(type) && item.reqStatus && totalStatus < item.reqStatus) {
      return alert(`Слишком низкий статус! Для этого требуется минимум ${item.reqStatus}⭐`);
    }

    setPlayer(prev => {
      const currentLicenses = prev.inventory?.licenses || [];
      const updated = { 
        ...prev, 
        balances: { ...prev.balances, RUB: (prev.balances.RUB || 0) - item.price },
        inventory: { ...prev.inventory, licenses: currentLicenses }
      };
      
      if (type === 'clothes') {
        updated.baseStatus = (updated.baseStatus || 0) + (item.statusBoost || 0);
        updated.inventory.clothes = item.name;
      } else if (type === 'transport') {
        updated.baseStatus = (updated.baseStatus || 0) + (item.statusBoost || 0);
        updated.inventory.transport = item.name;
      } else if (type === 'house') {
        const alreadyHasIt = prev.inventory?.houses?.some(h => h.name === item.name);
        if (alreadyHasIt) {
          alert("Вы уже владеете этим жильем или арендуете его!");
          return prev;
        }

        const newHouse = { 
          instanceId: Date.now(), 
          name: item.name, 
          type: item.isRent ? 'rent' : 'live', 
          statusBoost: item.statusBoost || 0, 
          rentIncome: item.rentIncome || 0 
        };
        updated.inventory.houses = [...(prev.inventory?.houses || []), newHouse];
      } else if (type === 'business') {
        const newBiz = { instanceId: Date.now(), name: item.name, income: item.income || 0 };
        updated.inventory.businesses = [...(prev.inventory?.businesses || []), newBiz];
      } else if (type === 'education') {
        if (currentLicenses.includes(item.license)) return prev;
        updated.baseStatus = (updated.baseStatus || 0) + (item.statusBoost || 0);
        updated.inventory.licenses = [...currentLicenses, item.license];
      }
      return updated;
    });
  };

  const resetGame = () => {
    if (window.confirm("Вы уверены, что хотите удалить персонажа и начать заново?")) {
      localStorage.removeItem('milena_v4_player');
      window.location.reload();
    }
  };

  const shareProgress = () => {
    const rub = player.balances?.RUB || 0;
    const work = player.stats?.earnedWork || 0;
    const casino = player.stats?.earnedCasino || 0;
    const biz = player.stats?.earnedBusiness || 0;
    const lost = player.stats?.lostCasino || 0;
    const assets = player.stats?.assets || [];

    const text = `
🏆 Мой прогресс в Milena Clicker:
💰 Заработано:
  • На работе: ${work.toLocaleString()}₽
  • В казино: ${casino.toLocaleString()}₽
  • На бизнесах: ${biz.toLocaleString()}₽
  
📉 Проиграно в казино: ${lost.toLocaleString()}₽
💎 Итог: ${rub.toLocaleString()}₽
🏠 Имущество: ${assets.length > 0 ? assets.join(', ') : 'Нет'}
    `;

    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.showPopup({
        title: 'Поделиться успехом?',
        message: 'Твой прогресс будет скопирован, чтобы ты мог отправить его друзьям!',
        buttons: [{ type: 'ok', text: 'Скопировать' }]
      });
    }
    
    navigator.clipboard.writeText(text);
  };

  if (menuState === 'story_selection' || !player) {
    return (
      <div className="game-container" style={{paddingTop: '40px'}}>
        <StorySelectionScreen onSelect={handleSelectStory} />
      </div>
    );
  }

  return (
    <div className="game-container">
      {(!player.inventory?.houses || player.inventory.houses.length === 0) && (
        <div style={{background: '#ef4444', color: '#fff', padding: '6px', borderRadius: '6px', fontSize: '12px', textAlign: 'center', marginBottom: '8px', fontWeight: 'bold'}}>
          ⛺ Вы бездомный! Энергия восстанавливается медленно. Снимите или купите жилье!
        </div>
      )}
      
      <GameHeader player={player} totalStatus={totalStatus} />

      <div className="menu-container">
        {menuState === 'main' && <MainMenu setMenuState={setMenuState} shareProgress={shareProgress} />}
        {menuState === 'profile' && <ProfileScreen player={player} totalStatus={totalStatus} setPlayer={setPlayer} onBack={() => setMenuState('main')} />}
        {menuState === 'work' && <WorkScreen player={player} totalStatus={totalStatus} onWork={handleWork} onBack={() => setMenuState('main')} />}
        {menuState === 'education' && <EducationScreen player={player} currentStatus={totalStatus} onBuy={handlePurchase} onBack={() => setMenuState('main')} />}
        {menuState === 'shop' && <ShopMenu setMenuState={setMenuState} shareProgress={shareProgress} />}

        {/* Секции магазинов */}
        {menuState === 'shop_clothes' && <CatalogScreen title="Магазин одежды" items={clothesCatalog} currentMoney={player.balances?.RUB} currentStatus={totalStatus} type="clothes" onBuy={handlePurchase} onBack={() => setMenuState('shop')} />}
        {menuState === 'shop_transport' && <CatalogScreen title="Автосалон" items={transportCatalog} currentMoney={player.balances?.RUB} currentStatus={totalStatus} type="transport" onBuy={handlePurchase} onBack={() => setMenuState('shop')} />}
        {menuState === 'shop_houses' && <CatalogScreen title="Недвижимость" items={housesCatalog} currentMoney={player.balances?.RUB} currentStatus={totalStatus} type="house" onBuy={handlePurchase} onBack={() => setMenuState('shop')} />}
        {menuState === 'shop_biz' && <CatalogScreen title="Стартапы" items={startupCatalog} currentMoney={player.balances?.RUB} currentStatus={totalStatus} type="business" onBuy={handlePurchase} onBack={() => setMenuState('shop')} />}
        {menuState === 'buyout' && <CatalogScreen title="Выкуп корпораций" items={buyoutCatalog} currentMoney={player.balances?.RUB} currentStatus={totalStatus} type="business" onBuy={handlePurchase} onBack={() => setMenuState('main')} />}

        {/* Экраны Банка и Валюты */}
        {menuState === 'exchange' && <ExchangeScreen exchangeAmount={exchangeAmount} setExchangeAmount={setExchangeAmount} handleExchange={handleExchange} onBack={() => setMenuState('main')} />}
        {menuState === 'bank' && <BankScreen player={player} maxLoan={maxLoan} takeLoan={takeLoan} repayLoanFull={repayLoanFull} onBack={() => setMenuState('main')} />}
        {menuState === 'entertainment' && <EntertainmentScreen player={player} setPlayer={setPlayer} onBack={() => setMenuState('main')} />}
      </div>

      <div style={{marginTop: '20px'}}>
        {/* Кнопка чита полностью вырезана, осталась только кнопка сброса */}
        <button className="btn" style={{background: '#ef4444', border: 'none', margin: 0, width: '100%' }} onClick={resetGame}>🔄 Начать заново</button>
      </div>
    </div>
  );
}

export default App;