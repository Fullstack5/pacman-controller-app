define(["../node_modules/@polymer/polymer/polymer-element.js","../node_modules/@polymer/polymer/lib/elements/dom-if.js","../node_modules/@polymer/paper-checkbox/paper-checkbox.js","../node_modules/@polymer/polymer/lib/utils/settings.js","../node_modules/@polymer/paper-button/paper-button.js"],function(_polymerElement,_domIf,_paperCheckbox,_settings){"use strict";class TeezeeAppPacmanControls extends _polymerElement.PolymerElement{static get properties(){return{gameId:{type:String},direction:{type:String}}}constructor(){super();(0,_settings.setPassiveTouchGestures)(!0)}ready(){super.ready()}_changeDirection(event){let ajaxElement=this.$.post;this.direction=event.target.id.toUpperCase();this.postBody={direction:this.direction,gameId:this.gameId,type:"PACMAN"};ajaxElement.generateRequest()}static get template(){return _polymerElement.html`
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
</div>`}}customElements.define("teezee-app-pacman-controls",TeezeeAppPacmanControls)});