// src/hooks/useGameplayActions.js

import { travelPrices } from '../data/cities'; // Импортируем матрицу цен билетов
import { currencies } from '../data/currencies'; // Импортируем твои курсы валют

export function useGameplayActions(player, setPlayer, currentCity, totalStatus, setMenuState) {

  // Функция-помощник для получения символа текущей валюты в сообщениях
  const getCurrencySign = (currency) => {
    if (currency === 'USD') return '$';
    if (currency === 'EUR') return '€';
    return '₽';
  };

  const handleSelectStory = (story) => {
    const initialPlayerState = {
      ...story.initialState, 
      backstoryId: story.id,
      difficulty: story.difficulty || 'Обычная',
      currentCityId: story.startCityId || 'smolensk',
      balances: { 
        RUB: story.startBalances?.RUB || 0, 
        USD: story.startBalances?.USD || 0, 
        EUR: story.startBalances?.EUR || 0 
      },
      energy: 100,
      baseStatus: story.startStatus || 10,
      inventory: { 
        houses: [],
        businesses: [],
        clothes: story.startClothes || 'Старая одежда 👕', 
        licenses: [...(story.startLicenses || [])],
      }
    };
    setPlayer(initialPlayerState);
    setMenuState('main');
  };

  // 1. ДИНАМИЧЕСКАЯ РАБОТА
  const handleWork = (job) => {
    if (player.energy < job.energyCost) return alert("Вы слишком устали!");
    
    const activeCurrencyId = currentCity.currency || 'RUB'; 
    const currencyConfig = currencies[activeCurrencyId] || currencies.RUB;

    // Считаем рублевую зарплату (для статистики и базового расчета)
    const rubSalary = Math.floor(job.salary * currentCity.salaryMultiplier);

    // Конвертируем в нужную валюту для зачисления на баланс
    const finalSalary = activeCurrencyId === 'RUB' 
      ? rubSalary 
      : Number((rubSalary / currencyConfig.rateToRUB).toFixed(2));

    setPlayer(prev => {
      const currentBalance = prev.balances?.[activeCurrencyId] || 0;
      return {
        ...prev,
        balances: { 
          ...prev.balances, 
          [activeCurrencyId]: Number((currentBalance + finalSalary).toFixed(2))
        },
        energy: prev.energy - job.energyCost,
        stats: { ...prev.stats, earnedWork: (prev.stats?.earnedWork || 0) + rubSalary }
      };
    });
  };

  // 2. ПЕРЕЕЗД ПО МАТРИЦЕ ЦЕН И ВАЛЮТ
  const handleMoveCity = (targetCity) => {
    const currentCityId = player.currentCityId || 'smolensk';
    if (currentCityId === targetCity.id) return alert("Вы уже находитесь в этом городе!");
    
    const activeCurrencyId = currentCity.currency || 'RUB'; 
    const currencyConfig = currencies[activeCurrencyId] || currencies.RUB;
    
    const movePrice = travelPrices[currentCityId]?.[targetCity.id] || 0;
    const playerBalance = player.balances?.[activeCurrencyId] || 0;

    if (playerBalance < movePrice) {
      return alert(`Не хватает денег на билет! Цена: ${movePrice.toLocaleString('ru-RU')}${currencyConfig.symbol}`);
    }
    if (totalStatus < targetCity.reqStatus) {
      return alert(`Недостаточно статуса! Нужен авторитет минимум ${targetCity.reqStatus}⭐`);
    }

    setPlayer(prev => ({
      ...prev,
      balances: { 
        ...prev.balances, 
        [activeCurrencyId]: playerBalance - movePrice 
      },
      currentCityId: targetCity.id
    }));
    alert(`🎉 Поздравляем! Вы успешно переехали в город: ${targetCity.name}`);
  };

  // 3. ПОКУПКА С КОНВЕРТАЦИЕЙ ПО КУРСУ
  const handlePurchase = (item, type) => {
    const activeCurrencyId = currentCity.currency || 'RUB';
    const currencyConfig = currencies[activeCurrencyId] || currencies.RUB;

    // Считаем базовую рублёвую цену (учитываем наценку города для недвижимости и бизнеса)
    const isRealEstateOrBiz = ['house', 'business'].includes(type);
    const rubPrice = isRealEstateOrBiz 
      ? Math.floor(item.price * currentCity.priceMultiplier) 
      : item.price;

    // Конвертируем рубли из каталога в целевую валюту (USD/EUR)
    const finalPrice = activeCurrencyId === 'RUB' 
      ? rubPrice 
      : Number((rubPrice / currencyConfig.rateToRUB).toFixed(2)); 

    const playerBalance = player.balances?.[activeCurrencyId] || 0;

    if (playerBalance < finalPrice) {
      return alert(`Не хватает средств! Цена: ${finalPrice.toLocaleString('ru-RU')}${currencyConfig.symbol}`);
    }

    const typesRequiringStatus = ['clothes', 'transport', 'education'];
    if (typesRequiringStatus.includes(type) && item.reqStatus && totalStatus < item.reqStatus) {
      return alert(`Слишком низкий статус! Требуется минимум ${item.reqStatus}⭐`);
    }

    setPlayer(prev => {
      const currentLicenses = prev.inventory?.licenses || [];
      const updated = { 
        ...prev, 
        balances: { 
          ...prev.balances, 
          [activeCurrencyId]: Number((playerBalance - finalPrice).toFixed(2)) 
        },
        inventory: { ...prev.inventory, licenses: currentLicenses }
      };
      
      if (type === 'clothes') {
        updated.baseStatus = (updated.baseStatus || 0) + (item.statusBoost || 0);
        updated.inventory.clothes = item.name;
      } else if (type === 'transport') {
        updated.baseStatus = (updated.baseStatus || 0) + (item.statusBoost || 0);
        updated.inventory.transport = item.name;
      } else if (type === 'house') {
        const newHouse = { 
          instanceId: Date.now(), 
          name: item.name, 
          type: item.isRent ? 'rent' : 'live', 
          statusBoost: item.statusBoost || 0, 
          rentIncome: item.rentIncome || 0, 
          purchasedInCity: prev.currentCityId || 'smolensk',
          price: item.price
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
    const usd = player.balances?.USD || 0;
    const eur = player.balances?.EUR || 0;
    const difficulty = player.difficulty || 'Обычная';
    const work = player.stats?.earnedWork || 0;
    const casino = player.stats?.earnedCasino || 0;
    const biz = player.stats?.earnedBusiness || 0;
    const lost = player.stats?.lostCasino || 0;
    
    const houses = player.inventory?.houses || [];
    const transport = player.inventory?.transport !== 'Ноги 👣' ? [player.inventory?.transport] : [];
    const businesses = player.inventory?.businesses || [];
    const allAssets = [...houses, ...transport, ...businesses];

    const assetsStrings = allAssets.map(asset => typeof asset === 'object' && asset !== null ? asset.name || JSON.stringify(asset) : asset);

    const text = `🏆 Мой прогресс в MilenaBot!\n🌍 Сложность мира: ${difficulty}\n📍 Локация: ${currentCity.name}\n\n💰 Текущий баланс:\n• Рубли: ${rub.toLocaleString()}₽${usd > 0 ? `\n• Доллары: $${usd.toLocaleString()}` : ''}${eur > 0 ? `\n• Евро: €${eur.toLocaleString()}` : ''}\n\n📈 Статистика доходов:\n• На работе: +${work.toLocaleString()}₽\n• На бизнесах: +${biz.toLocaleString()}₽\n• Выиграно в казино: +${casino.toLocaleString()}₽\n\n📉 Азартные потери:\n• Оставлено в казино: ${lost.toLocaleString()}₽\n\n🏠 Крупное имущество:\n${assetsStrings.length > 0 ? assetsStrings.map(asset => `• ${asset}`).join('\n') : '• Отсутствует ⛺'}`;

    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.showPopup({
        title: 'Поделиться успехом? 🚀',
        message: 'Твои достижения будут скопированы в буфер обмена. Отправь их в чат друзьям!',
        buttons: [{ id: 'copy', type: 'ok', text: 'Скопировать' }]
      }, (buttonId) => {
        if (buttonId === 'copy') {
          navigator.clipboard.writeText(text.trim()).then(() => { if (tg.showAlert) tg.showAlert('📋 Прогресс скопирован в буфер обмена!'); });
        }
      });
    } else {
      navigator.clipboard.writeText(text.trim()).then(() => alert('📋 Прогресс скопирован в буфер обмена!'));
    }
  };

  return { handleSelectStory, handleWork, handleMoveCity, handlePurchase, resetGame, shareProgress };
}