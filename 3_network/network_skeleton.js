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

  // 여기서부터 작성을 시작하세요.
}
