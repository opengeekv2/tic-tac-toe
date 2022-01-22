import TicTacToeTurn from "./TicTacToeTurn";
import XTurn from "./XTurn";

export default class OTurn {
    switch(): TicTacToeTurn {
        return new XTurn();
    }
}