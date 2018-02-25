'use strict';

import Card from './models/card';

let Game = (function () {
    const SUIT_HEARTS = 'H';
    const SUIT_DIAMONDS = 'D';
    const SUIT_CLUBS = 'C';
    const SUIT_SPADES = 'S';

    const RANK_TWO = '2';
    const RANK_THREE = '3';
    const RANK_FOUR = '4';
    const RANK_FIVE = '5';
    const RANK_SIX = '6';
    const RANK_SEVEN = '7';
    const RANK_EIGHT = '8';
    const RANK_NINE = '9';
    const RANK_TEN = '0';
    const RANK_JACK = 'J';
    const RANK_QUEEN = 'Q';
    const RANK_KING = 'K';
    const RANK_ACE = 'A';

    const SCORE_ADD = 'add';
    const SCORE_SUBTRACT = 'sub';

    let cardOpened = null;
    let pairsCount = 9;
    let pairsFound = 0;

    //  Component API
    let game = {
        completed: false,
        score: 0,
        cards: []

        //,createDeck: _createDeck
        //,getRandomPairs: _getRandomPairs
        //,shuffle: _shuffle

        , init: init
        , reset: reset

        , closeCard: closeCard
        , openCard: openCard

        , turnDownAll: turnDownAll
        , showAll: showAll
    };
    return game;


    //  Private methods

    /**
     * Creates deck
     * @return {Array} Deck
     */
    function _createDeck() {
        let suits = [SUIT_HEARTS, SUIT_DIAMONDS, SUIT_CLUBS, SUIT_SPADES];
        let ranks = [RANK_TWO, RANK_THREE, RANK_FOUR, RANK_FIVE, RANK_SIX, RANK_SEVEN, RANK_EIGHT, RANK_NINE, RANK_TEN, RANK_JACK, RANK_QUEEN, RANK_KING, RANK_ACE];
        let deck = [];
        for (let i = 0; i < suits.length; i++) {
            for (let k = 0; k < ranks.length; k++) {
                deck.push(new Card(ranks[k], suits[i]));
            }
        }
        return deck;
    }

    /**
     * Checks if index in array range.
     * @param index
     * @param array
     * @return {boolean}
     */
    function _checkIndexInRange(index, array) {
        if (index < 0 || index > array.length - 1) {
            console.log('Index out of range');
            return false;
        }
        return true;
    }

    /**
     * Checks if game completed
     * @return {boolean}
     */
    function _checkCompleted() {
        game.completed = pairsCount === pairsFound;
    }

    /**
     * Selects cards from deck randomly and duplicates them to get pairs.
     * @param {Number} pairsCount
     * @param {Array} deck Array of cards (deck) to select from
     * @return {Array} Selected card pairs
     */
    function _getRandomPairs(pairsCount, deck) {
        let _deck = deck.slice(0);
        let pairs = [];
        for (let i = 0; i < pairsCount; i++) {
            let rand = Math.floor(Math.random() * _deck.length);
            let card = _deck.splice(rand, 1)[0];
            pairs.push(card);
            pairs.push(new Card(card.rank, card.suit));
        }
        return pairs;
    }

    /**
     * Changes score
     * @param action SCORE_ADD | SCORE_SUBTRACT
     * @private
     */
    function _score(action) {
        let coef = 42;
        let pairsNotFound = pairsCount - pairsFound;
        switch (action) {
            case SCORE_ADD:
                game.score += pairsNotFound * coef;
                break;
            case SCORE_SUBTRACT:
                game.score -= pairsFound * coef;
                break;
            default:
                break;
        }
    }

    /**
     * Just shuffles cards in array of cards.
     * @param {Array} cards
     * @param {Number} count of shuffle
     * @return {Array} cards shuffled
     */
    function _shuffle(cards, count) {
        if (count === undefined) {
            count = 1;
        }
        if (count <= 0) {
            return cards;
        }
        let _shuffled = [];
        while (cards.length > 0) {
            let i = Math.floor(Math.random() * cards.length);
            let k = Math.floor(Math.random() * _shuffled.length);
            _shuffled.splice(k, 0, cards.splice(i, 1)[0]);
        }
        return _shuffle(_shuffled, count - 1);
    }


    //  Public methods

    /**
     * Initializes game
     */
    function init() {
        let deck = _createDeck();
        game.cards = _getRandomPairs(pairsCount, deck);
        game.cards = _shuffle(game.cards, 5);
        game.completed = false;
        game.score = 0;

        cardOpened = null;
        pairsFound = 0;
    }

    function closeCard(index) {
        if (!_checkIndexInRange(index, game.cards)) {
            return;
        }
        if (cardOpened !== null && cardOpened.isSameWith(game.cards[index])) {
            cardOpened = null;
        }
        game.cards[index].turnDown();
    }

    function openCard(index) {
        if (!_checkIndexInRange(index, game.cards)) {
            return;
        }
        let timeout = 1000;
        let card = game.cards[index];
        card.show();
        if (cardOpened === null) {
            cardOpened = game.cards[index];
        } else {
            if (card.isSameWith(cardOpened)) {
                setTimeout(function () {
                    card.hide();
                    cardOpened.hide();
                    cardOpened = null;
                    _score(SCORE_ADD);
                    pairsFound++;
                    _checkCompleted();
                }, timeout);
            } else {
                setTimeout(function () {
                    card.turnDown();
                    cardOpened.turnDown();
                    cardOpened = null;
                    _score(SCORE_SUBTRACT);
                }, timeout);
            }
        }
    }

    function turnCard(index) {
        if (!_checkIndexInRange(index, game.cards)) {
            return;
        }
        game.cards[index].turn();
    }

    function turnDownAll() {
        let evalStr = '';
        for (let i = 0; i < game.cards.length; i++) {
            evalStr += 'game.cards[' + i + '].opened = ';
        }
        let eval_turnDownAllCards = evalStr + 'false;';
        eval(eval_turnDownAllCards);
    }

    function showAll() {
        let evalStr = '';
        for (let i = 0; i < game.cards.length; i++) {
            evalStr += 'game.cards[' + i + '].opened = ';
        }
        let eval_showAllCards = evalStr + 'true;';
        eval(eval_showAllCards);
    }

    function reset() {
        game.init();
    }

})();

export default Game;