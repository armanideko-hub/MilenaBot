import React from 'react';
import Twemoji from 'react-twemoji';
import { formatMoney } from '../../data/currencies';
import { currencies } from '../../data/currencies';

export function CatalogScreen({ title, items, currentMoney, currentStatus, type, onBuy, onBack, currentCity }) {
  const activeCurrencyId = currentCity?.currency || 'RUB';
  const currencyConfig = currencies[activeCurrencyId] || currencies.RUB;

  return (
    <Twemoji options={{ className: 'twemoji' }}>
      <div className="menu-screen">
        <h3>{title}</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {items.map(item => {
            const statusNotRequired = type === 'house' || type === 'business';
            const hasStatus = statusNotRequired || currentStatus >= (item.reqStatus || 0);
            
            const isRealEstateOrBiz = ['house', 'business'].includes(type);
            const rubPrice = isRealEstateOrBiz 
              ? Math.floor(item.price * (currentCity?.priceMultiplier || 1)) 
              : item.price;
            
            let btnText = type === 'house' && item.isRent 
              ? `🔑 Снять: ${formatMoney(rubPrice, activeCurrencyId)}` 
              : `🛒 ${formatMoney(rubPrice, activeCurrencyId)}`;
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
                perks.push(`💸 ${expenseType}: -${formatMoney(item.rentIncome, 'RUB')}/10с`);
              } else {
                perks.push(`📈 Пассив: +${formatMoney(item.rentIncome, 'RUB')}/10с`);
              }
            }
            if (item.income) perks.push(`📈 Пассив: +${formatMoney(item.income, 'RUB')}/10с`);

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