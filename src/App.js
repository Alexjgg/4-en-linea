
import { useState } from 'react';
import confetti from 'canvas-confetti'
import { Square } from './componets/Square.jsx'
import { TURNS } from './constants.js';
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
    // Verificar horizontalmente
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 4; col++) {
        if (
          boardToCheck[row][col] !== null &&
          boardToCheck[row][col] !== undefined &&
          boardToCheck[row][col] === boardToCheck[row][col + 1] &&
          boardToCheck[row][col] === boardToCheck[row][col + 2] &&
          boardToCheck[row][col] === boardToCheck[row][col + 3]
        ) {
          return boardToCheck[row][col];
        }
      }
    }

    // Verificar verticalmente
    for (let col = 0; col < 7; col++) {
      for (let row = 0; row < 3; row++) {
        if (
          boardToCheck[row][col] !== null &&
          boardToCheck[row][col] !== undefined &&
          boardToCheck[row][col] === boardToCheck[row + 1][col] &&
          boardToCheck[row][col] === boardToCheck[row + 2][col] &&
          boardToCheck[row][col] === boardToCheck[row + 3][col]
        ) {
          return boardToCheck[row][col];
        }
      }
    }
    // Verificar diagonalmente (de izquierda a derecha)
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 4; col++) {
        if (
          boardToCheck[row][col] !== null &&
          boardToCheck[row][col] !== undefined &&
          boardToCheck[row][col] === boardToCheck[row + 1][col + 1] &&
          boardToCheck[row][col] === boardToCheck[row + 2][col + 2] &&
          boardToCheck[row][col] === boardToCheck[row + 3][col + 3]
        ) {
          return boardToCheck[row][col];
        }
      }
    }

    // Verificar diagonalmente (de derecha a izquierda)
    for (let row = 0; row < 3; row++) {
      for (let col = 3; col < 6; col++) {
        if (
          boardToCheck[row][col] !== null &&
          boardToCheck[row][col] !== undefined &&
          boardToCheck[row][col] === boardToCheck[row + 1][col - 1] &&
          boardToCheck[row][col] === boardToCheck[row + 2][col - 2] &&
          boardToCheck[row][col] === boardToCheck[row + 3][col - 3]
        ) {
          return boardToCheck[row][col];
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
      confetti()
      console.log(newWinner);
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }

  }
  return (
    <main className='board'>
      <h1 >4 En linea</h1>
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
