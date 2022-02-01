import TicTacToe, {OutOfTurnError, SameMoveTwiceError, Player, Position} from "../../src/TicTacToe";

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

    it.each([
        [
            {x: 0, y: 0},
            {x: 0, y: 1}
        ],[
            {x: 0, y: 0},
            {x: 1, y: 0},
        ]] as Position[][])("should not let O play on an already played position x", (positionX: Position, positionO: Position) => {
        const output = ticTacToe.play(positionX, Player.X());
        ticTacToe.play(positionO, Player.O());
        expect(output).toBe(true);
    });

});
