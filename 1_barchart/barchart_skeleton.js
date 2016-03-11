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

  // 여기서부터 코드를 작성하세요.
}
