define(["require","../node_modules/@polymer/polymer/polymer-element.js","../node_modules/@polymer/polymer/lib/elements/dom-if.js","../node_modules/@polymer/paper-checkbox/paper-checkbox.js","../node_modules/@polymer/polymer/lib/utils/settings.js","./teezee-app-pacman-registration.js","../node_modules/@polymer/iron-image/iron-image.js"],function(_require,_polymerElement,_domIf,_paperCheckbox,_settings){"use strict";_require=babelHelpers.interopRequireWildcard(_require);class TeezeeAppPacman extends _polymerElement.PolymerElement{static get properties(){return{isRegistered:{type:Boolean,value:!1},loadComplete:{type:Boolean,value:!1}}}constructor(){super();(0,_settings.setPassiveTouchGestures)(!0)}ready(){super.ready();this.addEventListener("registered",this._registered)}_registered(gameId){if(!this.loadComplete){new Promise((res,rej)=>_require.default(["./teezee-app-pacman-controls.js"],res,rej)).then(()=>{this.gameId=gameId.detail;this.isRegistered=!0}).catch(reason=>{console.log("TeezeeAppPacmanControls failed to load",reason)});this.loadComplete=!0}}static get template(){return _polymerElement.html`
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
        </template>`}}customElements.define("teezee-app-pacman",TeezeeAppPacman)});