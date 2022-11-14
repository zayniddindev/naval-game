import { Component as ReactComponent, ReactNode } from "react";
import { GameInfo } from "./components/GameInfo";
import { PlayerBoard } from "./components/PlayerBoard";
import { UserInfo } from "./components/UserInfo";
import { ButtonValues, GamePhase, GameState } from "./types";

export class App extends ReactComponent<any, GameState> {
  constructor(props: any) {
    super(props);
    this.state = {
      players: {
        "1": {
          id: '1', name: 'Player 1', score: 0,
        },
        "2": {
          id: '2', name: 'Player 2', score: 0,
        }
      },
      gamePhase: GamePhase.Arrangement,
      playerTurn: Math.random() > 0.5 ? '2' : '1',
      actionButton: { disabled: true, value: ButtonValues.FinishArrangement },
      finishArrangementCount: 0,
      selectedCell: null
    }
  }

  handleCellClick = (playerId: string, action: string) => {
    if (action == 'finishArrangement') {
      this.setState({ ...this.state, actionButton: { disabled: false, value: ButtonValues.FinishArrangement } })
    }
    if (action == 'continueArrangement') {
      this.setState({ ...this.state, actionButton: { disabled: true, value: ButtonValues.FinishArrangement } })
    }
  }

  handleButtonClick = () => {
    const { gamePhase, playerTurn, finishArrangementCount } = this.state;
    if (gamePhase == GamePhase.Arrangement && finishArrangementCount == 0) {
      this.setState({
        ...this.state,
        actionButton: { disabled: true, value: ButtonValues.FinishArrangement },
        playerTurn: playerTurn == '1' ? '2' : '1',
        finishArrangementCount: 1
      })
    }
    if (gamePhase == GamePhase.Arrangement && finishArrangementCount == 1) {
      this.setState({
        ...this.state,
        actionButton: { disabled: true, value: ButtonValues.Attack },
        playerTurn: playerTurn == '1' ? '2' : '1',
        finishArrangementCount: 2,
        gamePhase: GamePhase.Attack,
      })
    }
    if (gamePhase == GamePhase.Attack) {
      console.log('Attack fired!');
      this.setState({ ...this.state, playerTurn: this.state.playerTurn == '1' ? '2' : '1' })
    }
  }

  handleCellSelect = (x: number, y: number, player: '1' | '2') => {
    this.setState({
      ...this.state,
      selectedCell: { cell: { x, y }, player },
      actionButton: {
        disabled: false,
        value: ButtonValues.Attack
      }
    });
  }

  render(): ReactNode {
    let { players, gamePhase, playerTurn } = this.state
    return (
      <div className="app" >

        <UserInfo player={players[1]} />

        < PlayerBoard
          gamePhase={gamePhase}
          player={players[1]}
          playerTurn={playerTurn}
          onCellClick={this.handleCellClick}
          onCellSelect={this.handleCellSelect} />

        <GameInfo
          button={this.state.actionButton}
          onButtonClick={this.handleButtonClick}
          gamePhase={this.state.gamePhase}
          players={this.state.players}
          playerTurn={this.state.playerTurn} />

        < PlayerBoard
          gamePhase={gamePhase}
          player={players[2]}
          playerTurn={playerTurn}
          onCellClick={this.handleCellClick}
          onCellSelect={this.handleCellSelect} />

        <UserInfo player={players[2]} />

      </div>
    );
  }
}