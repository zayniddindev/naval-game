import { Component as ReactComponent } from "react";
import { CellProp, CellState, CellValue, GamePhase } from "../../types";
import "./Cell.css"

export class Cell extends ReactComponent<CellProp, CellState> {
    constructor(props: CellProp) {
        super(props);
        this.state = {
            shipState: {
                selected: false,
                value: CellValue.Empty,
            },
            boardPhase: GamePhase.Arrangement,
            shipPlaced: false
        }
    }

    static getDerivedStateFromProps(nextProps: CellProp, prevState: CellState) {
        if (prevState.shipState.selected !== nextProps.active) {
            return {
                ...prevState,
                boardPhase: nextProps.boardPhase,
                shipState: {
                    selected: false,
                    value: nextProps.boardPhase == GamePhase.Arrangement && nextProps.active ? CellValue.Empty : CellValue.Hidden
                },
            }
        }
        return null
    }


    handleClick = () => {
        const { boardPhase, cellPosition, active, allArranged } = this.props
        const { value, selected } = this.state.shipState
        const { x, y } = cellPosition
        console.log(boardPhase);

        if (allArranged || (boardPhase == GamePhase.Attack && active)) {
            if (boardPhase == GamePhase.Arrangement && active) {
                if (value == CellValue.Empty) {
                    this.setState({ shipState: { value: CellValue.ShipPlaced, selected: false }, shipPlaced: true })
                    this.props.onHandleClick(x, y, 'placeShip')
                } else {
                    this.setState({ shipState: { value: CellValue.Empty, selected: false }, shipPlaced: false })
                    this.props.onHandleClick(x, y, 'deleteShip')
                }
            }
            if (boardPhase == GamePhase.Attack && active) {
                this.setState({ ...this.state, shipState: { value: CellValue.Hidden, selected: true } })
                if (this.state.shipPlaced) {
                    // this.setState({ shipState: { value: CellValue.ShipFired, selected: true }, shipPlaced: true })
                    this.props.onHandleClick(x, y, 'selectShip')
                } else {
                    // this.setState({ shipState: { value: CellValue.ShipMissed, selected: true }, shipPlaced: false })
                    this.props.onHandleClick(x, y, 'unselectShip')
                }
            }
        }
    }
    render() {
        let cellClass = 'cell '
        if (this.props.active) cellClass += 'active ';
        if (this.state.shipState.selected) cellClass += 'selected ';

        return (
            <div
                className={cellClass}
                onClick={this.handleClick}>
                {this.state.shipState.value}
            </div>
        );
    }
}