'use strict';

import Game from './components/game/game';
import Vue from '../../node_modules/vue/dist/vue.min';

//  view model
let vm = (function (Game) {
    const STATE_START = 'start';
    const STATE_PLAY = 'play';
    const STATE_END = 'end';

    Game.init();

    let lockTimeout = 1000;
    let timeouts = [];

    let vm = new Vue({
        el: '#app',
        data () {
            return {
                cardOpened: false
                , cards: Game.cards
                , locked: false     //  locking player actions in view model
                , score: Game.score
                , state: STATE_START
            }
        },
        methods: {
            changeState (state) {
                this.state = state;
            }
            , clearTimeouts () {
                for (let i = 0; i < timeouts.length; i++) {
                    clearTimeout(timeouts[i]);
                }
                timeouts = [];
            }
            , closeCard (index) {
                /*if (this.locked) return;
                 this.cardOpened = false;
                 Game.closeCard(index);*/
            }
            , openCard (index) {
                if (this.locked) return;
                Game.openCard(index);
                if (this.cardOpened) {
                    this.lock(lockTimeout);
                    this.cardOpened = false;
                } else {
                    this.cardOpened = true;
                }
            }
            , lock (timeout) {
                if (timeout === undefined) timeout = lockTimeout;
                this.locked = true;
                let self = this;
                timeouts.push(setTimeout(function () {
                    self.locked = false;
                }, timeout));
            }
            , play () {
                Game.showAll();
                this.changeState(STATE_PLAY);
                let timeout = 5000;
                this.lock(timeout);
                timeouts.push(setTimeout(function () {
                    Game.turnDownAll();
                }, timeout));
            }
            , replay () {
                this.changeState(STATE_START);
                this.clearTimeouts();
                Game.reset();
            }
            , updateViewModel () {
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