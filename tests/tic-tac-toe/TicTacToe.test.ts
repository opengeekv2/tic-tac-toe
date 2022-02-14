import TicTacToe, {OutOfTurnError, SameMoveTwiceError, Player, GameOverError, TictacToeState} from "../../src/TicTacToe";

const PLAYER_X_PLAYING_TWICE_IN_A_ROW = [
            { player: Player.X(), x: 0, y: 0 },
            { player: Player.X(), x: 1, y: 0 },
        ];
const PLAYER_O_PLAYING_TWICE_IN_A_ROW = [
            { player: Player.X(), x: 0, y: 0 },
            { player: Player.O(), x: 1, y: 0 },
            { player: Player.O(), x: 2, y: 0 },
        ];
const PLAYER_O_STARTS_FIRST = [
            { player: Player.O(), x: 1, y: 0 }
        ];

const PLAYER_O_TRIES_TO_PLAY_ON_SAME_POSITION_THAN_X = [
    { player: Player.X(), x: 0, y: 0 },
    { player: Player.O(), x: 0, y: 0 },
];

const PLAYER_X_TRIES_TO_PLAY_ON_SAME_POSITION_THAN_O = [
    { player: Player.X(), x: 0, y: 0 },
    { player: Player.O(), x: 0, y: 0 },
];

const   PLAYER_X_TRIES_TO_PLAY_ON_SAME_POSITION_THAN_X = [
    { player: Player.X(), x: 0, y: 0 },
    { player: Player.O(), x: 1, y: 0 },
    { player: Player.X(), x: 0, y: 0 },
];

const PLAYER_O_TRIES_TO_PLAY_ON_SAME_POSITION_THAN_O = [
    { player: Player.X(), x: 0, y: 0 },
    { player: Player.O(), x: 1, y: 0 },
    { player: Player.X(), x: 2, y: 0 },
    { player: Player.O(), x: 1, y: 0 },
];

const NO_MOVES: TestMove[] = [];

interface TestMove {
    player: Player,
    x: number,
    y: number;
}


describe("Tic Tac Toe", () => {

    let ticTacToe: TicTacToe;

    beforeEach(() => {
        ticTacToe = new TicTacToe();
    });

    it("should allow player X to start", () => {
        const output = play([
            { player: Player.X(), x: 0, y: 0 },
        ]);
        expect(output).toBe(TictacToeState.O_PLAYS);
    });

    it("should switch player X to O", () => {
        const output = play([
            { player: Player.X(), x: 0, y: 0 },
            { player: Player.O(), x: 0, y: 1 },
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
        play([
            { player: Player.X(), x: 0, y: 0 },
            { player: Player.O(), x: 1, y: 0 },
            { player: Player.X(), x: 0, y: 1 },
            { player: Player.O(), x: 1, y: 1 },
            { player: Player.X(), x: 0, y: 2 },
        ])

        expect(ticTacToe.getWinner()).toStrictEqual(TictacToeState.X_WINS)
    });

    it('should not grant victory to pristine game', () => {
        /**
         * . . .
         * . . .
         * . . .
         */
        play(NO_MOVES)

        expect(ticTacToe.getWinner()).toBe(null)
    });

    it('should grant victory to player O when she puts 3 tokens on the same row', () => {
        /**
         * O O O
         * X X .
         * X . .
         */
        play([
            { player: Player.X(), x: 1, y: 0 },
            { player: Player.O(), x: 0, y: 0 },
            { player: Player.X(), x: 1, y: 2 },
            { player: Player.O(), x: 0, y: 1 },
            { player: Player.X(), x: 2, y: 0 },
            { player: Player.O(), x: 0, y: 2 },
        ])

        expect(ticTacToe.getWinner()).toStrictEqual(TictacToeState.O_WINS)
    });

    it('should grant victory to player X when she puts 3 tokens on the same column', () => {
        /**
         * X O O
         * X . .
         * X . .
         */
        play([
            { player: Player.X(), x: 0, y: 0 },
            { player: Player.O(), x: 0, y: 1 },
            { player: Player.X(), x: 1, y: 0 },
            { player: Player.O(), x: 0, y: 2 },
            { player: Player.X(), x: 2, y: 0 },
        ])

        expect(ticTacToe.getWinner()).toStrictEqual(TictacToeState.X_WINS)
    });

    it('should prevent the player from playing after a player has won', () => {
        /**
         * X O O
         * X O .
         * X . .
         */
        play([
            { player: Player.X(), x: 0, y: 0 },
            { player: Player.O(), x: 0, y: 1 },
            { player: Player.X(), x: 1, y: 0 },
            { player: Player.O(), x: 0, y: 2 },
            { player: Player.X(), x: 2, y: 0 }, // X WON
        ])

        expect(() => {
            play([
                { player: Player.O(), x: 1, y: 1 },
            ])
        }).toThrowError(GameOverError);

        expect(ticTacToe.getWinner()).toStrictEqual(TictacToeState.X_WINS)
    });

    it('should prevent the player from playing after a player has won', () => {
        /**
         * O X O
         * O X .
         * . X .
         */
        play([
            { player: Player.X(), x: 0, y: 1 },
            { player: Player.O(), x: 0, y: 0 },
            { player: Player.X(), x: 1, y: 1 },
            { player: Player.O(), x: 0, y: 2 },
            { player: Player.X(), x: 2, y: 1 }, // X WON
        ])

        expect(() => {
            play([
                { player: Player.O(), x: 1, y: 2 },
            ])
        }).toThrowError(GameOverError);

        expect(ticTacToe.getWinner()).toStrictEqual(TictacToeState.X_WINS)
    });

    it('should prevent the player from playing after a player has won', () => {
        /**
         * O O X
         * O . X
         * . . X
         */
        play([
            { player: Player.X(), x: 0, y: 2 },
            { player: Player.O(), x: 0, y: 0 },
            { player: Player.X(), x: 1, y: 2 },
            { player: Player.O(), x: 0, y: 1 },
            { player: Player.X(), x: 2, y: 2 }, // X WON
        ])

        expect(() => {
            play([
                { player: Player.O(), x: 1, y: 0 },
            ])
        }).toThrowError(GameOverError);

        expect(ticTacToe.getWinner()).toStrictEqual(TictacToeState.X_WINS)
    });

    function play(moves: Array<TestMove>): TictacToeState | boolean {
        let output: TictacToeState | boolean = false;
        for (const {player, x, y} of moves) {
            output = ticTacToe.play({ x, y }, player);
        }

        return output;
    }
});
