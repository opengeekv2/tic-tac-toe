import TicTacToe, {
    GameOverError,
    OutOfTurnError,
    Player,
    SameMoveTwiceError,
    TictacToeState
} from "../../src/TicTacToe";

const PLAYER_X_PLAYING_TWICE_IN_A_ROW = [
            { player: Player.X(), row: 0, column: 0 },
            { player: Player.X(), row: 1, column: 0 },
        ];
const PLAYER_O_PLAYING_TWICE_IN_A_ROW = [
            { player: Player.X(), row: 0, column: 0 },
            { player: Player.O(), row: 1, column: 0 },
            { player: Player.O(), row: 2, column: 0 },
        ];
const PLAYER_O_STARTS_FIRST = [
            { player: Player.O(), row: 1, column: 0 }
        ];

const PLAYER_O_TRIES_TO_PLAY_ON_SAME_POSITION_THAN_X = [
    { player: Player.X(), row: 0, column: 0 },
    { player: Player.O(), row: 0, column: 0 },
];

const PLAYER_X_TRIES_TO_PLAY_ON_SAME_POSITION_THAN_O = [
    { player: Player.X(), row: 0, column: 0 },
    { player: Player.O(), row: 0, column: 0 },
];

const   PLAYER_X_TRIES_TO_PLAY_ON_SAME_POSITION_THAN_X = [
    { player: Player.X(), row: 0, column: 0 },
    { player: Player.O(), row: 1, column: 0 },
    { player: Player.X(), row: 0, column: 0 },
];

const PLAYER_O_TRIES_TO_PLAY_ON_SAME_POSITION_THAN_O = [
    { player: Player.X(), row: 0, column: 0 },
    { player: Player.O(), row: 1, column: 0 },
    { player: Player.X(), row: 2, column: 0 },
    { player: Player.O(), row: 1, column: 0 },
];

const NO_MOVES: TestMove[] = [];

interface TestMove {
    player: Player,
    row: number,
    column: number;
}


describe("Tic Tac Toe", () => {

    let ticTacToe: TicTacToe;

    beforeEach(() => {
        ticTacToe = new TicTacToe();
    });

    it("should allow player X to start", () => {
        const output = play([
            { player: Player.X(), row: 0, column: 0 },
        ]);
        expect(output).toBe(TictacToeState.O_PLAYS);
    });

    it("should switch player X to O", () => {
        const output = play([
            { player: Player.X(), row: 0, column: 0 },
            { player: Player.O(), row: 0, column: 1 },
        ]);
        expect(output).toBe(TictacToeState.X_PLAYS);
    });

    it.each([
    [ PLAYER_X_PLAYING_TWICE_IN_A_ROW ],
    [ PLAYER_O_PLAYING_TWICE_IN_A_ROW ],
    [ PLAYER_O_STARTS_FIRST ]
  ])('should prevent the wrong player of playing out of turn', (moves: Array<TestMove>) => {
        expect(() => {
            play(moves)
        }).toThrowError(OutOfTurnError);

    });

    it.each([
        [ PLAYER_O_TRIES_TO_PLAY_ON_SAME_POSITION_THAN_X ],
        [ PLAYER_X_TRIES_TO_PLAY_ON_SAME_POSITION_THAN_O ],
        [ PLAYER_X_TRIES_TO_PLAY_ON_SAME_POSITION_THAN_X ],
        [ PLAYER_O_TRIES_TO_PLAY_ON_SAME_POSITION_THAN_O ],
    ])('prevents players to play on an already taken position', (moves: Array<TestMove>) => {
        expect(() => {
            play(moves)
        }).toThrowError(SameMoveTwiceError);

    });

    it('should grant victory to player X when he puts 3 tokens on the same row', () => {
        /**
         * X X X
         * O O .
         * . . .
         */
        const outcome = play([
            { player: Player.X(), row: 0, column: 0 },
            { player: Player.O(), row: 1, column: 0 },
            { player: Player.X(), row: 0, column: 1 },
            { player: Player.O(), row: 1, column: 1 },
            { player: Player.X(), row: 0, column: 2 },
        ])

        expect(outcome).toStrictEqual(TictacToeState.X_WINS)
    });

    it('should not grant victory to pristine game', () => {
        /**
         * . . .
         * . . .
         * . . .
         */
        const outcome = play(NO_MOVES)

        expect(outcome).toBe(TictacToeState.X_PLAYS)
    });

    it('should grant victory to player O when she puts 3 tokens on the same row', () => {
        /**
         * O O O
         * X X .
         * X . .
         */
        const outcome = play([
            { player: Player.X(), row: 1, column: 0 },
            { player: Player.O(), row: 0, column: 0 },
            { player: Player.X(), row: 1, column: 2 },
            { player: Player.O(), row: 0, column: 1 },
            { player: Player.X(), row: 2, column: 0 },
            { player: Player.O(), row: 0, column: 2 },
        ])

        expect(outcome).toStrictEqual(TictacToeState.O_WINS)
    });

    it('should grant victory to player X when she puts 3 tokens on the same column', () => {
        /**
         * X O O
         * X . .
         * X . .
         */
        const outcome = play([
            { player: Player.X(), row: 0, column: 0 },
            { player: Player.O(), row: 0, column: 1 },
            { player: Player.X(), row: 1, column: 0 },
            { player: Player.O(), row: 0, column: 2 },
            { player: Player.X(), row: 2, column: 0 },
        ])

        expect(outcome).toStrictEqual(TictacToeState.X_WINS)
    });

    it('should prevent the player from playing after a player has won', () => {
        /**
         * X O O
         * X O .
         * X . .
         */
        const outcome = play([
            { player: Player.X(), row: 0, column: 0 },
            { player: Player.O(), row: 0, column: 1 },
            { player: Player.X(), row: 1, column: 0 },
            { player: Player.O(), row: 0, column: 2 },
            { player: Player.X(), row: 2, column: 0 }, // X WON
        ])

        expect(() => {
            play([
                { player: Player.O(), row: 1, column: 1 },
            ])
        }).toThrowError(GameOverError);

        expect(outcome).toStrictEqual(TictacToeState.X_WINS)
    });

    it('should prevent the player from playing after a player has won', () => {
        /**
         * O X O
         * O X .
         * . X .
         */
        const outcome = play([
            { player: Player.X(), row: 0, column: 1 },
            { player: Player.O(), row: 0, column: 0 },
            { player: Player.X(), row: 1, column: 1 },
            { player: Player.O(), row: 0, column: 2 },
            { player: Player.X(), row: 2, column: 1 }, // X WON
        ])

        expect(() => {
            play([
                { player: Player.O(), row: 1, column: 2 },
            ])
        }).toThrowError(GameOverError);

        expect(outcome).toStrictEqual(TictacToeState.X_WINS)
    });

    it('should prevent the player from playing after a player has won', () => {
        /**
         * O O X
         * O . X
         * . . X
         */
        const outcome = play([
            { player: Player.X(), row: 0, column: 2 },
            { player: Player.O(), row: 0, column: 0 },
            { player: Player.X(), row: 1, column: 2 },
            { player: Player.O(), row: 0, column: 1 },
            { player: Player.X(), row: 2, column: 2 }, // X WON
        ])

        expect(() => {
            play([
                { player: Player.O(), row: 1, column: 0 },
            ])
        }).toThrowError(GameOverError);

        expect(outcome).toStrictEqual(TictacToeState.X_WINS)
    });

    it('player X should be the winner after placing 3 tokens on a diagonal', () => {
        /**
         * X O .
         * O X .
         * . . X
         */
        const outcome = play([
            { player: Player.X(), row: 0, column: 0 },
            { player: Player.O(), row: 0, column: 1 },
            { player: Player.X(), row: 1, column: 1 },
            { player: Player.O(), row: 1, column: 0 },
            { player: Player.X(), row: 2, column: 2 }, // X WON
        ])

        expect(outcome).toStrictEqual(TictacToeState.X_WINS)
    });

    it('player X should be the winner after placing 3 tokens on the other diagonal', () => {
        /**
         * . O X
         * O X .
         * X . .
         */
        const outcome = play([
            { player: Player.X(), row: 0, column: 2 },
            { player: Player.O(), row: 0, column: 1 },
            { player: Player.X(), row: 1, column: 1 },
            { player: Player.O(), row: 1, column: 0 },
            { player: Player.X(), row: 2, column: 0 }, // X WON
        ])

        expect(outcome).toStrictEqual(TictacToeState.X_WINS)
    });

    it('The game should be a tie when all the board is full', () => {
        /**
         * X X O
         * O X X
         * X O O
         */
        const outcome = play([
            { player: Player.X(), row: 0, column: 0 },
            { player: Player.O(), row: 1, column: 0 },
            { player: Player.X(), row: 1, column: 1 },
            { player: Player.O(), row: 2, column: 2 },
            { player: Player.X(), row: 0, column: 1 },
            { player: Player.O(), row: 2, column: 1 },
            { player: Player.X(), row: 2, column: 0 },
            { player: Player.O(), row: 0, column: 2 },
            { player: Player.X(), row: 1, column: 2 }, // TIE
        ])

        expect(outcome).toStrictEqual(TictacToeState.TIE)
    });

    it('The game should be a tie when all the board is full', () => {
        /**
         * X X O
         * O X O
         * X O X
         */
        const outcome = play([
            { player: Player.X(), row: 0, column: 0 },
            { player: Player.O(), row: 1, column: 0 },
            { player: Player.X(), row: 1, column: 1 },
            { player: Player.O(), row: 0, column: 1 },
            { player: Player.X(), row: 1, column: 2 },
            { player: Player.O(), row: 2, column: 1 },
            { player: Player.X(), row: 2, column: 0 },
            { player: Player.O(), row: 0, column: 2 },
            { player: Player.X(), row: 2, column: 2 },
        ])

        expect(outcome).toStrictEqual(TictacToeState.X_WINS)
    });


    function play(moves: Array<TestMove>): TictacToeState {
        let output: TictacToeState = TictacToeState.X_PLAYS;
        for (const {player, row, column} of moves) {
            output = ticTacToe.play({ row: row, column: column }, player);
        }

        return output;
    }
});
