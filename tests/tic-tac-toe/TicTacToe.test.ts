import TicTacToe, {OutOfTurnError, SameMoveTwiceError, Player} from "../../src/TicTacToe";

describe("Tic Tac Toe", () => {

    let ticTacToe: TicTacToe;

    beforeEach(() => {
        ticTacToe = new TicTacToe();
    });

    it("should allow player X to start", () => {
        const output = ticTacToe.play({x: 0, y: 0}, Player.X());
        expect(output).toBe(true);
    });

    it("should not allow player O to start", () => {
        expect(() => {
            ticTacToe.play({x: 0, y: 0}, Player.O());
        }).toThrowError(OutOfTurnError);
    });

    it("should switch player X to O", () => {
        ticTacToe.play({x: 0, y: 0}, Player.X());
        const output = ticTacToe.play({x: 0, y: 1}, Player.O());
        expect(output).toBe(true);
    });

    it("should not let X player play twice", () => {
        ticTacToe.play({x: 0, y: 0}, Player.X());
         expect(() => {
            ticTacToe.play({x: 0, y: 1}, Player.X());
        }).toThrowError(OutOfTurnError);
    });

    it("should not let O player play twice after X", () => {
        ticTacToe.play({x: 0, y: 0}, Player.X());
        ticTacToe.play({x: 0, y: 1}, Player.O());
         expect(() => {
            ticTacToe.play({x: 0, y: 2}, Player.O());
        }).toThrowError(OutOfTurnError);
    });

    it("should let X player play after O", () => {
        ticTacToe.play({x: 0, y: 0}, Player.X());
        ticTacToe.play({x: 0, y: 1}, Player.O());
        const output = ticTacToe.play({x: 0, y: 2}, Player.X());
        expect(output).toBe(true);
    });

    it("should not let O play on an already played position", () => {
        ticTacToe.play({x: 0, y: 0}, Player.X());
        expect(() => {
            ticTacToe.play({x: 0, y: 0}, Player.O());
        }).toThrowError(SameMoveTwiceError);

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

    function play(moves: Array<{ player: Player, x: number, y: number }>): boolean {
        let output = false;
        for (const {player, x, y} of moves) {
            output = ticTacToe.play({ x, y }, player);
        }

        return output;
    }
});
