import React from "react";
import Cell from "./Cell";

function GameBoard(props)
{
    const gameBoardData =
        {
          Player1Color : props.Player1Color ,
          Player2Color : props.Player2Color ,
          board : props.board ,
          onClick: props.onClick
        }

    return(
        <div className={"Game-Board"}>
            {
                gameBoardData.board.map((column , columnIndex)=>
                (
                    <div className={"Board-column"} key={columnIndex}>
                {
                    column.map((cell , rowIndex) =>
                        (
                            <Cell Player1Color={gameBoardData.Player1Color}
                                  Player2Color={gameBoardData.Player2Color}
                                  key={rowIndex} value2={columnIndex + "-" + rowIndex }
                                  value1={cell}
                                  onClick={() => gameBoardData.onClick(columnIndex)}/>
                        )
                    )
                }

                </div>
                ))
            }
        </div>
    )
}





export default GameBoard ;