import React from 'react';
import './App.css';

import { GameHeader } from './components/GameHeader';
import { StorySelectionScreen } from './components/GameScreens';
import { GameRouter } from './components/GameRouter';
import { HomelessAlert } from './components/HomelessAlert';

// Наш кастомный хук логики
import { useGameState } from './hooks/useGameState';

function App() {
  const {
    player, setPlayer,
    menuState, setMenuState,
    exchangeAmount, setExchangeAmount,
    totalStatus, maxLoan, currentCity,
    handleSelectStory, handleWork, handleExchange,
    takeLoan, repayLoanFull, handleMoveCity, handlePurchase,
    resetGame, shareProgress
  } = useGameState();

  // Если игрок еще не выбрал историю, показываем экран выбора предыстории
  if (menuState === 'story_selection' || !player) {
    return (
      <div className="game-container" style={{ paddingTop: '40px' }}>
        <StorySelectionScreen onSelect={handleSelectStory} />
      </div>
    );
  }

  return (
    <div className="game-container">
      <HomelessAlert player={player} />
      
      {/* Шапка игры */}
      <GameHeader player={player} totalStatus={totalStatus} currentCity={currentCity} />

      <div className="menu-container">
        <GameRouter 
          menuState={menuState}
          setMenuState={setMenuState}
          player={player}
          setPlayer={setPlayer}
          totalStatus={totalStatus}
          exchangeAmount={exchangeAmount}
          setExchangeAmount={setExchangeAmount}
          maxLoan={maxLoan}
          currentCity={currentCity}
          handleWork={handleWork}
          handleExchange={handleExchange}
          takeLoan={takeLoan}
          repayLoanFull={repayLoanFull}
          handleMoveCity={handleMoveCity}
          handlePurchase={handlePurchase}
          shareProgress={shareProgress}
        />
      </div>

      {/* Системная кнопка перезапуска игры */}
      <div style={{ marginTop: '20px' }}>
        <button className="btn" style={{ background: '#ef4444', border: 'none', margin: 0, width: '100%' }} onClick={resetGame}>🔄 Начать заново</button>
      </div>
    </div>
  );
}

export default App;