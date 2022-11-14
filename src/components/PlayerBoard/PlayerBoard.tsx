import { Component as ReactComponent, ReactNode } from "react";
import { GamePhase, GamePlayer, PlayerBoardProps, PlayerBoardState } from "../../types";
import { Cell } from "../Cell";

export class PlayerBoard extends ReactComponent<PlayerBoardProps, PlayerBoardState> {
    MAX_SHIPS = 8;
    constructor(props: PlayerBoardProps) {
        super(props);
        this.state = {
            cells: this.initPlayerBoard(),
            shipsFired: [],
            shipsPlaced: [],
            shipSelected: null,
            nowActive: this.props.player.id == this.props.playerTurn,
            gamePhase: this.props.gamePhase
        }
    }

    static getDerivedStateFromProps(nextProps: PlayerBoardProps, prevState: PlayerBoardState): PlayerBoardState {
        return {
            ...prevState,
            nowActive: nextProps.player.id == nextProps.playerTurn,
            gamePhase: nextProps.gamePhase
        }
    }

    componentDidMount(): void {
        this.setState({ cells: this.initPlayerBoard() })
    }

    handleCellClick = (x: number, y: number, action: string) => {
        let _tempShipsPlaced = this.state.shipsPlaced;
        if (action == 'placeShip') {
            _tempShipsPlaced.push({ x, y })
            if (_tempShipsPlaced.length == this.MAX_SHIPS) {
                console.log(this.state.shipsPlaced);

                this.props.onCellClick(this.props.player.id, 'finishArrangement')
            }
        }
        if (action == 'deleteShip') {
            if (_tempShipsPlaced.length == this.MAX_SHIPS) {
                this.props.onCellClick(this.props.player.id, 'continueArrangement')
            }
            _tempShipsPlaced.splice(_tempShipsPlaced.indexOf({ x, y }), 1)
        }
        if (action == 'selectShip') {
            this.setState({ ...this.state, shipSelected: { x, y } })
            this.props.onCellSelect(x, y, this.props.player.id)
        }
        if (action == 'unselectShip') { }
        this.setState({ ...this.state, shipsPlaced: _tempShipsPlaced });
    }

    initPlayerBoard() {
        const cells: Array<Array<{ x: number, y: number }>> = [];
        for (let i = 1; i < 6; i++) {
            const row = [];
            for (let j = 1; j < 6; j++) {
                row.push({ x: i, y: j })
            }
            cells.push(row)
        }
        return cells
    }

    renderBoard() {
        const cells = this.initPlayerBoard()
        return cells.map(row => {
            return (
                <div className="row" key={row[0].x * 11 + row[0].y}>
                    {row.map(cell => {
                        return <Cell
                            allArranged={this.state.shipsPlaced.length < 8}
                            cellPosition={{ x: cell.x, y: cell.y }}
                            boardPhase={this.state.gamePhase}
                            active={this.state.nowActive}
                            onHandleClick={this.handleCellClick}
                            key={cell.x * 10 + cell.y} />
                    })}
                </div>
            )
        })
    }

    render(): ReactNode {
        this.initPlayerBoard()
        return (
            <div className="playerBoard">
                {this.renderBoard()}
            </div>
        )
    }
}