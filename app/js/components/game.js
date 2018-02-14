'use strict';

var Game = (function () {
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

    /**
     * Card model
     * @param rank RANK_ONE | RANK_TWO ...
     * @param suit SUIT_HEARTS | SUIT_DIAMONDS | SUIT_CLUBS | SUIT_SPADES
     * @constructor
     */
    var Card = function (rank, suit) {
        this.rank = rank;
        this.suit = suit;
        this.opened = false;
        this.skin = this.getSkin();
    };
    Card.prototype.getSkin = function () {
        var skinDir = 'img/cards/';
        var skinExt = '.png';
        return skinDir + this.rank + this.suit + skinExt;
    };
    Card.prototype.isSameWith = function (card) {
        return this.suit === card.suit && this.rank === card.rank;
    };
    Card.prototype.hide = function () {
        this.opened = false;
    };
    Card.prototype.show = function () {
        this.opened = true;
    };
    Card.prototype.turn = function () {
        this.opened ^= true;
    };


    //  Component API
    var game = {
        score: 0,
        cards: []

        //,createDeck: _createDeck
        //,getRandomPairs: _getRandomPairs
        //,shuffle: _shuffle

        ,init: init
        ,closeCard: closeCard
        ,openCard: openCard
        ,turnCard: turnCard
    };


    //  Private methods

    /**
     * Creates deck
     * @return {Array} Deck
     */
    function _createDeck() {
        var suits = [SUIT_HEARTS, SUIT_DIAMONDS, SUIT_CLUBS, SUIT_SPADES];
        var ranks = [RANK_TWO, RANK_THREE, RANK_FOUR, RANK_FIVE, RANK_SIX, RANK_SEVEN, RANK_EIGHT, RANK_NINE, RANK_TEN, RANK_JACK, RANK_QUEEN, RANK_KING, RANK_ACE];
        var deck = [];
        for (var i = 0; i < suits.length; i++) {
            for (var k = 0; k < ranks.length; k++) {
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
    function _checkIndexInRange(index, array){
        if (index < 0 || index > array.length - 1) {
            console.log('Index out of range');
            return false;
        }
        return true;
    }

    /**
     * Selects cards from deck randomly and duplicates them to get pairs.
     * @param {Number} pairsCount
     * @param {Array} deck Array of cards (deck) to select from
     * @return {Array} Selected card pairs
     */
    function _getRandomPairs(pairsCount, deck) {
        var _deck = deck.slice(0);
        var pairs = [];
        for (var i = 0; i < pairsCount; i++) {
            var rand = Math.floor(Math.random() * _deck.length);
            var card = _deck.splice(rand, 1)[0];
            pairs.push(card);
            pairs.push(new Card(card.rank, card.suit));
        }
        return pairs;
    }

    /**
     * Just shuffles cards in array of cards.
     * @param cards
     */
    function _shuffle(cards) {
        var _shuffled = [];
        while (cards.length > 0) {
            var i = Math.floor(Math.random() * cards.length);
            var k = Math.floor(Math.random() * _shuffled.length);
            _shuffled.splice(k, 0, cards.splice(i, 1)[0]);
        }
        return _shuffled;
    }


    //  Public methods

    /**
     * Initializes game
     */
    function init() {
        var pairsCount = 9;
        var deck = _createDeck();
        game.cards = _getRandomPairs(pairsCount, deck);
        game.cards = _shuffle(game.cards);
    }

    function closeCard(index) {
        if (!_checkIndexInRange(index, game.cards)) {
            return;
        }
        game.cards[index].hide();
    }

    function openCard(index) {
        if (!_checkIndexInRange(index, game.cards)) {
            return;
        }
        game.cards[index].show();
    }

    function turnCard(index) {
        if (!_checkIndexInRange(index, game.cards)) {
            return;
        }
        game.cards[index].turn();
    }

    return game;
})();