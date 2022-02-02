import TicTacToe, {OutOfTurnError, SameMoveTwiceError, Player} from "../../src/TicTacToe";

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
        expect(output).toBe(true);
    });

    it("should switch player X to O", () => {
        const output = play([
            { player: Player.X(), x: 0, y: 0 },
            { player: Player.O(), x: 0, y: 1 },
        ]);
        expect(output).toBe(true);
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

    it("should let X player play after O", () => {
        const output = play([
            { player: Player.X(), x: 0, y: 0 },
            { player: Player.O(), x: 0, y: 1 },
            { player: Player.X(), x: 0, y: 2 },
        ]);
        expect(output).toBe(true);
    });

    it('prevents player to play on an already taken position', () => {
        expect(() => {
            play([
                { player: Player.X(), x: 0, y: 0 },
                { player: Player.O(), x: 0, y: 0 },
            ])
        }).toThrowError(SameMoveTwiceError);
    });

    it('allows player to play on the same row', () => {
        expect(
            play([
                { player: Player.X(), x: 0, y: 0 },
                { player: Player.O(), x: 0, y: 1 },
            ])
        ).toBe(true)
    });

    it('allows player to play on the same column', () => {
        expect(
            play([
                { player: Player.X(), x: 0, y: 0 },
                { player: Player.O(), x: 1, y: 0 },
            ])
        ).toBe(true)
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

        expect(ticTacToe.getWinner()).toStrictEqual(Player.X())
    });

    function play(moves: Array<TestMove>): boolean {
        let output = false;
        for (const {player, x, y} of moves) {
            output = ticTacToe.play({ x, y }, player);
        }

        return output;
    }
});
