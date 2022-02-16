import TicTacToe, {
    GameOverError,
    OutOfTurnError,
    Player,
    SameMoveTwiceError,
    TictacToeState
} from "../../src/TicTacToe";

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

    function play(moves: TestMove[]): TictacToeState {
        let output: TictacToeState = TictacToeState.X_PLAYS;
        for (const {player, row, column} of moves) {
            output = ticTacToe.play({ row: row, column: column }, player);
        }

        return output;
    }

    describe(" managing player turns ", () => {

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
        ])('should prevent the wrong player of playing out of turn', (moves: TestMove[]) => {
            expect(() => {
                play(moves)
            }).toThrowError(OutOfTurnError);

        });

    });

    describe(" checking positions ", () => {

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

        it.each([
            [ PLAYER_O_TRIES_TO_PLAY_ON_SAME_POSITION_THAN_X ],
            [ PLAYER_X_TRIES_TO_PLAY_ON_SAME_POSITION_THAN_O ],
            [ PLAYER_X_TRIES_TO_PLAY_ON_SAME_POSITION_THAN_X ],
            [ PLAYER_O_TRIES_TO_PLAY_ON_SAME_POSITION_THAN_O ],
        ])('prevents players to play on an already taken position', (moves: TestMove[]) => {
            expect(() => {
                play(moves)
            }).toThrowError(SameMoveTwiceError);

        });

    });

    describe(" checking game end conditions ", () => {

        const X_WINS_FIRST_ROW = [
            { player: Player.X(), row: 0, column: 0 },
            { player: Player.O(), row: 1, column: 0 },
            { player: Player.X(), row: 0, column: 1 },
            { player: Player.O(), row: 1, column: 1 },
            { player: Player.X(), row: 0, column: 2 },
        ];

        const X_WINS_SECOND_ROW = [
            { player: Player.X(), row: 1, column: 0 },
            { player: Player.O(), row: 0, column: 0 },
            { player: Player.X(), row: 1, column: 1 },
            { player: Player.O(), row: 0, column: 1 },
            { player: Player.X(), row: 1, column: 2 },
        ];

        const X_WINS_FIRST_COLUMN = [
            { player: Player.X(), row: 0, column: 0 },
            { player: Player.O(), row: 0, column: 1 },
            { player: Player.X(), row: 1, column: 0 },
            { player: Player.O(), row: 0, column: 2 },
            { player: Player.X(), row: 2, column: 0 },
        ];

        const X_WINS_SECOND_COLUMN = [
            { player: Player.X(), row: 0, column: 1 },
            { player: Player.O(), row: 0, column: 0 },
            { player: Player.X(), row: 1, column: 1 },
            { player: Player.O(), row: 0, column: 2 },
            { player: Player.X(), row: 2, column: 1 },
        ];

        const X_WINS_LEFT_DIAGONAL = [
            { player: Player.X(), row: 0, column: 0 },
            { player: Player.O(), row: 0, column: 1 },
            { player: Player.X(), row: 1, column: 1 },
            { player: Player.O(), row: 1, column: 0 },
            { player: Player.X(), row: 2, column: 2 },
        ]

        const X_WINS_RIGHT_DIAGONAL = [
            { player: Player.X(), row: 0, column: 2 },
            { player: Player.O(), row: 0, column: 1 },
            { player: Player.X(), row: 1, column: 1 },
            { player: Player.O(), row: 1, column: 0 },
            { player: Player.X(), row: 2, column: 0 },
        ]

        const X_WINS_AT_LAST_MOVE = [
            { player: Player.X(), row: 0, column: 0 },
            { player: Player.O(), row: 1, column: 0 },
            { player: Player.X(), row: 1, column: 1 },
            { player: Player.O(), row: 0, column: 1 },
            { player: Player.X(), row: 1, column: 2 },
            { player: Player.O(), row: 2, column: 1 },
            { player: Player.X(), row: 2, column: 0 },
            { player: Player.O(), row: 0, column: 2 },
            { player: Player.X(), row: 2, column: 2 },
        ]

        it.each([
            [ X_WINS_FIRST_ROW ],
            [ X_WINS_SECOND_ROW ],
            [ X_WINS_FIRST_COLUMN ],
            [ X_WINS_SECOND_COLUMN ],
            [ X_WINS_LEFT_DIAGONAL ],
            [ X_WINS_RIGHT_DIAGONAL ],
            [ X_WINS_AT_LAST_MOVE ]
        ])('should grant victory to player X', (moves: TestMove[]) => {
            const outcome = play(moves)

            expect(outcome).toStrictEqual(TictacToeState.X_WINS)
        });

        const O_WINS_FIRST_ROW = [
            { player: Player.X(), row: 2, column: 2 },
            { player: Player.O(), row: 0, column: 0 },
            { player: Player.X(), row: 1, column: 0 },
            { player: Player.O(), row: 0, column: 1 },
            { player: Player.X(), row: 1, column: 1 },
            { player: Player.O(), row: 0, column: 2 },
        ];

        const O_WINS_SECOND_ROW = [
            { player: Player.X(), row: 2, column: 2 },
            { player: Player.O(), row: 1, column: 0 },
            { player: Player.X(), row: 0, column: 0 },
            { player: Player.O(), row: 1, column: 1 },
            { player: Player.X(), row: 0, column: 1 },
            { player: Player.O(), row: 1, column: 2 },
        ];

        const O_WINS_FIRST_COLUMN = [
            { player: Player.X(), row: 2, column: 2 },
            { player: Player.O(), row: 0, column: 0 },
            { player: Player.X(), row: 0, column: 1 },
            { player: Player.O(), row: 1, column: 0 },
            { player: Player.X(), row: 0, column: 2 },
            { player: Player.O(), row: 2, column: 0 },
        ];

        const O_WINS_SECOND_COLUMN = [
            { player: Player.X(), row: 2, column: 2 },
            { player: Player.O(), row: 0, column: 1 },
            { player: Player.X(), row: 0, column: 0 },
            { player: Player.O(), row: 1, column: 1 },
            { player: Player.X(), row: 0, column: 2 },
            { player: Player.O(), row: 2, column: 1 },
        ];

        const O_WINS_LEFT_DIAGONAL = [
            { player: Player.X(), row: 0, column: 2 },
            { player: Player.O(), row: 0, column: 0 },
            { player: Player.X(), row: 0, column: 1 },
            { player: Player.O(), row: 1, column: 1 },
            { player: Player.X(), row: 1, column: 0 },
            { player: Player.O(), row: 2, column: 2 },
        ]

        const O_WINS_RIGHT_DIAGONAL = [
            { player: Player.X(), row: 2, column: 2 },
            { player: Player.O(), row: 0, column: 2 },
            { player: Player.X(), row: 0, column: 1 },
            { player: Player.O(), row: 1, column: 1 },
            { player: Player.X(), row: 1, column: 0 },
            { player: Player.O(), row: 2, column: 0 },
        ]

        it.each([
            [ O_WINS_FIRST_ROW ],
            [ O_WINS_SECOND_ROW ],
            [ O_WINS_FIRST_COLUMN ],
            [ O_WINS_SECOND_COLUMN ],
            [ O_WINS_LEFT_DIAGONAL ],
            [ O_WINS_RIGHT_DIAGONAL ],
        ])('should grant victory to player O', (moves: TestMove[]) => {
            const outcome = play(moves)

            expect(outcome).toStrictEqual(TictacToeState.O_WINS)
        });

        const O_PLAYS_AFTER_X_WON = [
            { player: Player.X(), row: 0, column: 0 },
            { player: Player.O(), row: 0, column: 1 },
            { player: Player.X(), row: 1, column: 0 },
            { player: Player.O(), row: 0, column: 2 },
            { player: Player.X(), row: 2, column: 0 }, // X WON
            { player: Player.O(), row: 1, column: 1 }
        ];

        const X_PLAYS_AFTER_O_WON = [
            { player: Player.X(), row: 2, column: 2 },
            { player: Player.O(), row: 0, column: 2 },
            { player: Player.X(), row: 0, column: 1 },
            { player: Player.O(), row: 1, column: 1 },
            { player: Player.X(), row: 1, column: 0 },
            { player: Player.O(), row: 2, column: 0 },
            { player: Player.X(), row: 0, column: 0 },
        ];

        it.each([
            [ O_PLAYS_AFTER_X_WON ],
            [ X_PLAYS_AFTER_O_WON ],
        ])("should prevent any player from playing after any player has won", (moves: TestMove[]) => {
            expect(() => {
                play(moves);
            }).toThrowError(GameOverError);
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

    });

});
