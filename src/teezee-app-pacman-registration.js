/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-if.js';
import '@polymer/paper-checkbox/paper-checkbox.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import {setPassiveTouchGestures} from '@polymer/polymer/lib/utils/settings';

class TeezeeAppPacmanRegistration extends PolymerElement {
    static get properties() {
        return {
            gameId: {
                type: String,
                value: ''
            }
        };
    }

    constructor() {
        super();
        setPassiveTouchGestures(true);
    }

    ready() {
        super.ready();
        this.$.gameinput.focus();
    }

    _register() {
        let gameId = this.$.gameinput.value;
        if (gameId) {
            this.dispatchEvent(new CustomEvent('registered', {
                detail: gameId,
                bubbles: true,
                composed: true
            }));
        }
    }

    _handleResponse(event) {
        let gameId = event.detail.response.gameId;
        if (gameId) {
            this.gameId = gameId;
        }
    }

    static get template() {
        return html`
      <style>
        #registration-wrapper {
            margin: 5px;
        }
       
        #game-id {
            border: 2px dashed red;
            margin: 10px;
            padding: 5px;
        }
        #gameinput {
            margin-bottom: 20px;
            --paper-input-container-focus-color: orange;
            --paper-input-container-input: {
            font-family: Optima, sans-serif;
            font-size: 24px;
            color: red;
        }
        --paper-input-container-label: {
            font-size: 20px;
            line-height: 2;
            color: gray;
        };
       }
       
        #submit {
            background-color: mediumpurple;
            padding: 15px;
        }
      </style>
      
      <iron-ajax
        auto
        method="GET"
        url="http://172.20.10.2:8085/register-game"
        handle-as="json"
        on-response="_handleResponse"
        debounce-duration="300">
       </iron-ajax>

        <div id="registration-wrapper">
        <h1>game id: <span id="game-id">[[gameId]]</span></h1>
        <paper-input id="gameinput" label="fill in the game id here"></paper-input>
        <paper-button id="submit" on-tap="_register">Submit</paper-button>
        </div>`;
    }
}

// Register the element with the browser.
customElements.define('teezee-app-pacman-registration', TeezeeAppPacmanRegistration);
