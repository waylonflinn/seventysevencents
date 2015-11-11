//var d3 = require('d3');

// #chart
function Chart(selector){

		var self = this;
		this.BAR_WIDTH = 30;
		this.MAX_HEIGHT = 300;
		this.MARGIN = 30;
		this.OUTER_MARGIN = 50;

		var data = [
			{"label": "women", "value": 77 },
			{"label": "men", "value": 100}
		];

		// scale
		this.y = d3.scale.linear()
			.domain([0, d3.max(data, function(d){ return d.value; })])
			.range([0, this.MAX_HEIGHT]);
		this.x_min = d3.scale.ordinal()
			.rangeRoundBands([0, 0], .1);
		this.x = d3.scale.ordinal()
			.rangeRoundBands([0, 2 * this.OUTER_MARGIN + 2 * this.BAR_WIDTH + this.MARGIN], .1);

		// axis
		this.xAxis = d3.svg.axis()
			.scale(this.x)
			.orient("bottom")
			.outerTickSize(0);
		this.xMinAxis = d3.svg.axis()
			.scale(this.x_min)
			.orient("bottom")
			.outerTickSize(0);

		this.chart = d3.select(selector);

		this.bar = this.chart.selectAll("g")
				.data(data)
			.enter().append("g")
				.attr("transform", function(d, i){ return "translate(" + (self.OUTER_MARGIN + i * (self.BAR_WIDTH + self.MARGIN)) + "," + 0 + ")";  });

}


Chart.prototype.show = function(){

	var self = this;

	// start axis animation
	this.chart.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + this.MAX_HEIGHT + ")")
		.call(this.xMinAxis)
		.transition()
		.duration(800)
		.call(this.xAxis)
		.each("end", function(){

			// on end, start bar animation
			self.bar.append("rect")
					.on("mouseover", function(d) {
					  d3.select(this).style("fill", "#508bB8");
					})
					.on("mouseout", function(d) {
					  d3.select(this).style("fill", "#4682B4");
					})
					.attr("width", self.BAR_WIDTH)
					.attr("y", self.MAX_HEIGHT)
					.attr("height", 0)
					.transition()
					.attr("height", function(d){ return self.y(d.value); })
					.attr("y", function(d){ return self.MAX_HEIGHT - self.y(d.value); })
					.duration(1000);
		})
}

module.exports = Chart;
