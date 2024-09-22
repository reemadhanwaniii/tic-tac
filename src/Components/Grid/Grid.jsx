import { useState } from "react";
import Card from "../Card/Card";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Grid.css"

function isWinner(board,symbol){
    if(board[0] == board[1] &&  board[1] == board[2] && board[2] == symbol) return symbol;
    if(board[3] == board[4] &&  board[4] == board[5] && board[5] == symbol) return symbol;
    if(board[6] == board[7] &&  board[7] == board[8] && board[8] == symbol) return symbol;

    if(board[0] == board[3] &&  board[3] == board[6] && board[6] == symbol) return symbol;
    if(board[1] == board[4] &&  board[4] == board[7] && board[7] == symbol) return symbol;
    if(board[2] == board[5] &&  board[5] == board[8] && board[8] == symbol) return symbol;

    if(board[0] == board[4] &&  board[4] == board[8] && board[8] == symbol) return symbol;
    if(board[2] == board[4] &&  board[4] == board[6] && board[6] == symbol) return symbol;
    
    return "";
    
}


function Grid() {
    const [turn,setTurn] = useState(true); //false => X,true => O
    const [board,setBoard] = useState(Array(9).fill(""));
    const [winner,setWinner] = useState(null);

    function play(index) {
        console.log("Move played",index);
        if(turn == true){
            board[index]= "O";
        }else if(turn == false){
            board[index] = "X";
        }
        const win = isWinner(board,turn?"O":"X");
        if(win){
            setWinner(win);
            console.log("calling toast");
            toast.success(`Congratulation ${win} won the game`,{
                position: "top-center"
            })
        }
        setBoard([...board]);
        setTurn(!turn);
    }

    function reset(){
        setBoard(Array(9).fill(""));
        setTurn(true);
        setWinner(null);
    }

    return(
        <>
            {winner && 
              <>
                <h1 className="turn-highlight">Winner is : {winner}</h1>
                <button className="reset" onClick={reset}>Reset Game</button>
                <ToastContainer position="top-center"/>
              </>
               }

            <h1 className="turn-highlight">Current Turn : {(turn)? 'O' : 'X'}</h1>
            <div className="grid">
               {board.map((value,idx) => {
                 return(<Card gameEnd={winner?true:false}onPlay={play} player={value} key={idx} index={idx}/>)
               })}
            </div>
        </>
        
    )
}

export default Grid;