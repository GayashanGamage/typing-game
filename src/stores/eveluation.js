import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useEveluationStore = defineStore("eveluation", () => {
  const paragraphList = ref(
    "In Par1s, the s!ghts are endless. V1ewsof EiffelT7@wer, cafes%4filled with warm^breads, and7S$hops l!ned with chic+gems! You'll find F@ash!ons that sparkle, nights that$sh!mmer, and the S3ene rivers!de flowing so5<calmly. Explore streets l@ike Rue5Saint and wond9er @t5the art galler!es. Every m&oment br!ngs a nEw,_journey! Caf@es call<, art$grows, and mus!c f1lls the air. Walk the b@oad$R5des and see l!ght danc1ng on the old+facad3s. Here, love and h!story blend with e@very st3p taken, a tr!p to ch@rm the so3ul and br!ghten each dr~eam."
  );
  const paragraph = ref(paragraphList.value.split(""));
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

  return {
    paragraph,
    userInput,
    cursorPoint,
    completeText,
    previoseCorrectness,
    wordCorrectness,
    correctC,
    incorrectC,
    correctW,
    incorrectW,
    isTimmerRun,
    timer,
    popup,
    prohibitedKeys,
  };
});
