function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(init);

function init() {
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
    

  var brush = d3.svg.brush()
    .x(x)
    .y(y)
    .on('brush', update)
    .on('brushend', update)

  svg
    .append('g')
    .attr('class', 'brush')
    .call(brush)

  function update(){
    var extent = brush.extent();
    var widthRange = [extent[0][0], extent[1][0]];
    var lengthRange = [extent[0][1], extent[1][1]];
    var widthSum = 0, lengthSum = 0, n = 0;
    
    svg
      .selectAll('circle')
      .style('opacity', 0.3)
      .filter(function(d){
        return widthRange[0] <= d.width && d.width <= widthRange[1] &&
         lengthRange[0] <= d.length && d.length <= lengthRange[1];
      })
      .style('opacity', 1)
      .each(function(d){
        n++;
        widthSum += d.width;
        lengthSum += d.length;
      })

    if(n > 0){
      d3.select('#mean-width').text(d3.format('.2f')(widthSum / n));    
      d3.select('#mean-length').text(d3.format('.2f')(lengthSum / n));    
    }
  }
}
