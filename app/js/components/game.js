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


    //  Properties
    var score = 0;
    var cards = [];


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
     * Initializes game
     */
    (function _init() {
        var pairsCount = 9;
        var deck = _createDeck();
        cards = _getRandomPairs(pairsCount, deck);
        _shuffle(cards);
    })();

    /**
     * Just shuffles cards in array of cards.
     * @param cards
     */
    function _shuffle(cards) {
        function compareRandom(a, b) {
            return Math.random() - 0.5;
        }

        cards.sort(compareRandom);
    }


    //  Public methods

    function closeCard(index) {
        if (index < 0 || index > cards.length - 1) {
            console.log('Index out of range');
        }
        cards[index].hide();
    }

    function openCard(index) {
        if (index < 0 || index > cards.length - 1) {
            console.log('Index out of range');
        }
        cards[index].show();
    }

    function turnCard(index) {
        if (index < 0 || index > cards.length - 1) {
            console.log('Index out of range');
        }
        cards[index].turn();
    }



    return {
        cards: cards
        ,score: score

        //,createDeck: _createDeck
        //,getRandomPairs: _getRandomPairs
        //,shuffle: _shuffle

        ,closeCard: closeCard
        ,openCard: openCard
        ,turnCard: turnCard
    };
})();