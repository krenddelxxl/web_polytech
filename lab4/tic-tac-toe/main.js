// Полная загрузка содержимого DOM перед выполнением скрипта
document.addEventListener('DOMContentLoaded', () => {
    // Клетки
    const cells = document.querySelectorAll('.cell');
    // 
    const status = document.querySelector('.status');
    // Кнопка рестарта
    const restartButton = document.querySelector('.restart-button');

    // Основные переменные
    let currentPlayer = 'X'; // Х начинает игру
    let gameActive = true; // Активна ли еще игра
    let gameState = ['', '', '', '', '', '', '', '', '']; // Игровое поле

    // Выигрышные паттерны
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Строки
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Столбцы
        [0, 4, 8], [2, 4, 6]             // Диагонали
    ];

    // Проверка на победу
    const checkWin = () => {
        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            // Если кто-то победил
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                return gameState[a];
            }
        }
        // Если никто не победил
        return null;
    };

    // Ничья проверка
    const checkDraw = () => {
        // Если не осталось пустых клеток, то ничья
        return !gameState.includes('');
    };

    // Нажатие на клетку
    const handleCellClick = (index) => {
        // Игнор клика, если клетка уже заполнена или если игра закончена
        if (gameState[index] || !gameActive) return;

        // Обновление состояния игры, добавление метки текущего игрока
        gameState[index] = currentPlayer;
        // Отображение метки текущего игрока в отмеченной ячейке
        cells[index].textContent = currentPlayer;

        // Обработка победы
        const winner = checkWin();
        if (winner) {
            // Обработка победы
            gameActive = false;
            status.textContent = `Player ${winner} wins!`;
            return;
        }

        // Обработка ничьей
        if (checkDraw()) {
            gameActive = false;
            status.textContent = "It's a draw!";
            return;
        }

        // Обработка очереди хода
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayer}'s turn`;
    };

    // Функция рестарта
    const restartGame = () => {
        // Ресет переменных
        currentPlayer = 'X';
        gameActive = true;
        gameState = ['', '', '', '', '', '', '', '', ''];
        // Очистка статуса очереди
        status.textContent = `Player ${currentPlayer}'s turn`;
        // Очистка поля
        cells.forEach(cell => cell.textContent = '');
    };

    // Click event listeners на все клетки поля
    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => handleCellClick(index));
    });

    // Click event listener для кнопки рестарта
    restartButton.addEventListener('click', restartGame);
});
