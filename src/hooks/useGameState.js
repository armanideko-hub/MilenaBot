import { usePlayerState } from './usePlayerState';
import { useFinanceActions } from './useFinanceActions';
import { useGameplayActions } from './useGameplayActions';

export function useGameState() {
  // 1. Подключаем базовое состояние игрока
  const playerState = usePlayerState();
  const { player, setPlayer, menuState, setMenuState, currentCity, totalStatus, maxLoan } = playerState;

  // 2. Подключаем финансовые функции
  const finance = useFinanceActions(player, setPlayer, maxLoan, currentCity);

  // 3. Подключаем игровые действия
  const gameplay = useGameplayActions(player, setPlayer, currentCity, totalStatus, setMenuState);

  // Собираем всё в один результирующий объект
  return {
    player,
    setPlayer,
    menuState,
    setMenuState,
    currentCity,
    totalStatus,
    maxLoan,
    
    // Свойства из финансового под-хука
    exchangeAmount: finance.exchangeAmount,
    setExchangeAmount: finance.setExchangeAmount,
    handleExchange: finance.handleExchange,
    takeLoan: finance.takeLoan,
    repayLoanFull: finance.repayLoanFull,

    // Экшены из геймплейного под-хука
    handleSelectStory: gameplay.handleSelectStory,
    handleWork: gameplay.handleWork,
    handleMoveCity: gameplay.handleMoveCity,
    handlePurchase: gameplay.handlePurchase,
    resetGame: gameplay.resetGame,
    shareProgress: gameplay.shareProgress
  };
}