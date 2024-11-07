<template>
  <div class="level-one-container">
    <div class="level-two-container content">
      <h1 class="site-title">
        <span id="title-one">HOW YOUR</span><br />
        <span id="title-two">FINGERS</span><br />
        <span id="title-three">WORK ON</span><br />
        <span id="title-four">KEY BOARD</span>
      </h1>
      <input type="text" class="user-input" placeholder="PREFFERENCE TOPIC" />
      <div class="level-three-container buttons">
        <button class="action-button" @click="getEveluation">
          <span class="button-number">01</span
          ><span class="button-text">minutes</span>
        </button>
        <button class="action-button" @click="getEveluation">
          <span class="button-number">03</span
          ><span class="button-text">minutes</span>
        </button>
      </div>
    </div>
    <div class="level-two-container footer">
      <p class="site-text">Develop by gamage.me</p>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";

const getEveluation = () => {
  router.push({ name: "eveluation" });
};
</script>

<style scoped>
.level-one-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.content {
  height: 96vh;
  width: 99.9vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.site-title {
  color: #000;
  text-align: center;
  font-family: "Roboto Mono";
  font-size: 47px;
  font-style: normal;
  font-weight: 900;
}
.footer {
  height: 4vh;
  background-color: black;
}
.site-text {
  color: aliceblue;
  text-align: center;
  font-family: "Roboto Mono", serif;
  padding: 0px;
  margin: 3px 0px 0px 0px;
}
#title-one {
  letter-spacing: 7px;
}
#title-two {
  letter-spacing: 11.7px;
}
#title-three {
  letter-spacing: 11.7px;
}
#title-four {
  letter-spacing: 3px;
}
.user-input {
  margin-top: 64px;
  width: 260px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 4px;
  border: 0.5px solid #000;
  background: #fff;
  outline: none;
  font-family: "Roboto Mono", serif;
  font-size: 20px;
  padding-left: 10px;
}
.user-input::selection {
  background-color: black;
  color: white;
}
.buttons {
  margin-top: 11px;
  display: flex;
  flex-direction: row;
  gap: 6px;
}
.action-button {
  width: 133px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 4px;
  background: #000;
  border: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.button-number {
  color: #fff;
  font-family: "Roboto Mono";
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin: 0px 14px 0px 0px;
}
.button-text {
  color: #fff;
  font-family: "Roboto Mono";
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin: 0px;
  padding: 0px;
  line-height: 0px;
}
.action-button:hover {
  background: white;
  color: black;
  border: 1px solid black;
}
.action-button:hover > .button-number {
  color: black;
}
.action-button:hover > .button-text {
  color: black;
}
</style>
