import OTurn from "../../src/domain/OTurn";
import XTurn from "../../src/domain/XTurn";

describe('XTurn should', () => {
    test('return OTurn when switch is called', () => {
        const xTurn : XTurn = new XTurn();
        const result = xTurn.switch();
        expect(result).toBeInstanceOf(OTurn);
    });
});