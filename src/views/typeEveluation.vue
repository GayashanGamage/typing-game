<template>
  <div
    class="level-one-container"
    @keydown="typing"
    tabindex="0"
    @focusout="showPopup"
    id="mainwindow"
  >
    <div class="timer-container">
      <p>
        <span class="timer">{{
          String(eveluationStore.timer).padStart(2, "0")
        }}</span>
        seconds
      </p>
    </div>
    <div class="result-container">
      <div class="resutl-container-title">
        <h3>Charactors</h3>
        <h3>Words</h3>
      </div>
      <div class="result-container-content">
        <div class="result-content">
          <p>correct {{ String(eveluationStore.correctC).padStart(2, "0") }}</p>
          <p>
            incorrect {{ String(eveluationStore.incorrectC).padStart(2, "0") }}
          </p>
        </div>
        <div class="result-content">
          <p>correct {{ String(eveluationStore.correctW).padStart(2, "0") }}</p>
          <p>
            incorrect {{ String(eveluationStore.incorrectW).padStart(2, "0") }}
          </p>
        </div>
      </div>
    </div>
    <hr class="ruler" />
    <p class="paragraph" id="abc">
      <span class="slct" v-html="eveluationStore.completeText"></span
      >{{ eveluationStore.paragraph.join("") }}
    </p>
    <div class="popup" v-show="eveluationStore.popup">
      <div class="popup-message">
        <p class="info">Just type this shit & find your performance</p>
        <button class="popup-button" @click="focusOnEditor">LET'S START</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useEveluationStore } from "@/stores/eveluation";
import { onMounted, ref } from "vue";

const eveluationStore = useEveluationStore();

onMounted(() => {
  document.getElementById("mainwindow").focus();
});

const checkWord = (userInput, paragraphInput) => {
  if (
    userInput === paragraphInput &&
    paragraphInput === " " &&
    eveluationStore.wordCorrectness == true
  ) {
    eveluationStore.correctW += 1;
  } else if (
    userInput === paragraphInput &&
    paragraphInput === " " &&
    eveluationStore.wordCorrectness == false
  ) {
    eveluationStore.wordCorrectness = true;
  } else if (
    userInput != paragraphInput &&
    paragraphInput != " " &&
    eveluationStore.wordCorrectness == true
  ) {
    eveluationStore.incorrectW += 1;
    eveluationStore.wordCorrectness = false;
  } else if (userInput != paragraphInput && paragraphInput == " ") {
    eveluationStore.wordCorrectness = true;
  }
};

const typing = (event) => {
  // prevent backspace and deletekey to remove text from user input
  if (event.key == "Backspace" || event.key == "Delete") {
    event.preventDefault();
  }

  // console.log(runTimer.value);
  // start timmer
  if (eveluationStore.isTimmerRun === false) {
    eveluationStore.isTimmerRun = true;
    startTimer();
  }

  // if event key is not prohibited, then
  else if (!eveluationStore.prohibitedKeys.includes(event.key)) {
    checkWord(
      event.key,
      eveluationStore.paragraph[eveluationStore.cursorPoint]
    );
    // if previouse is correct and current is correct
    if (
      eveluationStore.paragraph[eveluationStore.cursorPoint] === event.key &&
      eveluationStore.previoseCorrectness == true
    ) {
      let removeitem = eveluationStore.paragraph.shift();
      eveluationStore.completeText += removeitem;
      eveluationStore.correctC += 1;
    }
    // else previose is incorect, but this is correct
    else if (
      eveluationStore.paragraph[eveluationStore.cursorPoint] === event.key &&
      eveluationStore.previoseCorrectness === false
    ) {
      eveluationStore.previoseCorrectness = true;
      let removeitem = eveluationStore.paragraph.shift();
      eveluationStore.completeText += removeitem;
      eveluationStore.correctC += 1;
    }
    // else previose is correct, but this is incorect
    else if (
      eveluationStore.paragraph[eveluationStore.cursorPoint] !== event.key &&
      eveluationStore.previoseCorrectness === true
    ) {
      let removeitem = eveluationStore.paragraph.shift();
      eveluationStore.completeText +=
        '<span class= "error">' + removeitem + "</span>";
      eveluationStore.previoseCorrectness = false;
      eveluationStore.incorrectC += 1;
    }
    // else previose and this is also incorect
    else if (
      eveluationStore.paragraph[eveluationStore.cursorPoint] !== event.key &&
      eveluationStore.previoseCorrectness == false
    ) {
      let removeitem = eveluationStore.paragraph.shift();
      eveluationStore.completeText = eveluationStore.completeText.slice(0, -7);
      eveluationStore.completeText += removeitem + "</span>";
      eveluationStore.incorrectC += 1;
    }
  }
};

const startTimer = () => {
  setInterval(() => {
    if (eveluationStore.timer === 300 || eveluationStore.popup === true) {
      clearInterval(startTimer);
    }
    eveluationStore.timer++;
  }, 1000);
};

const showPopup = () => {
  eveluationStore.popup = true;
};

const focusOnEditor = () => {
  document.getElementById("mainwindow").focus();
  eveluationStore.popup = false;
};
</script>

<style scoped>
.level-one-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.paragraph {
  font-family: "Roboto Mono", monospace;
  font-size: 25px;
  width: 700px;
  user-select: none;
}
.userInput {
  width: 675px;
  font-family: "Roboto Mono", monospace;
  font-size: 25px;
  outline: none;
  padding: 10px;
  /* display: none; */
  visibility: hidden;
}
.result-container {
  width: 700px;
  display: flex;
  flex-direction: column;
}
.resutl-container-title {
  display: flex;
  justify-content: space-around;
  font-family: "Roboto Mono", serif;
  font-weight: 600;
}
.result-container-content {
  display: flex;
  justify-content: space-around;
  font-family: "Roboto Mono", serif;
}
.ruler {
  width: 700px;
}
.timer-container {
  font-family: "Roboto Mono", serif;
  width: 700px;
}
.timer {
  font-size: 25px;
  font-family: "Roboto Mono", serif;
  font-weight: 900;
  background-color: black;
  color: white;
  padding: 10px;
  border-radius: 50px;
}
.popup {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}
.popup-message {
  width: 500px;
  height: 250px;
  background-color: aliceblue;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.info {
  font-family: "Roboto Mono", serif;
  font-size: 24px;
  font-weight: 900;
  text-align: center;
}
.popup-button {
  font-family: "Roboto Mono", serif;
  font-weight: 900;
  font-size: 20px;
  width: fit-content;
  height: fit-content;
  padding: 5px 20px;
  color: aliceblue;
  background-color: black;
  border-radius: 4px;
  border: 0px;
}
.popup-button:hover {
  background-color: aliceblue;
  color: black;
  border: 3px solid black;
}
</style>

<style>
.error {
  border-radius: 6px;
  color: #f95454;
}
.slct {
  font-weight: 600;
  background-color: rgba(53, 204, 108, 0.6);
  border-radius: 4px;
}
</style>
