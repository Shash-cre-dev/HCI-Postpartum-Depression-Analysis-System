function feature() {
  window.open("features.html", "_blank");
}
function About() {
  window.open("about.html", "_blank");
}

let circles = document.querySelectorAll(".circle"),
  progressBar = document.querySelector(".indicator");
let prevBtn = document.getElementById("prev");
let nextBtn = document.getElementById("next");
let nextBtn1 = document.getElementById("next1");
let currentStep = 1;
let totalScore = 0;

nextBtn.addEventListener("click", function () {
  currentStep++;
  checkFun();
  console.log(currentStep);
});
prevBtn.addEventListener("click", function () {
  currentStep--;
  nextBtn.disabled = false;
  circles.forEach((circle, index) => {
    circle.classList[`${index < currentStep ? "add" : "remove"}`]("active");
  });
  progressBar.style.width = `${
    ((currentStep - 1) / (circles.length - 1)) * 100
  }%`;
  if (currentStep == 1) {
    prevBtn.disabled = true;
    totalScore = 0;
  }
  console.log(currentStep);
});
var currentDivIndex = 0;
showDiv(currentDivIndex);

function changeDiv(direction) {
  showDiv((currentDivIndex += direction));
}

function showDiv(index) {
  var divs = document.getElementsByClassName("content1");

  if (index >= divs.length) {
    currentDivIndex = 0;
  }

  if (index < 0) {
    currentDivIndex = divs.length - 1;
  }

  for (var i = 0; i < divs.length; i++) {
    divs[i].classList.remove("active1");
  }

  divs[currentDivIndex].classList.add("active1");
}
function checkFun() {
  if (currentStep == 2) {
    submitAnswer();
  }
  if (currentStep == 3) {
    changeDiv(1);
    prevBtn.disabled = false;

    circles.forEach((circle, index) => {
      circle.classList[`${index < currentStep ? "add" : "remove"}`]("active");
    });
    if (currentStep <= 3) {
      progressBar.style.width = `${
        ((currentStep - 1) / (circles.length - 1)) * 100
      }%`;
    }
    if (currentStep >= 3) {
      nextBtn.disabled = true;
    }
    let circularProgress = document.querySelector(".circular-progress"),
      progressValue = document.querySelector(".progress-value");

    let progressStartValue = 0,
      progressEndValue = totalScore,
      speed = 20;

    let progress = setInterval(() => {
      progressStartValue++;

      progressValue.textContent = `${progressEndValue}`;
      circularProgress.style.background = `conic-gradient(#12372a ${
        progressStartValue * 12
      }deg, #ededed 0deg)`;

      if (progressStartValue == progressEndValue) {
        clearInterval(progress);
      }
    }, speed);
    console.log(totalScore);
    document.getElementById("text").innerHTML = `${totalScore}/30`;
    if (totalScore > 0 && totalScore < 10) {
      document.getElementById("result").innerHTML =
        "Your result shows you are depressed";
    } else if (totalScore >= 10 && totalScore < 20) {
      document.getElementById("result").innerHTML =
        "Your result shows you can be pre-depressed so consult doctor";
    } else if (totalScore >= 20) {
      document.getElementById("result").innerHTML =
        "Your result shows you are perfect";
    }
  }
}
function submitAnswer() {
  var selectedOption = getSelectedOption("q1");
  var selectedOption1 = getSelectedOption("q2");
  var selectedOption2 = getSelectedOption("q3");
  var selectedOption3 = getSelectedOption("q4");
  var selectedOption4 = getSelectedOption("q5");
  var selectedOption5 = getSelectedOption("q6");
  var selectedOption6 = getSelectedOption("q7");
  var selectedOption7 = getSelectedOption("q8");
  var selectedOption8 = getSelectedOption("q9");
  var selectedOption9 = getSelectedOption("q10");
  if (
    selectedOption &&
    selectedOption1 &&
    selectedOption2 &&
    selectedOption3 &&
    selectedOption4 &&
    selectedOption5 &&
    selectedOption6 &&
    selectedOption7 &&
    selectedOption8 &&
    selectedOption9
  ) {
    if (selectedOption == "AS MUCH AS I ALWAYS COULD") {
      totalScore += 3;
    } else if (selectedOption == "NOT QUITE SO MUCH NOW") {
      totalScore += 2;
    } else if (selectedOption == "DEFINITELY NOT SO MUCH NOW") {
      totalScore += 1;
    } else if (selectedOption == "NOT AT ALL") {
      totalScore = 0;
    }

    if (selectedOption1 == "AS MUCH AS I EVER DID") {
      totalScore += 3;
    } else if (selectedOption1 == "RATHER LESS THAN I USED TO") {
      totalScore += 2;
    } else if (selectedOption1 == "DEFINITELY LESS THAN I USED TO") {
      totalScore += 1;
    } else if (selectedOption1 == "HARDLY AT ALL") {
      totalScore = 0;
    }

    if (selectedOption2 == "YES, MOST OF THE TIME") {
      totalScore += 3;
    } else if (selectedOption2 == "YES, SOME OF THE TIME") {
      totalScore += 2;
    } else if (selectedOption2 == "NOT VERY OFTEN") {
      totalScore += 1;
    } else if (selectedOption2 == "NO, NEVER") {
      totalScore += 0;
    }

    if (selectedOption3 == "NO, NOT AT ALL") {
      totalScore += 3;
    } else if (selectedOption3 == "HARDLY EVER") {
      totalScore += 2;
    } else if (selectedOption3 == "YES, SOMETIMES") {
      totalScore += 1;
    } else if (selectedOption3 == "YES, VERY OFTEN") {
      totalScore += 0;
    }

    if (selectedOption4 == "YES, QUITE A LOT") {
      totalScore += 3;
    } else if (selectedOption4 == " YES, SOMETIMES") {
      totalScore += 2;
    } else if (selectedOption4 == "NO, NOT MUCH") {
      totalScore += 1;
    } else if (selectedOption4 == "NO, NOT AT ALL") {
      totalScore += 0;
    }

    if (
      selectedOption5 ==
      "YES, MOST OF THE TIME I HAVEN'T BEEN ABLE TO COPE AT ALL"
    ) {
      totalScore += 3;
    } else if (
      selectedOption5 == "YES, SOMETIMES I HAVEN'T BEEN COPING AS WELL AS USUAL"
    ) {
      totalScore += 2;
    } else if (
      selectedOption5 == " NO, MOST OF THE TIME I HAVE COPED QUITE WELL"
    ) {
      totalScore += 1;
    } else if (selectedOption5 == "NO, I HAVE BEEN COPING AS WELL AS EVER") {
      totalScore += 0;
    }

    if (selectedOption6 == "YES, MOST OF THE TIME") {
      totalScore += 3;
    } else if (selectedOption6 == "YES, SOMETIMES") {
      totalScore += 2;
    } else if (selectedOption6 == "  NOT VERY OFTEN") {
      totalScore += 1;
    } else if (selectedOption6 == "NO, NOT AT ALL") {
      totalScore += 0;
    }

    if (selectedOption7 == "YES, MOST OF THE TIME") {
      totalScore += 3;
    } else if (selectedOption7 == "YES, QUITE OFTEN") {
      totalScore += 2;
    } else if (selectedOption7 == " NOT VERY OFTEN") {
      totalScore += 1;
    } else if (selectedOption7 == "NO, NOT AT ALL") {
      totalScore += 0;
    }

    if (selectedOption8 == "YES, MOST OF THE TIME") {
      totalScore += 3;
    } else if (selectedOption8 == " YES, QUITE OFTEN") {
      totalScore += 2;
    } else if (selectedOption8 == "ONLY OCCASIONALLY") {
      totalScore += 1;
    } else if (selectedOption8 == "NO, NEVER") {
      totalScore += 0;
    }

    if (selectedOption9 == "YES, QUITE OFTEN") {
      totalScore += 3;
    } else if (selectedOption9 == " SOMETIMES") {
      totalScore += 2;
    } else if (selectedOption9 == "HARDLY EVER") {
      totalScore += 1;
    } else if (selectedOption9 == "NEVER") {
      totalScore += 0;
    }

    changeDiv(1);

    prevBtn.disabled = false;

    circles.forEach((circle, index) => {
      circle.classList[`${index < currentStep ? "add" : "remove"}`]("active");
    });
    if (currentStep <= 3) {
      progressBar.style.width = `${
        ((currentStep - 1) / (circles.length - 1)) * 100
      }%`;
    }
    if (currentStep >= 3) {
      nextBtn.disabled = true;
    }
    // You can process the selected option as needed (e.g., store in a variable, send to a server, etc.)
  } else {
    alert("Please select an option before submitting.");
    currentStep = 1;
  }
}

function getSelectedOption(questionName) {
  var options = document.getElementsByName(questionName);

  for (var i = 0; i < options.length; i++) {
    if (options[i].checked) {
      return options[i].value;
    }
  }

  return null; // No option selected
}
