'use strict';

(function (Game) {
    const STATE_START = 'start';
    const STATE_PLAY = 'play';
    const STATE_END = 'end';

    Game.init();

    var vm = new Vue({
        el: '#app',
        data: {
            cards: Game.cards
            ,score: Game.score
            ,state: STATE_START
        },
        methods: {
            closeCard: function (index) {
                Game.closeCard(index);
            }
            ,openCard: function (index) {
                Game.openCard(index);
            }
            ,turnCard: function (index) {
                Game.turnCard(index);
            }
            ,play: function () {
                this.state = STATE_PLAY;
            }
            ,replay: function () {
                this.state = STATE_START;
                this.score = 0;
            }
        }
    });
})(Game);