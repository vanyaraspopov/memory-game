'use strict';

var vm = (function (Game) {
    const STATE_START = 'start';
    const STATE_PLAY = 'play';
    const STATE_END = 'end';

    Game.init();

    var lockTimeout = 1000;

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
            , closeCard: function (index) {
                if (this.locked) return;
                Game.closeCard(index);
            }
            , openCard: function (index) {
                if (this.locked) return;
                Game.openCard(index);
                if (this.cardOpened) {
                    this.locked = true;
                    var self = this;
                    setTimeout(function () {
                        self.cardOpened = false;
                        self.locked = false;
                    }, lockTimeout);
                } else {
                    this.cardOpened = true;
                }
            }
            , play: function () {
                this.changeState(STATE_PLAY);
            }
            , replay: function () {
                this.changeState(STATE_START);
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