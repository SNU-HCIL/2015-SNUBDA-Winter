function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(init);

function init() {

  var width = 960,
      height = 500;

  var color = d3.scale.category20();

  var svg = d3.select('svg')
      .attr('width', width)
      .attr('height', height);

  var force = d3.layout.force()
      .charge(-120)
      .linkDistance(30)
      .size([width, height]);

  var graph = data;

  force
      .nodes(graph.nodes)
      .links(graph.links)
      .start();

  var link = svg.selectAll('line')
      .data(graph.links)
    .enter().append('line')
      .style('stroke-width', 2);

  var node = svg.selectAll('circle')
      .data(graph.nodes)
    .enter()
      .append('circle')
      .attr('r', 5)
      .style('fill', function(d) { return color(d.group); })
      .call(force.drag);

  force.on('tick', function() {
    link.attr('x1', function(d) { return d.source.x; })
        .attr('y1', function(d) { return d.source.y; })
        .attr('x2', function(d) { return d.target.x; })
        .attr('y2', function(d) { return d.target.y; });

    node.attr('cx', function(d) { return d.x; })
        .attr('cy', function(d) { return d.y; });
  });
}
