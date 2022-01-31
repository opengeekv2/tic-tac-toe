import { OutOfTurnError } from "../../src/TicTacToe";

describe("OutOfTurnError", () => {

    it('it should prefix any passed string with OutOfTurnError:', () => {
        const message = 'message'
        const outOfTurnError = new OutOfTurnError(message);
        expect(outOfTurnError.message).toBe('OutOfTurnError: message');
    })
});