import TicTacToe from "../../src/TicTacToe";

describe("Tic Tac Toe", () => {
    it("should allow player X to start", () => {
        const ticTacToe: TicTacToe = new TicTacToe();
        const output = ticTacToe.play({x: 0, y: 0}, 'X');
        expect(output).toBe(true);
    });

    it("should not allow player O to start", () => {
        const ticTacToe: TicTacToe = new TicTacToe();
        expect(() => {
            const output = ticTacToe.play({x: 0, y: 0}, 'O');
        }).toThrowError();
    })

    it("should not allow a unknown player", () => {
        const ticTacToe: TicTacToe = new TicTacToe();
        const unknownPlayer = 'T';
        expect(() => {
            const output = ticTacToe.play({x: 0, y: 0}, unknownPlayer);
        }).toThrowError();
    })

    it("should switch player X to O", () => {
        
    })


})