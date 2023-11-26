
import { useState } from 'react';
import { Square } from './componets/Square.jsx'
import { TURNS, WINNER_COMBOS } from './constants.js';
import { WinnerModal } from './componets/WinnerModal.jsx';

function App() {
  const [board, setBoard] = useState(Array(6).fill(Array(7).fill(null)).map(() => Array(7).fill(null)))

  const [turn, setTurn] = useState(TURNS.X)

  const [winner, setWinner] = useState(null)
  const resetGame = () => {
    setBoard(Array(6).fill(Array(7).fill(null)).map(() => Array(7).fill(null)))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const checkWinner = (boardToCheck) => {
    console.log(boardToCheck)
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 3; col++) {
        console.log(`Checking ${col}-${row}`);
        if (
          boardToCheck[col][row] !== null &&
          boardToCheck[col][row] !== undefined &&
          boardToCheck[col][row] === boardToCheck[col + 1][row] &&
          boardToCheck[col][row] === boardToCheck[col + 2][row] &&
          boardToCheck[col][row] === boardToCheck[col + 3][row]
        ) {
          return true;
        }
      }
    }

    // Verificar verticalmente
    for (let row = 0; row < 2; row++) {
      for (let col = 0; col < 4; col++) {
        if (
          boardToCheck[col][row] !== null &&
          boardToCheck[col][row] !== undefined &&
          boardToCheck[col][row] === boardToCheck[col][row + 1] &&
          boardToCheck[col][row] === boardToCheck[col][row + 2] &&
          boardToCheck[col][row] === boardToCheck[col][row + 3]
        ) {
          return boardToCheck[col][row];
        }
      }
    }

    // Verificar diagonalmente (de izquierda a derecha)
    for (let row = 0; row < 2; row++) {
      for (let col = 0; col < 3; col++) {
        if (
          boardToCheck[col][row] !== null &&
          boardToCheck[col][row] !== undefined &&
          boardToCheck[col][row] === boardToCheck[col + 1][row + 1] &&
          boardToCheck[col][row] === boardToCheck[col + 2][row + 2] &&
          boardToCheck[col][row] === boardToCheck[col + 3][row + 3]
        ) {
          return boardToCheck[col][row];
        }
      }
    }

    // Verificar diagonalmente (de derecha a izquierda)
    for (let row = 0; row < 2; row++) {
      for (let col = 3; col < 6; col++) {
        if (
          boardToCheck[col][row] !== null &&
          boardToCheck[col][row] !== undefined &&
          boardToCheck[col][row] === boardToCheck[col - 1][row + 1] &&
          boardToCheck[col][row] === boardToCheck[col - 2][row + 2] &&
          boardToCheck[col][row] === boardToCheck[col - 3][row + 3]
        ) {
          return boardToCheck[col][row];
        }
      }
    }

    return null;
  }
  const checkEndGame = (newBoard) => {
    return newBoard.every((row) => row.every((square) => square !== null));

  }
  const updateBoard = (row, col) => {
    if (board[row][col] || winner) return

    const newBoard = board.map((rowArray) => [...rowArray]);
    //Comprobamos que se rellene por abajo primero
    let newRow = row;
    while (newRow < 5 && newBoard[newRow + 1][col] === null) {
      newRow++;
    }
    newBoard[newRow][col] = turn

    setBoard(newBoard)
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }

  }
  return (
    <main className='board'>
      <h1 >Tic Tac toe</h1>
      <button onClick={resetGame}>Reset</button>
      <section className='game'>
        {
          board.map((row, rowIndex) => (
            row.map((col, columnIndex) => (
              <Square
                row={rowIndex}
                col={columnIndex}
                key={`${columnIndex}-${rowIndex}`}
                updateBoard={() => updateBoard(rowIndex, columnIndex)}
              >
                {col}
              </Square>
            ))
          ))
        }
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  );
}

export default App;
