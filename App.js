import './App.css';
import Game from "./Game";
import React from "react";
import * as events from "events";

class App extends React.Component
{
    state =
        {
            availableColors: ['select' ,'green', 'purple', 'pink', 'blue','brown', 'orange', 'gray', 'black'],
            player1Color : '' ,
            player2Color : '' ,
            zoomLevel : 1 ,
            zoomInCount : 0 ,
            zoomOutCount : 0 ,


        }

    player1Choice =(event) =>
    {
        this.setState({player1Color : event.target.value});
        this.DeleteColor(event.target.value);
    }

    player2Choice = (event) =>
    {
        this.setState({player2Color : event.target.value});
        this.DeleteColor(event.target.value);
    }

    DeleteColor = (colorToDelete) => {
        this.setState(prevState => ({
            availableColors: prevState.availableColors.filter(color => color !== colorToDelete),
        }));
    }
    handleZoomIn = () =>
    {
        if (this.state.zoomInCount < 2 + + this.state.zoomOutCount) {
            this.setState((prevState) => ({
                zoomLevel: Math.max(prevState.zoomLevel + 0.1, 0.5),
                zoomInCount: prevState.zoomInCount + 1,
            }));
        }

    };

    handleZoomOut = () => {
        if (this.state.zoomOutCount < 2+ this.state.zoomInCount) {
            this.setState((prevState) => ({
                zoomLevel: Math.max(prevState.zoomLevel - 0.1, 0.5),
                zoomOutCount: prevState.zoomOutCount + 1,
            }));
        }
    };

        render() {
            return (
                <div style={{transform: `scale(${this.state.zoomLevel})`}} >

                    <div className="App">
                        <button className="Zoom-In" onClick={this.handleZoomIn}>Zoom In</button>
                        <button className="Zoom-Out" onClick={this.handleZoomOut}>Zoom Out</button>


                        <Game playerColor1={this.state.player1Color} playerColor2={this.state.player2Color}/>
                    </div>
                    <div>
                        <div className={"player1"}>
                            <label>
                                Player 1 color: {"  "}
                                <select name="selecteColor" defaultValue="select" value={this.state.player1Color}
                                        onChange={this.player1Choice}>
                                    {this.state.availableColors.map(color => (
                                        <option key={color} value={color}>  {color}</option>
                                    ))}
                                </select>
                                <p>You selected : {this.state.player1Color}</p>

                            </label>
                        </div>
                        <div className={"P2"}>
                            <div className={"player2"}>
                                <label>
                                    Player 2 color: {"  "}
                                    <select name="selecteColor" defaultValue="select" value={this.state.player2Color}
                                            onChange={this.player2Choice}>
                                        {this.state.availableColors.map(color => (
                                            <option key={color} value={color}>{color}</option>
                                        ))}
                                    </select>
                                    <p>You selected : {this.state.player2Color}</p>

                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            )
                ;
        }


}

export default App;
