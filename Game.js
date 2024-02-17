import GameBoard from "./GameBoard";
import {useState , useEffect } from "react";
import Modal from "react-modal"

function Game(props)
{
    const color1 = props.playerColor1 ;

    const color2 = props.playerColor2 ;

    const coluStartValueArray = [5 ,5, 5, 5, 5 ,5, 5 ] ;

    const player1 = "Player 1";

    const player2 = "Player 2" ;

    const [player1Pointes , setPlayer1Pointes] = useState(0);

    const [player2Pointes , setPlayer2Pointes] = useState(0);

    const [currentPlayer , setCurrentPlayer] = useState(player1);

    const [gameOver , setGameOver] = useState(false);

    const [board , setBoard] = useState(initializeBoard());

    const [currentColumns , setCurrentColumns] = useState(coluStartValueArray) ;

    const[isModalOpen , setModalOpen] = useState(false);

    const[winningPlayer , setWinningPlayer] = useState(null);

    const [lastMove, setLastMove] = useState(null);

    const [turnTimer, setTurnTimer] = useState(null);

    const [turnTime, setTurnTime] = useState(10);

    useEffect(() => {
        let timer;
        if (gameOver || turnTime === -1) {
            return;
        }
        if (turnTime === 0) {
            switchPlayer();
            setTurnTime(10);
            return;
        }
        else
        {
            timer = setTimeout(() => {
                setTurnTime((prevTurnTime) => prevTurnTime - 1);
            }, 1000);
        }

        return () => clearTimeout(timer);
    }, [turnTime, currentPlayer, gameOver]);


    function initializeBoard()
    {
        const rows = 6;
        const columns =7;
        const initialBoard = Array.from({ length :columns }, () =>
            Array(rows ).fill(" ")
        );
        return initialBoard;
    }

    function handleOnClick(columnIndex)
    {
        startTurnTimer();
        if (gameOver)
        {
            return;
        }

        let updatedBoard = [...board];
        let r = currentColumns[columnIndex];

        if (r < 0)
        {
            return;
        }

        updatedBoard[columnIndex][r] = currentPlayer;
        console.log({r}+{columnIndex})
        setBoard(updatedBoard);
        r -= 1;
        setCurrentColumns((prevColumns) => {
            const newColumns = [...prevColumns];
            newColumns[columnIndex] = r;
            return newColumns;
        });


        setLastMove({ columnIndex, rowIndex: r });
        switchPlayer();
        checkWinner();
    }

    function switchPlayer()
    {
        setCurrentPlayer((prevPlayer) =>
            prevPlayer === player1 ? player2 : player1
        );
    }


    function checkWinner()
    {
        const NumberOfRows = 6;
        const NumberOfColumns = 7;

        // Horizontal check
        for (let r = 0; r < NumberOfColumns; r++)
        {
            for (let c = 0; c < NumberOfRows-3 ; c++) {
                if (board[r][c] !== " ") {
                    if (
                        board[r][c] === board[r][c + 1] &&
                        board[r][c + 1] === board[r][c + 2] &&
                        board[r][c + 2] === board[r][c + 3]

                    )
                    {
                        setWinner(board[r][c]);
                        return;
                    }
                }
            }
        }
        //Vertical check
        for(let c = 0 ; c < NumberOfRows  ; c++)
        {
            for(let r =0  ; r < NumberOfColumns-3 ; r++)
            {
                if(board[r][c] !== " ")
                {
                    if(board[r][c] === board[r+1][c]  && board[r+1][c] === board[r+2][c] &&   board[r+2][c] === board[r+3][c] )
                    {
                        setWinner(board[r][c]);
                        return;
                    }
                }
            }

        }
        //Left diagonal check
        for(let c = 0  ; c < NumberOfColumns -2 ; c++)
        {
            for(let r = 0 ; r < NumberOfRows -2 ; r++)
            {
                if(board[r][c] !== " ")
                {
                    if(board[r][c] === board[r+1][c+1]  && board[r+1][c+1] === board[r+2][c+2] &&   board[r+2][c+2] === board[r+3][c+3] )
                    {
                        setWinner(board[r][c]);
                        return;
                    }
                }
            }

        }
        //Right diagonal check
        for(let r = 0 ; r < NumberOfRows-2  ; r++)
        {
            for(let c = 0 ; c < NumberOfRows  ; c++)
            {
                if(board[r][c] !== " ")
                {
                    if(board[r][c] === board[r+1][c-1]  && board[r+1][c-1] === board[r+2][c-2] &&   board[r+2][c-2] === board[r+3][c-3] )
                    {
                        setWinner(board[r][c]);
                        return;
                    }
                }
            }

        }

        function setWinner(winningPlayer) {
            setWinningPlayer(winningPlayer);
            setModalOpen(true);
            setTurnTime(-1);
        }
    }

    function closeModal()
    {
        setModalOpen(false);
    }

    function resetGame()
    {
        if(winningPlayer === player1 ? setPlayer1Pointes(player1Pointes+1): setPlayer2Pointes(player2Pointes+1))
        setCurrentPlayer(winningPlayer === player1 ? player2 : player1)
        setWinningPlayer(null);
        setGameOver(false);
        setBoard(initializeBoard());
        setLastMove(null);
        setCurrentColumns(coluStartValueArray);
        setTurnTime(10);
        closeModal();
    }

    function startTurnTimer()
    {
        setTurnTime(10);
    }



    return(
        <div className={"Game"} >
            <div className={"game-information"}>
                <div className={"currnet-player"}>
                    Current player : {currentPlayer}
                </div>
                <div className={"turn"}>
                    Turn {currentPlayer} Time: {turnTime} seconds
                </div>
                <div className={"point-player1"}>
                    <p>
                        player 1
                    </p>
                    <p>
                        points :
                    </p>
                    <p className={"P1-size"}>
                        {player1Pointes}
                    </p>
                </div>
                <div className={"point-player2"}>
                    <p>
                        player 2
                    </p>
                    <p> points : </p>
                    <p className={"P2-size"}>
                        {player2Pointes}
                    </p>
                </div>

            </div>
            <div className={"game-board"}>
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    contentLabel="Winner Modal"
                    className="ModalContent"
                    overlayClassName="ModalOverlay" >
                    <div>
                        {winningPlayer ? `${winningPlayer} won!` : 'Game Over'}
                    </div>
                    <button className="OvalButton" onClick={resetGame}>
                        Play Again
                    </button>
                </Modal>
                <GameBoard Player1Color={color1} Player2Color={color2} board={board} onClick={handleOnClick}/>
            </div>
        </div>
    )
}


export default Game;