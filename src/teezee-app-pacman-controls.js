/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

// Import statements in Polymer 3.0 can now use package names.
// polymer-element.js now exports PolymerElement instead of Element,
// so no need to change the symbol.
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-if.js';
import '@polymer/paper-checkbox/paper-checkbox.js';
import {setPassiveTouchGestures} from '@polymer/polymer/lib/utils/settings';
import '@polymer/paper-button/paper-button.js';

class TeezeeAppPacmanControls extends PolymerElement {
    static get properties() {
        return {
            gameId: {
                type: String,
            },
            direction: {
                type: String
            }
        };
    }

    constructor() {
        super();
        setPassiveTouchGestures(true);
    }

    ready() {
        super.ready();
    }

    _changeDirection(event) {
        let ajaxElement = this.$.post;
        this.direction = event.target.id.toUpperCase();
        this.postBody = {"direction": this.direction, "gameId":this.gameId, "type": "PACMAN"};
        ajaxElement.generateRequest();
    }

    static get template() {
        return html`
      <style>
        #frame {
            display: flex;
            justify-content: center;
            position: absolute;
            left: 50%;
            top: 50%;
            width: 375px;
            transform: translate(-50%, -50%);
            height: 375px;
            line-height: 2;
            background-image: url("/resources/images/controls.png");
            background-repeat: no-repeat;
            background-color: white;
            background-size: 100% 100%;
            z-index: -1;
        }
       
        #button-wrapper {
            display: flex;
            justify-content: center;
        }
       
        #north {
            position: absolute;
            width: 125px;
            height: 125px;
        }
          
        #south {
            position: absolute;
            width: 125px;
            height: 125px;
            bottom: 0;
        }
       
        #west {
            width: 125px;
            height: 125px;
            display: flex;
            justify-content: center;
            position: absolute;
            transform: translate(-50%, -50%);
            line-height: 2;
            left: 20%;
            top: 50%;
            
        }
        #east {
            width: 125px;
            height: 125px;
            display: flex;
            justify-content: center;
            position: absolute;
            left: 80%;
            top: 50%;
            transform: translate(-50%, -50%);
            line-height: 2;
        }
      </style>
      
      <iron-ajax
        id="post"
        url="http://172.20.10.2:8085/perform-move"
        body="[[postBody]]"
        content-type="application/json"
        method="POST"
        handle-as="json">
       </iron-ajax>

    <div id="frame">
        <paper-button id="west" on-tap="_changeDirection"></paper-button>
        <paper-button id="east" on-tap="_changeDirection"></paper-button>
        <div id="button-wrapper">
            <paper-button id="north" on-tap="_changeDirection"></paper-button>
            <paper-button id="south" on-tap="_changeDirection"></paper-button>
        </div>
    </div>
</div>`;
    }
}

// Register the element with the browser.
customElements.define('teezee-app-pacman-controls', TeezeeAppPacmanControls);
