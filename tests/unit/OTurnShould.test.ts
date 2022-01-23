import OTurn from "../../src/domain/OTurn";
import XTurn from "../../src/domain/XTurn";

describe('OTurn should', () => {
    test('return XTurn when switch is called', () => {
        const oTurn : OTurn = new OTurn();
        const result = oTurn.switch();
        expect(result).toBeInstanceOf(XTurn);
    });
});