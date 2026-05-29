import { useEffect } from 'react';

export function useGameTimer(player, setPlayer) {
  useEffect(() => {
    if (!player) return;

    const interval = setInterval(() => {
      setPlayer(prev => {
        if (!prev || !prev.balances || !prev.inventory) return prev;

        const currentCityId = prev.currentCityId || 'smolensk';
        const currentRUB = prev.balances.RUB || 0;
        
        let remainingRUB = currentRUB;

        // Process houses
        let housesInCurrentCity = [];
        const updatedHouses = prev.inventory.houses?.map(house => {
          if (house.purchasedInCity === currentCityId) {
            housesInCurrentCity.push(house);
          }
          
          const expense = house.rentIncome || 0;
          if (expense > 0) {
            if (remainingRUB >= expense) {
              remainingRUB -= expense;
              return { ...house, disabled: false }; // Paid successfully
            } else {
              // Can't afford
              if (house.type === 'rent') {
                return null; // Lose rented house
              } else {
                return { ...house, disabled: true }; // Disable purchased house
              }
            }
          }
          return { ...house, disabled: false };
        }).filter(Boolean) || []; // Remove nulls (lost rented houses)

        // Find best active house in current city for energy recovery
        const activeHousesInCity = housesInCurrentCity.filter(h => !h.disabled);
        let energyRecovery = 1; // Homeless base recovery
        
        if (activeHousesInCity.length > 0) {
          // Find max status boost to determine house quality for energy
          const maxStatus = Math.max(...activeHousesInCity.map(h => h.statusBoost || 0));
          // Base recovery 5, plus 1 for every 10 status boost (or customize as needed)
          energyRecovery = 5 + Math.floor(maxStatus / 10);
        }

        const bizIncome = prev.inventory.businesses?.reduce((sum, b) => sum + (b.income || 0), 0) || 0;
        remainingRUB += bizIncome;

        const currentHourlyPayment = prev.hourlyPayment || 0;
        const debtCurrency = prev.debtCurrency || 'RUB';
        
        let newDebt = prev.debt;
        let nextHourlyPayment = currentHourlyPayment;
        let updatedBalances = { ...prev.balances, RUB: Math.max(0, remainingRUB) };

        if (prev.debt > 0 && currentHourlyPayment > 0) {
          let availableFunds = updatedBalances[debtCurrency] || 0;
          let actualPayment = 0;

          if (availableFunds >= currentHourlyPayment) {
            actualPayment = currentHourlyPayment;
          } else {
            actualPayment = availableFunds;
          }

          updatedBalances[debtCurrency] -= actualPayment;

          // Уменьшаем долг только на ту сумму, которую реально смогли списать, минус 10% как комиссия
          const principalPayment = Math.max(0, actualPayment - Math.floor(currentHourlyPayment * 0.1));
          newDebt = prev.debt - principalPayment;

          if (newDebt <= 0) {
            newDebt = 0;
            nextHourlyPayment = 0;
          }
        }

        return {
          ...prev,
          balances: updatedBalances,
          inventory: { ...prev.inventory, houses: updatedHouses },
          debt: Math.max(0, newDebt),
          hourlyPayment: nextHourlyPayment,
          energy: Math.min(100, (prev.energy || 0) + energyRecovery)
        };
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [player, setPlayer]);
}