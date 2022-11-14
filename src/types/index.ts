//App
export enum GamePhase {
    Arrangement = 'arrangement',
    FinishArrangement = 'finishArrangement',
    Attack = 'attack',
    FinishAttack = 'finishAttack',
    Result = 'result'
}

export type GamePlayer = {
    id: '1' | '2';
    name: string;
    score: number
}

export enum ButtonValues {
    FinishArrangement = 'Finish Arrangement📍',
    Attack = 'Attack🚀'
}

export type GameState = {
    players: { "1": GamePlayer, "2": GamePlayer };
    gamePhase: GamePhase;
    playerTurn: '1' | '2';
    actionButton: { disabled: boolean, value: ButtonValues };
    finishArrangementCount: number,
    selectedCell: { player: '1' | '2', cell: { x: number, y: number } } | null
}

//Player Board
export type PlayerBoardProps = {
    player: GamePlayer;
    gamePhase: GamePhase;
    playerTurn: '1' | '2';
    onCellClick: (playerId: string, action: string) => void;
    onCellSelect: (x: number, y: number, player: '1' | '2') => void
}

export type PlayerBoardState = {
    cells: Array<Array<{ x: number, y: number }>>;
    shipsPlaced: Array<{ x: number, y: number }>;
    shipsFired: Array<{ x: number, y: number }>;
    nowActive: boolean;
    gamePhase: GamePhase;
    shipSelected: { x: number, y: number } | null,
}

//Cell
export enum CellValue {
    Empty = '🌊',
    ShipPlaced = '🚢',
    Hidden = '🔒',
    ShipFired = '🔥',
    ShipMissed = '🚫'
}

export type CellProp = {
    cellPosition: { x: number, y: number };
    boardPhase: GamePhase;
    active: boolean;
    allArranged: boolean;
    onHandleClick: (x: number, y: number, action: string) => any;
}

export type CellState = {
    shipState: {
        selected: boolean,
        value: CellValue
    },
    boardPhase: GamePhase
    shipPlaced: boolean
}

//Game info
export type GameInfoProps = {
    players: { '1': GamePlayer, '2': GamePlayer }
    gamePhase: GamePhase
    playerTurn: '1' | '2'
    button: { disabled: boolean, value: ButtonValues }
    onButtonClick: () => void
}

export type GameInfoState = {
    actionButton: string
}