import React from 'react';

export function HomelessAlert({ player }) {
  const housesInCurrentCity = player.inventory?.houses?.filter(
    house => house.purchasedInCity === (player.currentCityId || 'smolensk')
  ) || [];
  
  const isHomeless = housesInCurrentCity.length === 0;

  if (!isHomeless) return null;

  return (
    <div style={{ 
      background: '#ef4444', 
      color: '#fff', 
      padding: '6px', 
      borderRadius: '6px', 
      fontSize: '12px', 
      textAlign: 'center', 
      marginBottom: '8px', 
      fontWeight: 'bold' 
    }}>
      ⛺ Вы бездомный в этом городе! Энергия восстанавливается медленно. Купите или снимите жилье здесь!
    </div>
  );
}
