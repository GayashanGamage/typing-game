<template>
  <div class="level-one-container">
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
    <input
      id="inputBox"
      type="text"
      class="userInput"
      @keydown="typing"
      @click="changeCursor"
      v-model="userInput"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const paragraphL =
  "The sun was shining brightly over the small town. People were busy with their daily routines, moving quickly along the streets. Children were laughing and playing in the park. Birds chirped from the trees, adding a cheerful melody to the scene.";

const paragraph = ref(paragraphL.split(""));
const userInput = ref("");
const cursorPoint = ref(0); //cursor point of paragraph section
const completeText = ref(""); //typed charactors

// results sheet
const correctC = ref(0);
const incorrectC = ref(0);
const correctW = ref(0);
const incorrectW = ref(0);

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

onMounted(() => {
  // paragraph.innerHTML =
  //   paragraph.innerHTML.slice(0, 8) +
  //   " <span class='slct'> " +
  //   paragraph.innerHTML.slice(12, 19) +
  //   "</span>" +
  //   paragraph.innerHTML.slice(19, 33);
});

const checkSentence = () => {};

const wordCounter = ref({
  counter: 0,
  correct: true,
});

const checkWord = () => {
  if (wordCounter.value.correct === true) {
  }
};

const previoseCorrectness = ref(true);

const typing = (event) => {
  console.log(cursorPoint.value, event.key, previoseCorrectness.value);
  // put front cursor always
  let inputBox = document.getElementById("inputBox");
  inputBox.setSelectionRange(-1, -1);

  // prevent backspace and deletekey to remove text from user input
  if (event.key == "Backspace" || event.key == "Delete") {
    event.preventDefault();
  }

  // if event key is not prohibited, then
  else if (!prohibitedKeys.includes(event.key)) {
    // if previouse is correct and current is correct
    if (
      paragraph.value[cursorPoint.value] === event.key &&
      previoseCorrectness.value == true
    ) {
      console.log("one");
      let removeitem = paragraph.value.shift();
      completeText.value += removeitem;
      correctC.value += 1;
    }
    // else previose is incorect, but this is correct
    else if (
      paragraph.value[cursorPoint.value] === event.key &&
      previoseCorrectness.value === false
    ) {
      console.log("four");
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
      console.log("two");
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
      console.log("three");
      let removeitem = paragraph.value.shift();
      completeText.value = completeText.value.slice(0, -7);
      completeText.value += removeitem + "</span>";
      incorrectC.value += 1;
    }
  }
};

// this is for prevent input box cursor movement
const changeCursor = () => {
  let inputBox = document.getElementById("inputBox");
  inputBox.setSelectionRange(-1, -1);
};
</script>

<style scoped>
.level-one-container {
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
}
.userInput {
  width: 675px;
  font-family: "Roboto Mono", monospace;
  font-size: 25px;
  outline: none;
  padding: 10px;
  /* caret-color: transparent; */
}
.result-container {
  /* border: 1px solid black; */
  width: 700px;
  display: flex;
  flex-direction: column;
}
.resutl-container-title {
  /* border: 1px solid yellow; */
  display: flex;
  justify-content: space-around;
  font-family: "Roboto Mono", serif;
  font-weight: 600;
}
.result-container-content {
  /* border: 1px solid red; */
  display: flex;
  justify-content: space-around;
  font-family: "Roboto Mono", serif;
}
.ruler {
  width: 700px;
}
</style>

<style>
.error {
  /* background-color: red; */
  border-radius: 6px;
  color: red;
}
.slct {
  /* color: white; */
  font-weight: 600;
  background-color: rgba(53, 204, 108, 0.6);
  border-radius: 4px;
  /* padding: 0px 4px; */
}
</style>
