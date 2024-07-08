import { Gamestate, BotSelection } from '../models/gamestate';


type Round = {
    p1: BotSelection,
    p2: BotSelection,
}




class Bot {
    makeMove(gamestate: Gamestate): BotSelection {


        let rounds = gamestate["rounds"];
        let roundCount = rounds.length;
        let wb: boolean = this.usesWb(gamestate);

        let myDyn: number = this.getDynUsed(gamestate, "p1");

        let myDynLeft = 100 - myDyn;

        let nextMove: number;
        let draws = this.nrDraw(gamestate);

        console.log(roundCount, myDynLeft);


        /**
         * Whether the opponent uses waterbombs or not dictate our strategy. There is no specific formula for choosing the probability to throw a dynamite,
         * we just try to approximate what would be the best percentiles.
         *
         * The code can clearly be compressed and written in a much better way, but I didn't have time to focus on that
         */



        if (!wb) {

            if (draws === 0 || myDynLeft === 2) {
                nextMove = Math.floor(Math.random() * 3) + 1;
                if (nextMove === 1) {
                    return 'R';
                }
                if (nextMove === 2) {
                    return 'P';
                }
                if (nextMove === 3) {
                    return 'S';
                }
            } else if (draws === 1) {
                nextMove = Math.floor(Math.random() * 100) + 1;
                if (nextMove <= 2) {
                    return 'D';
                }
                if (nextMove <= 35) {
                    return 'P';
                }
                if (nextMove <= 68) {
                    return 'R';
                }
                return 'S';
            } else if (draws === 2) {
                nextMove = Math.floor(Math.random() * 100) + 1;
                if (nextMove <= 60) {
                    return 'D';
                }
                if (nextMove <= 67) {
                    return 'P';
                }
                if (nextMove <= 84) {
                    return 'R';
                }
                return 'S';
            } else if (draws === 3) {
                nextMove = Math.floor(Math.random() * 100) + 1;
                if (nextMove <= 70) {
                    return 'D';
                }
                if (nextMove <= 67) {
                    return 'P';
                }
                if (nextMove <= 84) {
                    return 'R';
                }
                return 'S';
            } else if (draws === 4) {
                nextMove = Math.floor(Math.random() * 100) + 1;
                if (nextMove <= 80) {
                    return 'D';
                }
                if (nextMove <= 87) {
                    return 'P';
                }
                if (nextMove <= 94) {
                    return 'R';
                }
                return 'S';
            } else  {
                nextMove = Math.floor(Math.random() * 100) + 1;
                if (nextMove <= 99) {
                    return 'D';
                }
                if (nextMove <= 100) {
                    return 'P';
                }
                if (nextMove <= 100) {
                    return 'R';
                }
                return 'S';
            }
        } else {
            if (draws === 0 || myDynLeft === 2) {
                nextMove = Math.floor(Math.random() * 3) + 1;
                if (nextMove === 1) {
                    return 'R';
                }
                if (nextMove === 2) {
                    return 'P';
                }
                if (nextMove === 3) {
                    return 'S';
                }
            } else if (draws === 1) {
                nextMove = Math.floor(Math.random() * 100) + 1;
                if (nextMove <= 8) {
                    return 'D';
                }
                if (nextMove <= 39) {
                    return 'P';
                }
                if (nextMove <= 70) {
                    return 'R';
                }
                return 'S';
            } else if (draws === 2) {
                nextMove = Math.floor(Math.random() * 100) + 1;
                if (nextMove <= 33) {
                    return 'D';
                }
                if (nextMove <= 55) {
                    return 'P';
                }
                if (nextMove <= 77) {
                    return 'R';
                }
                return 'S';
            } else if (draws === 3) {
                nextMove = Math.floor(Math.random() * 100) + 1;
                if (nextMove <= 50) {
                    return 'D';
                }
                if (nextMove <= 67) {
                    return 'P';
                }
                if (nextMove <= 84) {
                    return 'R';
                }
                return 'S';
            } else if (draws === 4) {
                nextMove = Math.floor(Math.random() * 100) + 1;
                if (nextMove <= 70) {
                    return 'D';
                }
                if (nextMove <= 80) {
                    return 'P';
                }
                if (nextMove <= 90) {
                    return 'R';
                }
                return 'S';
            } else  {
                nextMove = Math.floor(Math.random() * 100) + 1;
                if (nextMove <= 80) {
                    return 'D';
                }
                if (nextMove <= 87) {
                    return 'P';
                }
                if (nextMove <= 94) {
                    return 'R';
                }
                return 'S';
            }
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

    // Counts the number of consecutive draws starting from the last round played.
    public nrDraw(gamestate: Gamestate) {
        let count = 0;
        let i = gamestate["rounds"].length-1;

        while (i >= 0) {
            let round = gamestate["rounds"][i];
            if (this.isDraw(round)) {
                count++;
            } else {
                break;
            }
            i--;
        }
        return count;
    }

    // Decides if a round is a draw
    public isDraw(round: Round) {
        return round["p1"] === round["p2"];
    }

    // Decides if opponent uses waterbomb. This helps build our strategy
    public usesWb(gamestate: Gamestate) {
        let rounds = gamestate["rounds"];
        for (let round of rounds) {
            if (round["p2"] == 'W') {
                return true
            }
        }
        return false;
    }




}

export = new Bot();
