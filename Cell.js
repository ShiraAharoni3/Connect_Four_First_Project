function Cell(props)
{
   const cellData = { color1 : props.Player1Color , color2 : props.Player2Color , value1 : props.value1 , onClick : props.onClick ,value2 : props.value2}
    const cellStyle =
        {
            backgroundColor : cellData.value1 === "Player 1" ? (cellData.color1 ? cellData.color1 : "red") : cellData.value1 === "Player 2" ? (cellData.color2 ? cellData.color2 : "yellow") : "white"
        };
    return(
        <div>
            <button key ={cellData.value2} className={"Cell"} style={cellStyle} onClick={cellData.onClick}>

            </button>
        </div>
    )

}


export default Cell ;