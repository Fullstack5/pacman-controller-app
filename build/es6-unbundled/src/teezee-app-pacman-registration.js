define(["../node_modules/@polymer/polymer/polymer-element.js","../node_modules/@polymer/polymer/lib/elements/dom-if.js","../node_modules/@polymer/paper-checkbox/paper-checkbox.js","../node_modules/@polymer/iron-ajax/iron-ajax.js","../node_modules/@polymer/paper-input/paper-input.js","../node_modules/@polymer/paper-button/paper-button.js","../node_modules/@polymer/polymer/lib/utils/settings.js"],function(_polymerElement,_domIf,_paperCheckbox,_ironAjax,_paperInput,_paperButton,_settings){"use strict";class TeezeeAppPacmanRegistration extends _polymerElement.PolymerElement{static get properties(){return{gameId:{type:String,value:""}}}constructor(){super();(0,_settings.setPassiveTouchGestures)(!0)}ready(){super.ready();this.$.gameinput.focus()}_register(){let gameId=this.$.gameinput.value;if(gameId){this.dispatchEvent(new CustomEvent("registered",{detail:gameId,bubbles:!0,composed:!0}))}}_handleResponse(event){let gameId=event.detail.response.gameId;if(gameId){this.gameId=gameId}}static get template(){return _polymerElement.html`
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
        </div>`}}customElements.define("teezee-app-pacman-registration",TeezeeAppPacmanRegistration)});