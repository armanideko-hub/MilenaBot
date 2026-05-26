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
function App() {
  const hasSavedGame = localStorage.getItem('milena_v4_player');
  const [menuState, setMenuState] = useState(hasSavedGame ? 'main' : 'story_selection');
  const [exchangeAmount, setExchangeAmount] = useState('');

  const [player, setPlayer] = useState(() => {
    const saved = localStorage.getItem('milena_v4_player');
    return saved ? JSON.parse(saved) : null;
  });

  // Логика подсчета полного статуса игрока (учитывает и купленное, и арендованное жилье)
  const totalStatus = player ? (player.baseStatus + player.inventory.houses
    .reduce((sum, h) => sum + (h.statusBoost || 0), 0)) : 0;

  const maxLoan = totalStatus * 5000; 

  // Синхронизация состояния с localStorage
  useEffect(() => {
    if (player) {
      localStorage.setItem('milena_v4_player', JSON.stringify(player));
    }
  }, [player]);

  // Главный игровой таймер (Пассивные доходы, РАСХОДЫ и РЕГЕНЕРАЦИЯ)
  useEffect(() => {
    if (!player) return;

    const interval = setInterval(() => {
      setPlayer(prev => {
        if (!prev || !prev.balances) return prev;

        // Расход жилья (аренда или коммуналка купленного)
        const housingExpenses = prev.inventory.houses.reduce((sum, h) => sum + (h.rentIncome || 0), 0);
        // Доход от бизнесов
        const bizIncome = prev.inventory.businesses.reduce((sum, b) => sum + (b.income || 0), 0);
        
        // Расчет восстановления энергии: ЕСЛИ ЖИЛЬЯ НЕТ (длина массива 0) -> +1, ЕСЛИ ЕСТЬ -> +5
        const hasHome = prev.inventory.houses.length > 0;
        const energyRecovery = hasHome ? 5 : 1;

        // Итоговый баланс: старый баланс + прибыль - жилье - кредитная выплата
        let newRUB = prev.balances.RUB + bizIncome - housingExpenses - prev.hourlyPayment;
        let newDebt = prev.debt - Math.max(0, prev.hourlyPayment - Math.floor(prev.hourlyPayment * 0.1));
        
        if (newDebt <= 0) { 
          newDebt = 0; 
          prev.hourlyPayment = 0; 
        }

        return {
          ...prev,
          balances: { ...prev.balances, RUB: Math.max(0, newRUB) },
          debt: Math.max(0, newDebt),
          hourlyPayment: newDebt === 0 ? 0 : prev.hourlyPayment,
          energy: Math.min(100, prev.energy + energyRecovery)
        };
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [player]);

  const runAdminCheat = () => {
    setPlayer(p => {
      if (!p) return p;
      return {
        ...p,
        balances: { RUB: p.balances.RUB + 10000000, USD: p.balances.USD + 5000, EUR: p.balances.EUR + 3000 },
        baseStatus: p.baseStatus + 1000
      };
    });
  };

  const handleSelectStory = (story) => {
    const initialPlayerState = {
      balances: { ...story.startBalances },
      energy: 100,
      baseStatus: story.startStatus,
      debt: 0,
      hourlyPayment: 0,
      inventory: { 
        clothes: story.startClothes, 
        transport: 'Ноги 👣', 
        houses: [], // Изначально бездомный
        businesses: [], 
        licenses: [...story.startLicenses],
        maxSlots: 8, 
        items: [
          { id: 'key_home', name: 'Ключи от дома 🔑' },
          { id: 'phone_old', name: 'Старый телефон 📱' }
        ] 
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
      balances: { ...prev.balances, RUB: prev.balances.RUB + job.salary },
      energy: prev.energy - job.energyCost
    }));
  };

  const handleExchange = (targetCurrency, isBuying) => {
    const amount = parseFloat(exchangeAmount);
    if (!amount || amount <= 0) return alert("Введите корректную сумму!");
    const rate = currencies[targetCurrency].rateToRUB;
    const totalCostRUB = Math.round(amount * rate);

    setPlayer(prev => {
      const updatedBalances = { ...prev.balances };
      if (isBuying) {
        if (prev.balances.RUB < totalCostRUB) return alert("Не хватает рублей!") || prev;
        updatedBalances.RUB -= totalCostRUB;
        updatedBalances[targetCurrency] += amount;
      } else {
        if (prev.balances[targetCurrency] < amount) return alert("Не хватает валюты!") || prev;
        updatedBalances[targetCurrency] -= amount;
        updatedBalances.RUB += totalCostRUB;
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
      balances: { ...prev.balances, RUB: prev.balances.RUB + amount },
      debt: amount,
      hourlyPayment: Math.floor(amount * 0.12)
    }));
  };

  const repayLoanFull = () => {
    if (player.balances.RUB < player.debt) return alert("Недостаточно средств!");
    setPlayer(prev => ({ ...prev, balances: { ...prev.balances, RUB: prev.balances.RUB - prev.debt }, debt: 0, hourlyPayment: 0 }));
  };

  const handlePurchase = (item, type) => {
    if (player.balances.RUB < item.price) return alert("Не хватает рублей!");

    const typesRequiringStatus = ['clothes', 'transport', 'education'];
    if (typesRequiringStatus.includes(type) && item.reqStatus && totalStatus < item.reqStatus) {
      return alert(`Слишком низкий статус! Для этого требуется минимум ${item.reqStatus}⭐`);
    }

    setPlayer(prev => {
      const currentLicenses = prev.inventory.licenses || [];
      const updated = { 
        ...prev, 
        balances: { ...prev.balances, RUB: prev.balances.RUB - item.price },
        inventory: { ...prev.inventory, licenses: currentLicenses }
      };
      
      if (type === 'clothes') {
        updated.baseStatus += item.statusBoost;
        updated.inventory.clothes = item.name;
      } else if (type === 'transport') {
        updated.baseStatus += item.statusBoost;
        updated.inventory.transport = item.name;
      } else if (type === 'house') {
        // Защита от повторного съема одного и того же жилья
        const alreadyHasIt = prev.inventory.houses.some(h => h.name === item.name);
        if (alreadyHasIt) {
          alert("Вы уже владеете этим жильем или арендуете его!");
          return prev;
        }

        // Создаем объект жилья. Тип зависит от флага isRent в каталоге
        const newHouse = { 
          instanceId: Date.now(), 
          name: item.name, 
          type: item.isRent ? 'rent' : 'live', 
          statusBoost: item.statusBoost, 
          rentIncome: item.rentIncome 
        };
        updated.inventory.houses = [...updated.inventory.houses, newHouse];
      } else if (type === 'business') {
        const newBiz = { instanceId: Date.now(), name: item.name, income: item.income };
        updated.inventory.businesses = [...updated.inventory.businesses, newBiz];
      } else if (type === 'education') {
        if (currentLicenses.includes(item.license)) return prev;
        updated.baseStatus += item.statusBoost;
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

  if (menuState === 'story_selection' || !player) {
    return (
      <div className="game-container" style={{paddingTop: '40px'}}>
        <StorySelectionScreen onSelect={handleSelectStory} />
      </div>
    );
  }

  return (
    <div className="game-container">
      {/* Выводим предупреждение на экран, если игрок бездомный */}
      {player.inventory.houses.length === 0 && (
        <div style={{background: '#ef4444', color: '#fff', padding: '6px', borderRadius: '6px', fontSize: '12px', textAlign: 'center', marginBottom: '8px', fontWeight: 'bold'}}>
          ⛺ Вы бездомный! Энергия восстанавливается очень медленно (+1). Снимите или купите жилье!
        </div>
      )}
      
      <GameHeader player={player} totalStatus={totalStatus} />

      <div className="menu-container">
        {menuState === 'main' && <MainMenu setMenuState={setMenuState} />}
        {menuState === 'profile' && <ProfileScreen player={player} totalStatus={totalStatus} setPlayer={setPlayer} onBack={() => setMenuState('main')} />}
        {menuState === 'work' && <WorkScreen player={player} totalStatus={totalStatus} onWork={handleWork} onBack={() => setMenuState('main')} />}
        {menuState === 'education' && <EducationScreen player={player} currentStatus={totalStatus} onBuy={handlePurchase} onBack={() => setMenuState('main')} />}
        {menuState === 'shop' && <ShopMenu setMenuState={setMenuState} />}

        {/* Секции магазинов */}
        {menuState === 'shop_clothes' && <CatalogScreen title="Магазин одежды" items={clothesCatalog} currentMoney={player.balances?.RUB} currentStatus={totalStatus} type="clothes" onBuy={handlePurchase} onBack={() => setMenuState('shop')} />}
        {menuState === 'shop_transport' && <CatalogScreen title="Автосалон" items={transportCatalog} currentMoney={player.balances?.RUB} currentStatus={totalStatus} type="transport" onBuy={handlePurchase} onBack={() => setMenuState('shop')} />}
        {menuState === 'shop_houses' && <CatalogScreen title="Недвижимость (Аренда/Покупка)" items={housesCatalog} currentMoney={player.balances?.RUB} currentStatus={totalStatus} type="house" onBuy={handlePurchase} onBack={() => setMenuState('shop')} />}
        {menuState === 'shop_biz' && <CatalogScreen title="Стартапы с нуля" items={startupCatalog} currentMoney={player.balances?.RUB} currentStatus={totalStatus} type="business" onBuy={handlePurchase} onBack={() => setMenuState('shop')} />}
        {menuState === 'buyout' && <CatalogScreen title="Выкуп готовых корпораций" items={buyoutCatalog} currentMoney={player.balances?.RUB} currentStatus={totalStatus} type="business" onBuy={handlePurchase} onBack={() => setMenuState('main')} />}

        {/* Экраны Банка и Валюты */}
        {menuState === 'exchange' && <ExchangeScreen exchangeAmount={exchangeAmount} setExchangeAmount={setExchangeAmount} handleExchange={handleExchange} onBack={() => setMenuState('main')} />}
        {menuState === 'bank' && <BankScreen player={player} maxLoan={maxLoan} takeLoan={takeLoan} repayLoanFull={repayLoanFull} onBack={() => setMenuState('main')} />}
        {menuState === 'entertainment' && <EntertainmentScreen player={player} setPlayer={setPlayer} onBack={() => setMenuState('main')} />}
      </div>

      <div style={{display: 'flex', gap: '10px', marginTop: '20px'}}>
       {/* <button className="btn" style={{background: '#d97706', border: 'none', margin: 0, flex: 1}} onClick={runAdminCheat}>💥 Админка</button> */}
        <button className="btn" style={{background: '#ef4444', border: 'none', margin: 0, flex: 1}} onClick={resetGame}>🔄 Начать заново</button>
      </div>
    </div>
  );
}

export default App;