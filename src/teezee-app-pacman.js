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
import {setPassiveTouchGestures} from '@polymer/polymer/lib/utils/settings';
import './teezee-app-pacman-registration.js' ;
import '@polymer/iron-image/iron-image.js' ;

class TeezeeAppPacman extends PolymerElement {
    static get properties() {
        return {
            isRegistered: {
                type: Boolean,
                value: false,
            },
            loadComplete: {
                type: Boolean,
                value: false
            }
        };
    }

    constructor() {
        super();
        setPassiveTouchGestures(true);
    }

    ready() {
        super.ready();
        this.addEventListener('registered', this._registered);
    }

    _registered(gameId) {
        if (!this.loadComplete) {
            // See https://developers.google.com/web/updates/2017/11/dynamic-import
            import('./teezee-app-pacman-controls.js').then((TeezeeAppPacmanControls) => {
                this.gameId= gameId.detail;
                this.isRegistered = true;
            }).catch((reason) => {
                console.log("TeezeeAppPacmanControls failed to load", reason);
            });
            this.loadComplete = true;
        }
    }

    static get template() {
        // Template getter must return an instance of HTMLTemplateElement.
        // The html helper function makes this easy.
        return html`
        <style>
            #image {
                position: sticky;
                top: 0;
                background: #ddd;
                width: 100%;
                height: 100px;
                margin-top: 0px;
            }
        </style>

        <iron-image s></iron-image>
        <iron-image id="image" sizing="cover" src="/resources/images/header.jpeg"></iron-image>
        <template is="dom-if" if="[[!isRegistered]]">
            <teezee-app-pacman-registration></teezee-app-pacman-registration>
        </template>
        <template is="dom-if" if=[[isRegistered]]>
            <teezee-app-pacman-controls game-id="[[gameId]]"><p>lazy loading...</p></teezee-app-pacman-controls>
        </template>`;
    }
}

// Register the element with the browser.
customElements.define('teezee-app-pacman', TeezeeAppPacman);
