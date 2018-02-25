'use strict';

class Card {
    constructor(rank, suit) {
        this.rank = rank;
        this.suit = suit;
        this.opened = false;
        this.hidden = false;
    }

    get skin() {
        let skinDir = 'img/cards/';
        let skinExt = '.png';
        return skinDir + this.rank + this.suit + skinExt;
    }

    isSameWith (card) {
        return this.suit === card.suit && this.rank === card.rank;
    }

    hide () {
        this.hidden = true;
    }

    show () {
        this.opened = true;
    }

    turn () {
        this.opened ^= true;
    }

    turnDown () {
        this.opened = false;
    }

    toString () {
        return this.rank + this.suit + ' ' + (this.opened ? 'opened' : 'closed');
    }
}

module.exports = Card;