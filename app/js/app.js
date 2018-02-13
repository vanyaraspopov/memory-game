'use strict';

(function () {
    const STATE_START = 'start';
    const STATE_PLAY = 'play';
    const STATE_END = 'end';

    var vm = new Vue({
        el: '#app',
        data: {
            state: STATE_PLAY
        },
        methods: {
            play: function () {
                this.state = STATE_PLAY;
            },
            replay: function() {
                this.state = STATE_START;
            }
        }
    });
})();