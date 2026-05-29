import React from 'react';
import { MainMenu, ShopMenu } from './MainMenu';
import { 
  MyHousesScreen, 
  ProfileScreen, 
  WorkScreen, 
  CatalogScreen, 
  EducationScreen, 
  EntertainmentScreen, 
  BankScreen, 
  ExchangeScreen, 
  CityScreen 
} from './GameScreens';
import { clothesCatalog, transportCatalog, housesCatalog, startupCatalog, buyoutCatalog } from '../data/catalog';

export function GameRouter({ 
  menuState, 
  setMenuState, 
  player, 
  setPlayer, 
  totalStatus, 
  exchangeAmount, 
  setExchangeAmount, 
  maxLoan, 
  currentCity, 
  handleWork, 
  handleExchange, 
  takeLoan, 
  repayLoanFull, 
  handleMoveCity, 
  handlePurchase, 
  shareProgress 
}) {
  switch (menuState) {
    case 'main':
      return <MainMenu setMenuState={setMenuState} shareProgress={shareProgress} />;
    
    case 'profile':
      return (
        <ProfileScreen 
          player={player} 
          totalStatus={totalStatus} 
          setPlayer={setPlayer} 
          setMenuState={setMenuState} 
          onBack={() => setMenuState('main')} 
        />
      );

    case 'my_houses':
      return <MyHousesScreen player={player} setMenuState={setMenuState} />;

    case 'work':
      return (
        <WorkScreen 
          player={player} 
          totalStatus={totalStatus} 
          currentCity={currentCity}
          onWork={handleWork} 
          onBack={() => setMenuState('main')} 
        />
      );

    case 'education':
      return (
        <EducationScreen 
          player={player} 
          currentStatus={totalStatus} 
          onBuy={handlePurchase} 
          onBack={() => setMenuState('main')} 
          currentCity={currentCity}
        />
      );

    case 'shop':
      return <ShopMenu setMenuState={setMenuState} shareProgress={shareProgress} />;

    case 'city_selection':
      return (
        <CityScreen 
          player={player} 
          totalStatus={totalStatus} 
          onMoveCity={handleMoveCity} 
          onBack={() => setMenuState('main')} 
        />
      );

    case 'shop_clothes':
      return (
        <CatalogScreen 
          title="Магазин одежды" 
          items={clothesCatalog} 
          currentMoney={player.balances?.RUB} 
          currentStatus={totalStatus} 
          type="clothes" 
          onBuy={handlePurchase} 
          onBack={() => setMenuState('shop')} 
          currentCity={currentCity}
        />
      );

    case 'shop_transport':
      return (
        <CatalogScreen 
          title="Автосалон" 
          items={transportCatalog} 
          currentMoney={player.balances?.RUB} 
          currentStatus={totalStatus} 
          type="transport" 
          onBuy={handlePurchase} 
          onBack={() => setMenuState('shop')} 
          currentCity={currentCity}
        />
      );

    case 'shop_houses':
      return (
        <CatalogScreen 
          title="Недвижимость" 
          items={housesCatalog} 
          currentMoney={player.balances?.RUB} 
          currentStatus={totalStatus} 
          type="house" 
          onBuy={handlePurchase} 
          onBack={() => setMenuState('shop')} 
          currentCity={currentCity}
        />
      );

    case 'shop_biz':
      return (
        <CatalogScreen 
          title="Стартапы" 
          items={startupCatalog} 
          currentMoney={player.balances?.RUB} 
          currentStatus={totalStatus} 
          type="business" 
          onBuy={handlePurchase} 
          onBack={() => setMenuState('shop')} 
          currentCity={currentCity}
        />
      );

    case 'buyout':
      return (
        <CatalogScreen 
          title="Выкуп корпораций" 
          items={buyoutCatalog} 
          currentMoney={player.balances?.RUB} 
          currentStatus={totalStatus} 
          type="business" 
          onBuy={handlePurchase} 
          onBack={() => setMenuState('main')} 
          currentCity={currentCity}
        />
      );

    case 'exchange':
      return (
        <ExchangeScreen 
          exchangeAmount={exchangeAmount} 
          setExchangeAmount={setExchangeAmount} 
          handleExchange={handleExchange} 
          onBack={() => setMenuState('main')} 
        />
      );

    case 'bank':
      return (
        <BankScreen 
          player={player} 
          maxLoan={maxLoan} 
          takeLoan={takeLoan} 
          repayLoanFull={repayLoanFull} 
          onBack={() => setMenuState('main')} 
          currentCity={currentCity}
        />
      );

    case 'entertainment':
      return (
        <EntertainmentScreen 
          player={player} 
          setPlayer={setPlayer} 
          onBack={() => setMenuState('main')} 
          currentCity={currentCity}
        />
      );

    default:
      return null;
  }
}
