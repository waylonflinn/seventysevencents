'use strict';

var window = require("global/window"),
	document = require('global/document'),
	hg = require('mercury'),
	h = require('mercury').h;

function nextStep(state){
	console.log("clicked");
	state.step.set(state.step() + 1);
}

function App(){
	return hg.state({
		step : hg.value(0),
		channels : {
			clicks : nextStep
		}
	});
}


App.render = function render(state){

	if(state.step === 0) {
		return h("button", {'id': 'start', 'className' : 'button', 'ev-click': hg.send(state.channels.clicks)}, "Explore");
	}
	else if(state.step === 1){
		return h("div", {'className' : 'chart'});
	}
	else {
		return "";
	}
}

var state = App();

// DOM interaction
window.SSC = {};
window.SSC.state = state;
window.SSC.hg = hg;


hg.app(document.body.querySelector("#chart-container"), state, App.render);
