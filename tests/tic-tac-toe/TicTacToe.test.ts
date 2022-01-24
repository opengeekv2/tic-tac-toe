import TicTacToe from "../../src/TicTacToe";

describe("Tic Tac Toe", () => {
    it("should allow player X to start", () => {
        const ticTacToe: TicTacToe = new TicTacToe();
        const output = ticTacToe.play({x: 0, y: 0}, 'X');
        expect(output).toBe(true);
    });

    it("should not allow player O to start", () => {
        const ticTacToe: TicTacToe = new TicTacToe();
        const output = ticTacToe.play({x: 0, y: 0}, 'O');
        expect(output).toBe(false);
    })



})