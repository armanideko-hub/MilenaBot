import React from 'react';
import Twemoji from 'react-twemoji';
import { educationCatalog } from '../../data/catalog';
import { formatMoney } from '../../data/currencies';

export function EducationScreen({ player, currentStatus, onBuy, onBack, currentCity }) {
  const currentLicenses = player.inventory?.licenses || [];

  return (
    <Twemoji options={{ className: 'twemoji' }}>
      <div className="menu-screen">
        <h3>🎓 Университеты и Курсы</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {educationCatalog.map(edu => {
            const hasLicense = currentLicenses.includes(edu.license);
            const hasStatus = currentStatus >= edu.reqStatus;

            let btnText = `💳 ${formatMoney(edu.price, currentCity.currency)}`;
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