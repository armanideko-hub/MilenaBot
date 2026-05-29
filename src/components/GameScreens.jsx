import React, { useState, useEffect } from 'react';
import Twemoji from 'react-twemoji';
import { clothesCatalog, transportCatalog, housesCatalog, startupCatalog, buyoutCatalog, jobsCatalog, educationCatalog } from '../data/catalog';
import { backstories } from '../data/backstory';

// ==========================================
// 1. ЭКРАН ПРОФИЛЯ С ИНВЕНТАРЕМ (ЯЧЕЙКИ)
// ==========================================
export function ProfileScreen({ player, totalStatus, onBack, setPlayer }) {
  const [isBagOpen, setIsBagOpen] = useState(false);

  const items = player.inventory?.items || [];
  const maxSlots = player.inventory?.maxSlots || 8;

  // Создаем фиксированную сетку ячеек
  const slots = Array.from({ length: maxSlots }, (_, index) => items[index] || null);

  // Покупка рюкзака на 16 слотов
  const upgradeBag = () => {
    if ((player.balances?.RUB || 0) < 5000) {
      alert('⚠️ Не хватает денег! Спортивный рюкзак стоит 5,000₽');
      return;
    }
    
    setPlayer(p => ({
      ...p,
      balances: { ...p.balances, RUB: p.balances.RUB - 5000 },
      inventory: {
        ...p.inventory,
        maxSlots: 16
      }
    }));
    alert('🎒 Успех! Ты купил рюкзак на 16 слотов.');
  };

  return (
    <Twemoji options={{ className: 'twemoji' }}>
      <div className="menu-screen" style={{ maxWidth: '480px', margin: '0 auto' }}>
        <h3>👤 Личное Дело</h3>
        
        <div className="info-box" style={{ marginBottom: '15px', padding: '12px', textAlign: 'left' }}>
          <p style={{ margin: '4px 0' }}>Уровень солидности: <strong style={{ color: '#facc15' }}>{totalStatus} ⭐</strong></p>
          <p style={{ margin: '4px 0' }}>Одежда: <strong>{player.inventory?.clothes || 'Нет'}</strong></p>
          <p style={{ margin: '4px 0' }}>Транспорт: <strong>{player.inventory?.transport || 'Нет'}</strong></p>
        </div>

        <button 
          className="btn" 
          style={{ background: isBagOpen ? '#2b3946' : '#3b82f6', marginBottom: '15px', width: '100%' }}
          onClick={() => setIsBagOpen(!isBagOpen)}
        >
          {isBagOpen ? '📂 Закрыть инвентарь' : '🎒 Открыть инвентарь'}
        </button>

        {isBagOpen && (
          <div style={{ background: '#18222f', padding: '15px', borderRadius: '10px', marginBottom: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '13px', color: '#708499' }}>Ячейки: {items.length} / {maxSlots}</span>
              {maxSlots === 8 && (
                <button 
                  onClick={upgradeBag}
                  style={{ background: '#d97706', border: 'none', color: '#fff', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', cursor: 'pointer' }}
                >
                  ➕ Купить рюкзак (5,000₽)
                </button>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginTop: '10px' }}>
              {slots.map((item, index) => (
                <div 
                  key={index} 
                  style={{ 
                    aspectRatio: '1/1', 
                    background: item ? '#243447' : '#111823', 
                    borderRadius: '8px', 
                    border: item ? '1px solid #3b82f655' : '1px dashed #243447',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    position: 'relative'
                  }}
                  title={item ? item.name : 'Пустой слот'}
                >
                  {item ? item.name.split(' ').pop() : ''} 
                  {item && (
                    <span style={{ position: 'absolute', bottom: '2px', left: '2px', fontSize: '8px', color: '#708499', maxWidth: '90%', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                      {item.name.slice(0, 6)}..
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <button className="btn" onClick={onBack}>↩️ Назад</button>
      </div>
    </Twemoji>
  );
}

// ==========================================
// 2. ТРЕХВКЛАДОЧНАЯ БИРЖА ТРУДА (ИСПРАВЛЕННАЯ)
// ==========================================
export function WorkScreen({ player, totalStatus, onWork, onBack }) {
  const [activeTab, setActiveTab] = useState('internet');
  const [avitoJobs, setAvitoJobs] = useState([]);
  const currentLicenses = player.inventory?.licenses || [];

  // Распределяем работы из нашего единого глобального jobsCatalog по вкладкам
  const internetJobs = jobsCatalog.filter(j => j.id === 'promoter' || j.id === 'designer');
  const officialAppsJobs = jobsCatalog.filter(j => j.id === 'courier' || j.id === 'welder' || j.id === 'mechanic' || j.id === 'banker' || j.id === 'director');

  const generateAvitoJobs = () => {
    const pool = [
      { id: 'avito_ads', name: 'Расклейка объявлений 📋', salary: 200, energyCost: 8, tax: 0, reqStatus: 0, desc: 'Быстрая расклейка по району. Чистая наличка.' },
      { id: 'avito_moving', name: 'Помощь с переездом 📦', salary: 600, energyCost: 25, tax: 0, reqStatus: 10, desc: 'Разгрузка вещей. Тяжелый физический труд.' },
      { id: 'avito_husky', name: 'Выгул хаски 🦮', salary: 320, energyCost: 10, tax: 0, reqStatus: 5, desc: 'Активная прогулка с собакой в парке.' },
      { id: 'avito_flyers', name: 'Раздача листовок у метро 📇', salary: 250, energyCost: 9, tax: 0, reqStatus: 0, desc: 'Раздача флаеров прохожим.' },
      { id: 'avito_buyer', name: 'Тайный покупатель 🕵️‍♂️', salary: 500, energyCost: 12, tax: 0.04, reqStatus: 15, desc: 'Проверка супермаркета. Официальный подбор.' }
    ];
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    setAvitoJobs(shuffled.slice(0, 3)); // Выводим 3 случайных объявления
  };

  useEffect(() => {
    generateAvitoJobs();
  }, []);

  const handleWorkClick = (job, isAvito = false, avitoIndex = null) => {
    // Рассчитываем чистую зарплату с учетом налога для передачи в стейт
    let finalSalary = job.salary;
    if (job.tax > 0) {
      finalSalary = finalSalary - Math.round(finalSalary * job.tax);
    }

    // Передаем КОРРЕКТНЫЙ объект работы для обработчика в App.js
    onWork({
      ...job,
      salary: finalSalary // переопределяем на сумму с вычетом налога
    });

    if (isAvito && avitoIndex !== null) {
      const updatedAvito = [...avitoJobs];
      updatedAvito.splice(avitoIndex, 1);
      setAvitoJobs(updatedAvito);
    }
  };

  return (
    <Twemoji options={{ className: 'twemoji' }}>
      <div className="menu-screen" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h3>Поиск подработки 💼</h3>
        <p style={{ fontSize: '13px', color: '#eab308' }}>Энергия: {player.energy}⚡ | Статус: {totalStatus}⭐</p>

        <div style={{ display: 'flex', gap: '5px', marginBottom: '15px', background: '#111823', padding: '4px', borderRadius: '8px' }}>
          <button style={{ flex: 1, padding: '8px 4px', fontSize: '11px', background: activeTab === 'internet' ? '#1e2b38' : 'transparent', border: 'none', color: '#fff', borderRadius: '6px' }} onClick={() => setActiveTab('internet')}>🌐 В интернете</button>
          <button style={{ flex: 1, padding: '8px 4px', fontSize: '11px', background: activeTab === 'avito' ? '#1e2b38' : 'transparent', border: 'none', color: '#fff', borderRadius: '6px' }} onClick={() => setActiveTab('avito')}>📦 На Авито ({avitoJobs.length})</button>
          <button style={{ flex: 1, padding: '8px 4px', fontSize: '11px', background: activeTab === 'apps' ? '#1e2b38' : 'transparent', border: 'none', color: '#fff', borderRadius: '6px' }} onClick={() => setActiveTab('apps')}>🛠 Проф. Работы</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {activeTab === 'internet' && internetJobs.map((job, idx) => {
            const hasStatus = totalStatus >= (job.reqStatus || 0);
            const hasLicense = !job.reqLicense || currentLicenses.includes(job.reqLicense);
            const isAvailable = hasStatus && hasLicense;

            return (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', padding: '10px 14px', background: '#1e2b38', borderRadius: '8px', textAlign: 'left', opacity: isAvailable ? 1 : 0.5 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff' }}>{job.name}</span>
                  <button className="btn buy-btn" style={{ margin: 0, padding: '6px 12px', fontSize: '12px', background: isAvailable ? '#4cb64c' : '#2b3946' }} disabled={!isAvailable} onClick={() => handleWorkClick(job)}> Работать </button>
                </div>
                <p style={{ fontSize: '12px', color: '#ef4444', margin: '4px 0 2px 0' }}>⚡ Расход энергии: -{job.energyCost}</p>
                <span style={{ fontSize: '12px', color: '#4cb64c', fontWeight: 'bold' }}>💰 Зарплата: +{job.salary}₽</span>
                {!hasLicense && <span style={{ fontSize: '11px', color: '#ef4444' }}>🔒 Требуется: {job.reqLicense}</span>}
                {!hasStatus && <span style={{ fontSize: '11px', color: '#ef4444' }}>🔒 Требуется статус: {job.reqStatus}⭐</span>}
              </div>
            );
          })}

          {activeTab === 'avito' && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', color: '#708499' }}>Разовые заказы (Обновляются сами)</span>
                <button style={{ background: '#243447', border: 'none', color: '#38bdf8', fontSize: '11px', padding: '4px 8px', borderRadius: '4px' }} onClick={generateAvitoJobs}>🔄 Обновить</button>
              </div>
              {avitoJobs.length === 0 ? (
                <p style={{ fontSize: '12px', color: '#708499', padding: '15px' }}>Объявления закончились. Обнови список!</p>
              ) : (
                avitoJobs.map((job, idx) => {
                  const isReady = totalStatus >= job.reqStatus;
                  return (
                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', padding: '10px 14px', background: '#1e2b38', borderRadius: '8px', textAlign: 'left', opacity: isReady ? 1 : 0.6 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff' }}>{job.name}</span>
                        <button className="btn buy-btn" style={{ margin: 0, padding: '6px 12px', fontSize: '12px', background: isReady ? '#eab308' : '#2b3946' }} disabled={!isReady} onClick={() => handleWorkClick(job, true, idx)}>Выполнить</button>
                      </div>
                      <p style={{ fontSize: '11px', color: '#708499', margin: '4px 0' }}>{job.desc}</p>
                      <p style={{ fontSize: '12px', color: '#ef4444', margin: '0 0 2px 0' }}>⚡ Расход энергии: -{job.energyCost}</p>
                      <span style={{ fontSize: '12px', color: '#4cb64c', fontWeight: 'bold' }}>💰 +{job.salary}₽ | {job.tax > 0 ? '📊 Налог: 4%' : '🤫 Наличные'}</span>
                    </div>
                  );
                })
              )}
            </>
          )}

          {activeTab === 'apps' && officialAppsJobs.map((job, idx) => {
            const hasStatus = totalStatus >= (job.reqStatus || 0);
            const hasLicense = !job.reqLicense || currentLicenses.includes(job.reqLicense);
            const isAvailable = hasStatus && hasLicense;
            return (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', padding: '10px 14px', background: '#1e2b38', borderRadius: '8px', textAlign: 'left', opacity: isAvailable ? 1 : 0.5 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff' }}>{job.name}</span>
                  <button className="btn buy-btn" style={{ margin: 0, padding: '6px 12px', fontSize: '12px', background: isAvailable ? '#0284c7' : '#2b3946' }} disabled={!isAvailable} onClick={() => handleWorkClick(job)}>Смена</button>
                </div>
                <p style={{ fontSize: '12px', color: '#ef4444', margin: '4px 0 2px 0' }}>⚡ Расход энергии: -{job.energyCost}</p>
                <span style={{ fontSize: '12px', color: '#4cb64c', fontWeight: 'bold' }}>💰 +{job.salary}₽ {job.tax > 0 && <span style={{ color: '#ef4444', fontSize: '11px' }}>(Налог 4% 📊)</span>}</span>
                {!hasLicense && <span style={{ fontSize: '11px', color: '#ef4444', marginTop: '4px', display: 'block' }}>🔒 Требуется образование: <b>{job.reqLicense}</b></span>}
                {!hasStatus && <span style={{ fontSize: '11px', color: '#ef4444', marginTop: '2px', display: 'block' }}>🔒 Требуется статус: {job.reqStatus}⭐</span>}
              </div>
            );
          })}
        </div>

        <button className="btn" style={{ marginTop: '15px' }} onClick={onBack}>↩️ Назад</button>
      </div>
    </Twemoji>
  );
}

// ==========================================
// 3. ЭКРАН ВЫБОРА ПРЕДЫСТОРИИ
// ==========================================
export function StorySelectionScreen({ onSelect }) {
  return (
    <Twemoji options={{ className: 'twemoji' }}>
      <div className="menu-screen" style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ color: '#facc15', marginBottom: '10px' }}>Выбери свою предысторию 🎭</h2>
        <p style={{ color: '#708499', fontSize: '14px', marginBottom: '25px' }}>
          От этого выбора зависят твои стартовые деньги, одежда и сложность выживания в РФ.
        </p>

        {backstories.map(story => (
          <div key={story.id} className="catalog-item" style={{ marginBottom: '20px', padding: '16px', background: '#1e2b38', borderRadius: '12px', border: '1px solid #2b3946', textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <h4 style={{ margin: 0, color: '#fff', fontSize: '18px' }}>{story.title}</h4>
              <span style={{ fontSize: '12px', padding: '4px 8px', borderRadius: '6px', background: '#243447', fontWeight: 'bold' }}>{story.difficulty}</span>
            </div>
            <p style={{ fontSize: '13px', color: '#aa99aa', lineHeight: '1.4', marginBottom: '12px' }}>{story.description}</p>
            <div style={{ fontSize: '13px', color: '#708499', marginBottom: '15px', background: '#18222f', padding: '8px', borderRadius: '6px' }}>
              <ul style={{ margin: 0, paddingLeft: '15px' }}>
                <li>Стартовый капитал: <span style={{ color: '#4cb64c', fontWeight: 'bold' }}>{story.startBalances?.RUB?.toLocaleString()}₽ 💰</span></li>
                <li>Одежда: <span style={{ color: '#38bdf8' }}>{story.startClothes}</span></li>
                <li>Образование: <span style={{ color: '#a78bfa' }}>{story.educationText}</span></li>
                <li>Начальный статус: <span style={{ color: '#facc15' }}>{story.startStatus}⭐</span></li>
              </ul>
            </div>
            <button className="btn buy-btn" style={{ width: '100%', margin: 0, padding: '10px', background: '#4cb64c' }} onClick={() => onSelect(story)}>Начать сценарий 🚀</button>
          </div>
        ))}
      </div>
    </Twemoji>
  );
}

// ==========================================
// 4. ЭСТЕТИЧНЫЙ ЭКРАН КУРСОВ И ОБУЧЕНИЯ
// ==========================================
export function EducationScreen({ player, currentStatus, onBuy, onBack }) {
  const currentLicenses = player.inventory?.licenses || [];

  return (
    <Twemoji options={{ className: 'twemoji' }}>
      <div className="menu-screen">
        <h3>🎓 Университеты и Курсы</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {educationCatalog.map(edu => {
            const hasLicense = currentLicenses.includes(edu.license);
            const hasStatus = currentStatus >= edu.reqStatus;

            let btnText = `💳 ${edu.price?.toLocaleString()}₽`;
            let btnBg = '#4cb64c';
            if (hasLicense) { btnText = '✅ Изучено'; btnBg = '#2b3946'; }
            else if (!hasStatus) { btnText = `🔒 ${edu.reqStatus}⭐`; btnBg = '#ef4444'; }

            return (
              <div key={edu.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#1e2b38', borderRadius: '8px', opacity: hasLicense ? 0.6 : 1 }}>
                <div style={{ textAlign: 'left', flex: 1, marginRight: '10px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff', display: 'block' }}>{edu.name}</span>
                  <span style={{ fontSize: '11px', color: '#708499' }}>📜 Выпуск: {edu.license}</span>
                </div>
                <button className="btn buy-btn" style={{ margin: 0, padding: '6px 12px', fontSize: '13px', minWidth: '110px', background: btnBg, whiteSpace: 'nowrap' }} disabled={hasLicense || !hasStatus} onClick={() => onBuy(edu, 'education')}>{btnText}</button>
              </div>
            );
          })}
        </div>
        <button className="btn" style={{ marginTop: '15px' }} onClick={onBack}>↩️ Назад</button>
      </div>
    </Twemoji>
  );
}

// ==========================================
// 5. ЭСТЕТИЧНЫЙ ЭКРАН СТРОЧНОГО МАГАЗИНА
// ==========================================
export function CatalogScreen({ title, items, currentMoney, currentStatus, type, onBuy, onBack }) {
  return (
    <Twemoji options={{ className: 'twemoji' }}>
      <div className="menu-screen">
        <h3>{title}</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {items.map(item => {
            const statusNotRequired = type === 'house' || type === 'business';
            const hasStatus = statusNotRequired || currentStatus >= (item.reqStatus || 0);
            
            let btnText = type === 'house' && item.isRent 
              ? `🔑 Снять: ${item.price?.toLocaleString()}₽` 
              : `🛒 ${item.price?.toLocaleString()}₽`;
            let btnBg = '#4cb64c';
            
            if (!hasStatus) { 
              btnText = `🔒 ${item.reqStatus}⭐`; 
              btnBg = '#ef4444'; 
            }
            
            const perks = [];
            if (item.statusBoost) perks.push(`+${item.statusBoost}⭐`);
            
            if (item.rentIncome) {
              if (type === 'house') {
                const expenseType = item.isRent ? 'Аренда' : 'Коммуналка';
                perks.push(`💸 ${expenseType}: -${item.rentIncome?.toLocaleString()}₽/10с`);
              } else {
                perks.push(`📈 Пассив: +${item.rentIncome?.toLocaleString()}₽/10с`);
              }
            }
            if (item.income) perks.push(`📈 Пассив: +${item.income?.toLocaleString()}₽/10с`);

            return (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#1e2b38', borderRadius: '8px' }}>
                <div style={{ textAlign: 'left', flex: 1, marginRight: '10px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff', display: 'block' }}>{item.name}</span>
                  {perks.length > 0 && <span style={{ fontSize: '11px', color: '#4cb64c', fontWeight: '500' }}>⚡ {perks.join(' | ')}</span>}
                </div>
                <button 
                  className="btn buy-btn" 
                  style={{ margin: 0, padding: '6px 12px', fontSize: '13px', minWidth: '110px', background: btnBg, whiteSpace: 'nowrap' }} 
                  disabled={!hasStatus} 
                  onClick={() => onBuy(item, type)}
                >
                  {btnText}
                </button>
              </div>
            );
          })}
        </div>
        <button className="btn" style={{ marginTop: '15px' }} onClick={onBack}>↩️ Назад</button>
      </div>
    </Twemoji>
  );
}

// ==========================================
// 6. ИСПРАВЛЕННЫЙ ЭКРАН КАЗИНО
// ==========================================
export function EntertainmentScreen({ player, setPlayer, onBack }) {
  const [bet, setBet] = useState(1000);
  const [slots, setSlots] = useState(['🎰', '🎰', '🎰']);
  const [statusMessage, setStatusMessage] = useState('Испытай свою удачу!');

  const emojis = ['🍒', '🍋', '💎', '7️⃣'];

  const playSlots = () => {
    if ((player.balances?.RUB || 0) < bet) return alert("Не хватает рублей для ставки!");

    const randomChance = Math.random() * 100;
    let res1, res2, res3;
    let prize = 0;
    let message = '';

    // ШАНС ПРЕЖДЕ БЫЛ 40%, ТЕПЕРЬ СРЕЗАН ДО 15%
    if (randomChance <= 15) {
      // Редкая победа (15% шанс)
      const winEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      res1 = res2 = res3 = winEmoji;
      
      // Повысили множитель до x4, чтобы компенсировать сложность, но за счет 85% проигрышей казино уходит в плюс
      prize = bet * 4; 
      message = `🎉 КРУПНЫЙ ВЫИГРЫШ! Вы забрали ${(prize - bet)?.toLocaleString()}₽!`;
    } else {
      // Стандартный проигрыш (85% шанс)
      res1 = emojis[Math.floor(Math.random() * emojis.length)];
      res2 = emojis[Math.floor(Math.random() * emojis.length)];
      res3 = emojis[Math.floor(Math.random() * emojis.length)];
      
      // Защита от случайного совпадения при проигрыше
      if (res1 === res2 && res2 === res3) {
        res1 = emojis[(emojis.indexOf(res1) + 1) % emojis.length];
      }

      prize = 0;
      message = `😢 Увы, мимо... Автомат забирает ${bet?.toLocaleString()}₽`;
    }

    // Сначала обновляем локальный стейт визуала
    setSlots([res1, res2, res3]);
    setStatusMessage(message);

    // Безопасно обновляем баланс
    setPlayer(prev => {
      const currentRUB = prev.balances?.RUB || 0;
      const totalLost = prev.stats?.lostCasino || 0;
      const totalEarned = prev.stats?.earnedCasino || 0;

      return {
        ...prev,
        balances: {
          ...prev.balances,
          RUB: Math.max(0, currentRUB - bet + prize)
        },
        stats: {
          ...prev.stats,
          // Аккуратно пишем статистику для функции shareProgress
          lostCasino: prize === 0 ? totalLost + bet : totalLost,
          earnedCasino: prize > 0 ? totalEarned + (prize - bet) : totalEarned
        }
      };
    });
  };

  // Далее идет ваш JSX (кнопки ставок и "ДЁРНУТЬ РЫЧАГ"), он остается прежним

  return (
    <Twemoji options={{ className: 'twemoji' }}>
      <div className="menu-screen" style={{ maxWidth: '480px', margin: '0 auto' }}>
        <h3>🎰 Казино "Вулкан Милены"</h3>
        
        <div style={{ background: '#111827', padding: '20px', borderRadius: '12px', textAlign: 'center', marginBottom: '15px', border: '2px solid #a855f7' }}>
          <div style={{ fontSize: '36px', letterSpacing: '10px', marginBottom: '10px' }}>
            {slots[0]} {slots[1]} {slots[2]}
          </div>
          <p style={{ fontSize: '13px', color: '#eab308', margin: 0, fontWeight: 'bold' }}>{statusMessage}</p>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontSize: '12px', color: '#9ca3af', display: 'block', marginBottom: '5px' }}>Выбери ставку:</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '5px' }}>
            <button className="btn" style={{ margin: 0, padding: '6px', background: bet === 1000 ? '#a855f7' : '#1e2b38' }} onClick={() => setBet(1000)}>1 000₽</button>
            <button className="btn" style={{ margin: 0, padding: '6px', background: bet === 10000 ? '#a855f7' : '#1e2b38' }} onClick={() => setBet(10000)}>10 000₽</button>
            <button className="btn" style={{ margin: 0, padding: '6px', background: bet === 100000 ? '#a855f7' : '#1e2b38' }} onClick={() => setBet(100000)}>100 000₽</button>
          </div>
        </div>

        <button className="btn" style={{ background: '#eab308', color: '#000', fontWeight: 'bold', fontSize: '16px' }} onClick={playSlots}>🎰 ДЁРНУТЬ РЫЧАГ</button>
        <button className="btn" onClick={onBack}>↩️ В главное меню</button>
      </div>
    </Twemoji>
  );
}