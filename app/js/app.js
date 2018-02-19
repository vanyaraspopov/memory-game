'use strict';

var vm = (function (Game) {
    const STATE_START = 'start';
    const STATE_PLAY = 'play';
    const STATE_END = 'end';

    Game.init();

    var lockTimeout = 1000;

    var timeouts = [];
    var vm = new Vue({
        el: '#app',
        data: function () {
            return {
                cardOpened: false
                , cards: Game.cards
                , locked: false     //  locking player actions in view model
                , score: Game.score
                , state: STATE_START
            }
        },
        methods: {
            changeState: function (state) {
                this.state = state;
            }
            , clearTimeouts: function () {
                for (var i = 0; i < timeouts.length; i++) {
                    clearTimeout(timeouts[i]);
                }
                timeouts = [];
            }
            , closeCard: function (index) {
                if (this.locked) return;
                this.cardOpened = false;
                Game.closeCard(index);
            }
            , openCard: function (index) {
                if (this.locked) return;
                Game.openCard(index);
                if (this.cardOpened) {
                    this.lock(lockTimeout);
                    this.cardOpened = false;
                } else {
                    this.cardOpened = true;
                }
            }
            , lock: function (timeout) {
                if (timeout === undefined) timeout = lockTimeout;
                this.locked = true;
                var self = this;
                timeouts.push(setTimeout(function () {
                    self.locked = false;
                }, timeout));
            }
            , play: function () {
                Game.showAll();
                this.changeState(STATE_PLAY);
                var timeout = 5000;
                this.lock(timeout);
                timeouts.push(setTimeout(function () {
                    Game.turnDownAll();
                }, timeout));
            }
            , replay: function () {
                this.changeState(STATE_START);
                this.clearTimeouts();
                Game.reset();
            }
            , updateViewModel: function () {
                Vue.set(this, 'cards', Game.cards);
                Vue.set(this, 'score', Game.score);
                if (Game.completed) {
                    this.changeState(STATE_END);
                }
            }
        }
    });
    setInterval(function () {
        vm.updateViewModel();
    }, 100);
    return vm;
})(Game);