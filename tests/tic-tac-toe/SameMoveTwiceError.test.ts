import { SameMoveTwiceError } from "../../src/TicTacToe";

describe("SameMoveTwiceError", () => {

    it('it should prefix any passed string with SameMoveTwiceError:', () => {
        const message = 'message'
        const sameMoveTwiceError = new SameMoveTwiceError(message);
        expect(sameMoveTwiceError.message).toBe('SameMoveTwiceError: message');
    })
});