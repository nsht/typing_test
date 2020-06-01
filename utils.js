const test = [
  "Call me Ishmael. Some years ago never mind how long precisely having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world. It is a way I have of driving off the spleen and regulating the circulation.",
  "Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off then, I account it high time to get to sea as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the ship. There is nothing surprising in this.",
  "If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the ocean with me. "
];

document.addEventListener("DOMContentLoaded", function(event) {
  const test_area = document.getElementsByClassName("test_area")[0];
  const error_div = document.getElementById("errors");
  const wpm_div = document.getElementById("wpm");

  var test_no = 0;
  var user_input = [];
  errors = 0;
  var startTime, currentTime;
  let wpm_list = [];

  error_div.innerHTML = "Errors : 0";
  wpm_div.innerHTML = "WPM : 0";

  for (let i in test[test_no].split("")) {
    var span = document.createElement("span");
    span.id = `word_${i}`;
    span.innerHTML = `<span>${test[test_no][i]}</span>`;
    test_area.appendChild(span);
  }

  document.onkeypress = function(e) {
    e = e || window.event;
    let key = String.fromCharCode(e.keyCode);

    if (user_input.length === 0) {
      startTime = new Date();
    }

    if (key === test[test_no][user_input.length]) {
      currentTime = new Date();
      // time taken in seconds
      let diff = Math.round((currentTime - startTime) / 1000);
      // lenght of the input divided by time take * avg word size
      let wpm = Math.round((user_input.length / diff) * 5);
      if (isFinite(wpm)) {
        wpm_div.innerHTML = `WPM : ${wpm}`;
      }
      document
        .getElementById(`word_${user_input.length}`)
        .classList.add("correct");
      user_input.push(key);
    } else {
      errors += 1;
      error_div.innerHTML = `Errors : ${errors}`;
      document
        .getElementById(`word_${user_input.length}`)
        .classList.add("wrong");
    }
    if (user_input.length === test[test_no].length) {
      test_no += 1;
      user_input = [];
      wpm_list.push(wpm);
      set_test(test_no);
    }
  };
});

function set_test(test_number) {
  const test_area = document.getElementsByClassName("test_area")[0];
  test_area.innerHTML = "";
  for (let i in test[test_number].split("")) {
    var span = document.createElement("span");
    span.id = `word_${i}`;
    span.innerHTML = `<span>${test[test_number][i]}</span>`;
    test_area.appendChild(span);
  }
}
