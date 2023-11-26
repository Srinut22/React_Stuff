import React from 'react';
import { useState } from 'react';

let last_index = -1;
let must_put_object_in = undefined;

function Square({value, onSquareClick}) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const nextSquares = squares.slice();
  let current_turn = xIsNext? "X" : "O";
  const centre_Square = 4;
  function handleClick(i) {

    if (calculateWinner(squares))
     {
        return;
     }

    
    let player = threeMoves(xIsNext, squares);
    if(player[0])
    {
      switch(i)
      {
        case 0:
          if(!(squares[1] === null || null === squares[3] || null === squares[4]))
          {
            return;
          }
          break;
        case 1:
          if(!(null === squares[0] || null === squares[2] || null === squares[3] || null === squares[4] || null === squares[5]))
          {
            return;
          }
          break;
        case 2:
          if(!(null === squares[1] || null === squares[4] || null === squares[5]))
          {
            return;
          }
          break;
        case 3:
          if(!(null === squares[0] || null === squares[1] || null === squares[4] || null === squares[6] || null === squares[7]))
          {
            return;
          }
          break;
        case 4:
          break;
        case 5:
          if(!(null === squares[1]  || null === squares[2]  || null === squares[4]  || null === squares[7]  || null === squares[8]))
          {
            return;
          }
          break;
        case 6:
          if(!(null === squares[3] || null === squares[4] || null === squares[7]))
          {
            return;
          }
          break;
        case 7:
          if(!(null === squares[3] || null === squares[4] || null === squares[5] || null === squares[6] || null === squares[8]))
          {
            return;
          }
          break;
        case 8:
          if(!(null === squares[4] || null === squares[5] || null === squares[7]))
          {
            return;
          }
          break;
        default:
          break;
      }
      if(nextSquares[i] === current_turn)
      {
        if(player[1] === -1)
        {
            nextSquares[i] = null;
            last_index = i;
        }
        else
        {
          if(i === centre_Square)
          {
            nextSquares[i] = null;
            last_index = i;
          }
          else
          {
            nextSquares[i] = null;
            if(there_is_a_win(nextSquares, xIsNext, i))
            {
              last_index = i;
              setSquares(nextSquares);
              return;
            }
            else{
              nextSquares[i] = current_turn;
              last_index = -1;
            }
          }
        }
       setSquares(nextSquares);
       return;
      }
      else
      {
        return;
      }
    }

      if(nextSquares[i] === null)
      {
        if(must_put_object_in !== undefined)
        {
          if(i !== must_put_object_in)
          return;
          else
          {
            nextSquares[i] = current_turn;
            setSquares(nextSquares);
            return;
          }
        }
        switch(last_index)
        {
          case -1:
            nextSquares[i] = current_turn;
            break;
          case 0:
            if(i === 1 || i === 3 || i === 4)
            {
              nextSquares[i] = current_turn;
              last_index = -1;
            }
            else
            {
              return;
            }
          break;
          case 1:
            if(i === 0 || i === 2 || i === 3 || i === 4 || i === 5)
            {
              nextSquares[i] = current_turn;
              last_index = -1;
            }
            else
            {
              return;
            }
          break;
          case 2:
            if(i === 1 || i === 4 || i === 5)
            {
              nextSquares[i] = current_turn;
              last_index = -1;
            }
            else
            {
              return;
            }
          break;
          case 3:
            if(i === 0 || i === 1 || i === 4 || i === 6 || i === 7)
            {
              nextSquares[i] = current_turn;
              last_index = -1;
            }
            else
            {
              return;
            }
          break;
          case 4:
              nextSquares[i] = current_turn;
              last_index = -1;
          break;
          case 5:
            if(i === 1 || i === 2 || i === 4 || i === 7 || i === 8)
            {
              nextSquares[i] = current_turn;
              last_index = -1;
            }
            else
            {
              return;
            }
          break;
          case 6:
            if(i === 3 || i === 4 || i === 7)
            {
              nextSquares[i] = current_turn;
              last_index = -1;
            }
            else
            {
              return;
            }
          break;
          case 7:
            if(i === 3 || i === 4 || i === 5 || i === 6 || i === 8)
            {
              nextSquares[i] = current_turn;
              last_index = -1;
            }
            else
            {
              return;
            }
          break;
          case 8:
            if(i === 4 || i === 5 || i === 7)
            {
              nextSquares[i] = current_turn;
              last_index = -1;
            }
            else
            {
              return;
            }
          break;
          default:
            return;
        }
      }
      else{
        return;
      }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function threeMoves(xIsNext, board){
  let centre_Square = 4;
  let player = xIsNext? "X" : "O";
  let count = 0;
  for(let i = 0; i < board.length; i++){
    if(board[i] === player)
    {
      count++;
    }

    if(count === 3) {

      if(board[centre_Square] === player)
      {
        return [true, centre_Square];
      }
      else 
      {
        return [true, -1];
      }
    }
  }

  return [false, -1];
}



function there_is_a_win(board, xIsNext, index) {
  let player = xIsNext? "X" : "O";
  for(let i = 0; i < board.length; i++)
  {
    if(board[i] === null)
    {
      switch(index)
      {
        case 0:
            if(i === 1 || i === 3 || i === 4)
            {
              board[i] = player;
              if(calculateWinner(board))
                {
                  board[i] = null;
                  must_put_object_in = i;
                  return true;
                }
            }
            else
            {
              continue;
            }
          break;
          case 1:
            if(i === 0 || i === 2 || i === 3 || i === 4 || i === 5)
            {
              board[i] = player;
              if(calculateWinner(board))
                {
                  board[i] = null;
                  must_put_object_in = i;
                  return true;
                }
            }
            else
            {
              continue;
            }
          break;
          case 2:
            if(i === 1 || i === 4 || i === 5)
            {
              board[i] = player;
              if(calculateWinner(board))
                {
                  board[i] = null;
                  must_put_object_in = i;
                  return true;
                }
            }
            else
            {
              continue;
            }
          break;
          case 3:
            if(i === 0 || i === 1 || i === 4 || i === 6 || i === 7)
            {
              board[i] = player;
              if(calculateWinner(board))
                {
                  board[i] = null;
                  must_put_object_in = i;
                  return true;
                }
            }
            else
            {
              continue;
            }
          break;
          case 4:
              board[i] = player;
              if(calculateWinner(board))
              {
                board[i] = null;
                must_put_object_in = i;
                return true;
              }
          break;
          case 5:
            if(i === 1 || i === 2 || i === 4 || i === 7 || i === 8)
            {
              board[i] = player;
              if(calculateWinner(board))
                {
                  board[i] = null;
                  must_put_object_in = i;
                  return true;
                }
            }
            else
            {
              continue;
            }
          break;
          case 6:
            if(i === 3 || i === 4 || i === 7)
            {
              board[i] = player;
              if(calculateWinner(board))
                {
                  board[i] = null;
                  must_put_object_in = i;
                  return true;
                }
            }
            else
            {
              continue;
            }
          break;
          case 7:
            if(i === 3 || i === 4 || i === 5 || i === 6 || i === 8)
            {
              board[i] = player;
              if(calculateWinner(board))
                {
                  board[i] = null;
                  must_put_object_in = i;
                  return true;
                }
            }
            else
            {
              continue;
            }
          break;
          case 8:
            if(i === 4 || i === 5 || i === 7)
            {
              board[i] = player;
              if(calculateWinner(board))
                {
                  board[i] = null;
                  must_put_object_in = i;
                  return true;
                }
            }
            else
            {
              continue;
            }
            break;
            default:
              continue;
      }
      board[i] = null;
    }
  }

  return false;
}