import { Component as ReactComponent, ReactNode } from "react";
import { GameInfoProps, GameInfoState } from '../../types';
import './GameInfo.css'

export class GameInfo extends ReactComponent<GameInfoProps, GameInfoState> {

    render(): ReactNode {
        return (
            <div className="gameInfo">
                <button
                    disabled={this.props.button.disabled}
                    onClick={this.props.onButtonClick}>
                    {this.props.button.value}
                </button>
                <p>Game Phase: {this.props.gamePhase} </p>
                <p>Turn: {this.props.players[this.props.playerTurn].name}</p>
            </div>
        )
    }
}