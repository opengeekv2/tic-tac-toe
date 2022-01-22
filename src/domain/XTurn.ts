import OTurn from "./OTurn";
import TicTacToeTurn from "./TicTacToeTurn";

export default class XTurn {
    switch(): TicTacToeTurn {
        return new OTurn();
    }
}