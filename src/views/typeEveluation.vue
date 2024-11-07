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
        <span class="timer">{{ String(timer).padStart(2, "0") }}</span> seconds
      </p>
    </div>
    <div class="result-container">
      <div class="resutl-container-title">
        <h3>Charactors</h3>
        <h3>Words</h3>
      </div>
      <div class="result-container-content">
        <div class="result-content">
          <p>correct {{ String(correctC).padStart(2, "0") }}</p>
          <p>incorrect {{ String(incorrectC).padStart(2, "0") }}</p>
        </div>
        <div class="result-content">
          <p>correct {{ String(correctW).padStart(2, "0") }}</p>
          <p>incorrect {{ String(incorrectW).padStart(2, "0") }}</p>
        </div>
      </div>
    </div>
    <hr class="ruler" />
    <p class="paragraph" id="abc">
      <span class="slct" v-html="completeText"></span>{{ paragraph.join("") }}
    </p>
    <div class="popup" v-show="popup">
      <div class="popup-message">
        <p class="info">Just type this shit & find your performance</p>
        <button class="popup-button" @click="focusOnEditor">LET'S START</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
import { onBeforeMount, onMounted, ref } from "vue";

onMounted(() => {
  document.getElementById("mainwindow").focus();
});

const paragraphL =
  "In Par1s, the s!ghts are endless. V1ewsof EiffelT7@wer, cafes%4filled with warm^breads, and7S$hops l!ned with chic+gems! You'll find F@ash!ons that sparkle, nights that$sh!mmer, and the S3ene rivers!de flowing so5<calmly. Explore streets l@ike Rue5Saint and wond9er @t5the art galler!es. Every m&oment br!ngs a nEw,_journey! Caf@es call<, art$grows, and mus!c f1lls the air. Walk the b@oad$R5des and see l!ght danc1ng on the old+facad3s. Here, love and h!story blend with e@very st3p taken, a tr!p to ch@rm the so3ul and br!ghten each dr~eam.";

const paragraph = ref(paragraphL.split(""));
const userInput = ref("");
const cursorPoint = ref(0); //cursor point of paragraph section
const completeText = ref(""); //typed charactors
const previoseCorrectness = ref(true); // correctness of the previose charactor
const wordCorrectness = ref(true); //status of the current word ( whether it's correct or not )

// results sheet
const correctC = ref(0);
const incorrectC = ref(0);
const correctW = ref(0);
const incorrectW = ref(0);

// timmer
const isTimmerRun = ref(false);
const timer = ref(0);

// focuse out popup
const popup = ref(false);

const prohibitedKeys = [
  "Backspace",
  "Tab",
  "Enter",
  "Shift",
  "Control",
  "Alt",
  "Pause",
  "CapsLock",
  "Escape",
  "PageUp",
  "PageDown",
  "End",
  "Home",
  "ArrowLeft",
  "ArrowUp",
  "ArrowRight",
  "ArrowDown",
  "PrintScreen",
  "Insert",
  "Delete",
  "Meta",
  "ContextMenu",
  "F1",
  "F2",
  "F3",
  "F4",
  "F5",
  "F6",
  "F7",
  "F8",
  "F9",
  "F10",
  "F11",
  "F12",
  "ScrollLock",
  "AudioVolumeMute",
  "AudioVolumeDown",
  "AudioVolumeUp",
  "LaunchMediaPlayer",
  "LaunchApplication1",
  "LaunchApplication2",
];

const checkSentence = () => {};

const wordCounter = ref({
  counter: 0,
  correct: true,
});

const checkWord = (userInput, paragraphInput) => {
  if (
    userInput === paragraphInput &&
    paragraphInput === " " &&
    wordCorrectness.value == true
  ) {
    correctW.value += 1;
  } else if (
    userInput === paragraphInput &&
    paragraphInput === " " &&
    wordCorrectness.value == false
  ) {
    wordCorrectness.value = true;
  } else if (
    userInput != paragraphInput &&
    paragraphInput != " " &&
    wordCorrectness.value == true
  ) {
    incorrectW.value += 1;
    wordCorrectness.value = false;
  } else if (userInput != paragraphInput && paragraphInput == " ") {
    wordCorrectness.value = true;
  }
};

const typing = (event) => {
  // prevent backspace and deletekey to remove text from user input
  if (event.key == "Backspace" || event.key == "Delete") {
    event.preventDefault();
  }

  // console.log(runTimer.value);
  // start timmer
  if (isTimmerRun.value === false) {
    isTimmerRun.value = true;
    startTimer();
  }

  // if event key is not prohibited, then
  else if (!prohibitedKeys.includes(event.key)) {
    checkWord(event.key, paragraph.value[cursorPoint.value]);
    // if previouse is correct and current is correct
    if (
      paragraph.value[cursorPoint.value] === event.key &&
      previoseCorrectness.value == true
    ) {
      let removeitem = paragraph.value.shift();
      completeText.value += removeitem;
      correctC.value += 1;
    }
    // else previose is incorect, but this is correct
    else if (
      paragraph.value[cursorPoint.value] === event.key &&
      previoseCorrectness.value === false
    ) {
      previoseCorrectness.value = true;
      let removeitem = paragraph.value.shift();
      completeText.value += removeitem;
      correctC.value += 1;
    }
    // else previose is correct, but this is incorect
    else if (
      paragraph.value[cursorPoint.value] !== event.key &&
      previoseCorrectness.value === true
    ) {
      let removeitem = paragraph.value.shift();
      completeText.value += '<span class= "error">' + removeitem + "</span>";
      previoseCorrectness.value = false;
      incorrectC.value += 1;
    }
    // else previose and this is also incorect
    else if (
      paragraph.value[cursorPoint.value] !== event.key &&
      previoseCorrectness.value == false
    ) {
      let removeitem = paragraph.value.shift();
      completeText.value = completeText.value.slice(0, -7);
      completeText.value += removeitem + "</span>";
      incorrectC.value += 1;
    }
  }
};

const startTimer = () => {
  setInterval(() => {
    if (timer.value === 300 || popup.value === true) {
      clearInterval(startTimer);
    }
    timer.value++;
  }, 1000);
};

const showPopup = () => {
  popup.value = true;
};

const focusOnEditor = () => {
  document.getElementById("mainwindow").focus();
  popup.value = false;
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
