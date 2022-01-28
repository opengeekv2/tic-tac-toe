import { PlayedTwiceError } from "../../src/TicTacToe";

describe("PlayedTwiceError", () => {

    it('it should prefix any passed string with PlayedTwiceError:', () => {
        const message = 'message'
        const playedTwiceError = new PlayedTwiceError(message);
        expect(playedTwiceError.message).toBe('PlayedTwiceError: message');
    })
});