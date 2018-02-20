'use strict';

var Card = function (rank, suit) {
    this.rank = rank;
    this.suit = suit;
    this.opened = false;
    this.hidden = false;
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
    this.hidden = true;
};
Card.prototype.show = function () {
    this.opened = true;
};
Card.prototype.turn = function () {
    this.opened ^= true;
};
Card.prototype.turnDown = function () {
    this.opened = false;
};
Card.prototype.toString = function () {
    return this.rank + this.suit + ' ' + (this.opened ? 'opened' : 'closed');
};

module.exports = Card;