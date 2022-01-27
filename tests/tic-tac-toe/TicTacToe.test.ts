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
            ticTacToe.play({x: 0, y: 0}, 'O');
        }).toThrowError();
    })

    it("should not allow a unknown player", () => {
        const ticTacToe: TicTacToe = new TicTacToe();
        const unknownPlayer = 'T';
        expect(() => {
            ticTacToe.play({x: 0, y: 0}, unknownPlayer);
        }).toThrowError();
    })

    it("should switch player X to O", () => {
        const ticTacToe: TicTacToe = new TicTacToe();
        ticTacToe.play({x: 0, y: 0}, 'X');
        const output = ticTacToe.play({x: 0, y: 0}, 'O');
        expect(output).toBe(true);
    })

    it("should not let X player play twice", () => {
        const ticTacToe: TicTacToe = new TicTacToe();
        ticTacToe.play({x: 0, y: 0}, 'X');
         expect(() => {
            ticTacToe.play({x: 0, y: 0}, 'X');
        }).toThrowError();
    })


})