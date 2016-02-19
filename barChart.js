function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(init);

function init() {
  var data = [
    {"name":"Sally", "value":5},
    {"name":"Tom", "value":10},
    {"name":"John", "value":7.5}
  ];

  var svg = d3.select('svg');

  svg
    .selectAll('rect')
    .data(data)
    .enter()
      .append('rect')
      .attr('width', function(d, i){
        return d.value * 10;
      })
      .attr('height', 20)
      .style('fill', 'steelblue')
      .attr('transform', function(d, i){
        return 'translate(0,' + i * 30 + ')';
      });
}
