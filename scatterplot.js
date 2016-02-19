function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(init);

function init() {
  d3.tsv('data/iris.tsv', function(error, data) {
    data.forEach(function(d) {
      d.length = parseFloat(d.length);
      d.width = parseFloat(d.width);
    });

    var svg = d3.select('svg');

    var width = 500, height = 500;
    var margin = {left: 50};

    var x = d3.scale.linear()
      .domain([
        d3.min(data, function(d){return d.width;}),
        d3.max(data, function(d){return d.width;})
      ])
      .range([margin.left, width + margin.left]);

    var y = d3.scale.linear()
      .domain([
        d3.min(data, function(d){return d.length;}),
        d3.max(data, function(d){return d.length;})
      ])
      .range([height, 0]);

    var color = d3.scale.ordinal()
      .domain(['setosa', 'versicolor', 'virginica'])
      .range(['#3366cc', '#dc3912', '#ff9900'])

    svg
      .selectAll('circle')
      .data(data)
        .enter()
          .append('circle')
          .attr('r', 3.5)
          .attr('cx', function(d) { return x(d.width); })
          .attr('cy', function(d) { return y(d.length); })
          .style('fill', function(d) { return color(d.species); })

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient('bottom');

    svg
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis)

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient('left');

    svg
      .append('g')
      .attr('class', 'y axis')
      .attr('transform', 'translate(' + margin.left + ', 0)')
      .call(yAxis)
  });
}
