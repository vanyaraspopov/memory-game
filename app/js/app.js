'use strict';

var vm = (function (Game) {
    const STATE_START = 'start';
    const STATE_PLAY = 'play';
    const STATE_END = 'end';

    Game.init();

    var vm = new Vue({
        el: '#app',
        data: function () {
            return {
                cards: Game.cards
                , score: Game.score
                , state: STATE_START
            }
        },
        methods: {
            changeState: function (state) {
                this.state = state;
            }
            , closeCard: function (index) {
                Game.closeCard(index);
            }
            , openCard: function (index) {
                Game.openCard(index);
            }
            , turnCard: function (index) {
                Game.turnCard(index);
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