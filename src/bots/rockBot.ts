class Bot {
    constructor() {
        this.dynamiteCount = 100;
        this.opponentMoves = [];
        this.myMoves = [];
    }

    getRandomMove() {
        const moves = ['R', 'P', 'S'];
        return moves[Math.floor(Math.random() * moves.length)];
    }

    getNextMove() {
        const moves = ['R', 'P', 'S', 'W'];
        if (this.dynamiteCount > 0) {
            moves.push('D');
        }
        return moves[Math.floor(Math.random() * moves.length)];
    }

    detectPattern() {
        const moveCounts = { 'R': 0, 'P': 0, 'S': 0, 'D': 0, 'W': 0 };
        this.opponentMoves.forEach(move => moveCounts[move]++);
        const mostCommonMove = Object.keys(moveCounts).reduce((a, b) => moveCounts[a] > moveCounts[b] ? a : b);
        return mostCommonMove;
    }

    counterMove(opponentMove) {
        const counter = {
            'R': 'P',  // Paper beats Rock
            'P': 'S',  // Scissors beats Paper
            'S': 'R',  // Rock beats Scissors
            'D': 'W',  // Water bomb beats Dynamite
            'W': this.getRandomMove()  // Rock, Paper, or Scissors beat Water bomb
        };
        return counter[opponentMove];
    }

    makeMove(gamestate) {
        const round = gamestate.rounds.length;
        if (round > 0) {
            const lastRound = gamestate.rounds[round - 1];
            this.opponentMoves.push(lastRound.p2);
            this.myMoves.push(lastRound.p1);
        }

        let move;
        if (this.dynamiteCount > 0 && Math.random() < 0.1) {
            move = 'D';
            this.dynamiteCount--;
        } else if (round >= 3) {
            const commonMove = this.detectPattern();
            move = this.counterMove(commonMove);
        } else {
            move = this.getNextMove();
        }

        return move;
    }
}

module.exports = new Bot();
