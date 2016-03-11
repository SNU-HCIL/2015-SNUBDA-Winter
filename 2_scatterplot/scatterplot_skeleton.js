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
  
  // 여기서부터 코드 작성을 시작하세요.  

}
