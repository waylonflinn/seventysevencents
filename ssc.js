'use strict';

var window = require("global/window"),
	document = require('global/document'),
	hg = require('mercury'),
	h = require('mercury').h,
	chart0 = require('./chart0.js');
// https://github.com/trueadm/t7

var chart = new chart0("#chart");

function nextStep(state){
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


App.renderChart = function renderChart(state){

	if(state.step === 0) {
		return h("div");
	}
	else if(state.step === 1){
		return h("div", {'className' : 'chart'});
	}
	else {
		return h("div");
	}
}

App.renderText = function renderText(state){

	var contents =  [
		h("h1", {'id': 'title', 'className' : 'hero-heading'},
		[
			h("strong", "SEVENTY"),
			h("span", "SEVEN"),
			h("strong", "CENTS")
		]),
		h("p", ["Seventy seven cents per dollar is often cited as the gender based wage gap in America. This site empowers you to explore the data",
			h("sup", "1"),
			" for yourself."])
	];

	if(state.step === 0) {
		contents.push(h("button", {'id': 'start', 'className' : 'button', 'ev-click': hg.send(state.channels.clicks)}, "Explore"));
		return h("div", contents);
	}
	else if(state.step === 1){
		return h("div", contents);
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


hg.app(document.body.querySelector("#text-container"), state, App.renderText);
//hg.app(document.body.querySelector("#chart-container"), state, App.renderChart);
chart.show();
