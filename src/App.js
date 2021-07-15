import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [board, setBoard] = useState([
    '', '', '',
    '', '', '',
    '', '', ''
  ])
  const [turn, setTurn] = useState(true)
  const [mode, setMode] = useState("single")
  const [pone, setPone] = useState(0)
  const [ptwo, setPtwo] = useState(0)
  const [tie, setTie] = useState(0)
  const [next, setNext] = useState(false)
  const handleClick = e => {
    if (next=== true || board[e.target.id]){
      return 
    }
    if (mode === "multi") {
      if (turn) {
        const cloneBoard = board
        if (cloneBoard[e.target.id]) {
          //pass
        } else {
          cloneBoard[e.target.id] = "O"
          setBoard([...cloneBoard])
          setTurn(false)
        }
      } else {
        const cloneBoard = board
        if (cloneBoard[e.target.id]) {
          //pass
        } else {
          cloneBoard[e.target.id] = "X"
          setBoard([...cloneBoard])
          setTurn(true)
        }
      }
    } else {
      if (turn) {
        const cloneBoard = board
        if (cloneBoard[e.target.id]) {
          //pass
        } else {
          cloneBoard[e.target.id] = "O"
          setBoard([...cloneBoard])
          setTurn(false)
        }
      }
      const cloneBoard = board
      const indexArray = []
      for (let i = 0; i < cloneBoard.length; i++) {
        if (!cloneBoard[i])
          indexArray.push(i)
      }
      const randomIndex = indexArray[Math.floor(Math.random() * indexArray.length)]
      if (randomIndex){
        cloneBoard[randomIndex] = "X"
        setBoard([...cloneBoard])
        setTurn(true)
      }
    }
  }
  useEffect(()=>{
    evaluateWin(board)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board])
  const evaluateWin = (newBoard) => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    for (let cond of winConditions) {
      let line = ""
      for (let pos of cond) {
        line += newBoard[pos]
      }
      if (line === "OOO") {
        alert("Player 1 Won!")
        setPone(pone + 1)
        setTurn(true)
        setNext(true)
        break
      } else if (line === "XXX") {
        if (mode === "single") {
          alert("Computer Won!")
        } else {
          alert("Player 2 Won!")
        }
        setPtwo(ptwo + 1)
        setTurn(true)
        setNext(true)
        break
      } else {
        if (board[0] && board[1] && board[2] && board[3] && board[4] && board[5] && board[6] && board[7] && board[8] && cond[0] === 2 && cond[1] === 4 && cond[2] === 6) {
          alert("Tie")
          setTie(tie + 1)
          setTurn(true)
          setNext(true)
          break
        }
      }
    }
    return undefined
  }
  const switchSingle = () => {
    if (board[0] === "" && board[1] === "" && board[2] === "" && board[3] === "" && board[4] === "" && board[5] === "" && board[6] === "" && board[7] === "" && board[8] === "") {
      setMode("single")
      setPone(0)
      setPtwo(0)
      setTie(0)
      setTurn(true)
    } else {
      if (window.confirm("End game and switch to Single Player?")) {
        setMode("single")
        setBoard(['', '', '', '', '', '', '', '', ''])
        setPone(0)
        setPtwo(0)
        setTie(0)
        setTurn(true)
      }
    }
  }
  const switchMulti = () => {
    if (board[0] === "" && board[1] === "" && board[2] === "" && board[3] === "" && board[4] === "" && board[5] === "" && board[6] === "" && board[7] === "" && board[8] === "") {
      setMode("multi")
      setPone(0)
      setPtwo(0)
      setTie(0)
      setTurn(true)
    } else {
      if (window.confirm("End game and switch to Multiplayer?")) {
        setMode("multi")
        setBoard(['', '', '', '', '', '', '', '', ''])
        setPone(0)
        setPtwo(0)
        setTie(0)
        setTurn(true)
      }
    }
  }
  const nextGame = () => {
    setBoard(['', '', '', '', '', '', '', '', ''])
    setNext(false)
  }
  return (
    <>
      <div className="center">
        <h1>Tic Tac Toe</h1>
      </div>
      <div className="center">
        <button className="btn" onClick={switchSingle}>Single Player</button>
        <button className="btn" onClick={switchMulti}>Multiplayer</button>
      </div>
      <div className="container" >
        {
          board.map((value, index) => {
            return (
              <div className={"box" + index} onClick={handleClick} key={index} id={index}>{value}</div>
            )
          })
        }
      </div>
      <div className="filler">
      </div>
      {
        mode === "single" ?
          <div className="center">
            <p>Mode: Single Player</p>
            <p>{"Player 1 Score: " + pone}</p>
            <p>{"Computer Score: " + ptwo}</p>
            <p>{"Tie: " + tie}</p>
          </div>
          :
          <div className="center">
            <p>Mode: Multiplayer</p>
            <p>{"Player 1 Score: " + pone}</p>
            <p>{"Player 2 Score: " + ptwo}</p>
            <p>{"Tie: " + tie}</p>
          </div>
      }
      {
        next ?
          <div className="center">
            <button className="btn" onClick={nextGame}>Next Game</button>
          </div>
          : <></>
      }
    </>
  );
}

export default App;
