import TicTacToe from "../../src/TicTacToe";

describe("Tic Tac Toe", () => {

    let ticTacToe: TicTacToe = new TicTacToe();

    afterEach(() => {
        ticTacToe = new TicTacToe();
    });

    it("should allow player X to start", () => {
        const output = ticTacToe.play({x: 0, y: 0}, 'X');
        expect(output).toBe(true);
    });

    it("should not allow player O to start", () => {
        expect(() => {
            ticTacToe.play({x: 0, y: 0}, 'O');
        }).toThrowError();
    });

    it("should not allow a unknown player", () => {
        const unknownPlayer = 'T';
        expect(() => {
            ticTacToe.play({x: 0, y: 0}, unknownPlayer);
        }).toThrowError();
    })

    it("should switch player X to O", () => {
        ticTacToe.play({x: 0, y: 0}, 'X');
        const output = ticTacToe.play({x: 0, y: 0}, 'O');
        expect(output).toBe(true);
    });

    it("should not let X player play twice", () => {
        ticTacToe.play({x: 0, y: 0}, 'X');
         expect(() => {
            ticTacToe.play({x: 0, y: 0}, 'X');
        }).toThrowError();
    });

});