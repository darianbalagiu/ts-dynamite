import { Gamestate, BotSelection } from '../models/gamestate';

class Bot {
    makeMove(gamestate: Gamestate): BotSelection {

        let rounds = gamestate["rounds"];
        let roundCount = rounds.length;

        let myDyn: number = this.getDynUsed(gamestate, "p1");
        let oppDyn: number = this.getDynUsed(gamestate, "p2");

        let myDynLeft = 100 - myDyn;
        let oppDynLeft= 100 - oppDyn;

        let nextMove:number;
        if (myDynLeft === 1) {
            nextMove = Math.floor(Math.random() * 3) + 1;
        } else {
            nextMove = Math.floor(Math.random() * 4) + 1;
        }
        if (nextMove === 1) {
            return 'R';
        }
        if (nextMove === 2) {
            return 'P';
        }
        if (nextMove === 3) {
            return 'S';
        }
        if (nextMove === 4) {
            return 'D';
        }
    }

    public getDynUsed(gamestate: Gamestate, player: string) {

        let dynUsed = 0;
        let rounds = gamestate["rounds"];
        for (let round of rounds) {
            if (round[player] == 'D') {
                dynUsed++;
            }
        }
        return dynUsed;
    }

    // public getRoundsWon(gamestate: Gamestate) {
    //     let rounds = gamestate["rounds"];
    //     for (let round of rounds) {
    //
    //     }
    // }


}

export = new Bot();
