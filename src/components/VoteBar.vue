<template>
<div class="votebar">
  <div class="bar" :style="{ height: `${barHeight}px` } ">
    <div class="diamond">
      <img :alt="name" :src="avatar">
    </div>
    <div class="name">{{name}}</div>
    <div class="number">{{voteCount}}</div>
    <NotifBar :queue="votes"/>
  </div>
</div>
</template>

<script>
import NotifBar from './NotifBar.vue'

export default {
  name: 'VoteBar',
  components: { NotifBar },
  props: {
    name: String,
    votes: Array,
    voteCount: {
      default: 0,
      type: Number,
    },
    avatar: String,
  },
  computed: {
    barHeight() {
      return parseInt(120 + (this.voteCount ** 0.8) * 5, 10)
    }
  }
}
</script>

<style scoped>
.votebar {
  flex: 1;
  align-self: flex-end;
}
.bar {
  width: 100px;
  margin: 0 auto;
  background: linear-gradient(to right, #4fc1b3 0%, #4fc1b3 50%, #73d8ce 50%, #73d8ce 100%);
  position: relative;
  transition: all 0.1s ease-out;
  max-height: 600px;
}
.votebar:nth-child(2) .bar {
  background: linear-gradient(to right, #864add 0%, #864add 50%, #a566ed 50%, #a566ed 100%);
}
.votebar:nth-child(3) .bar {
  background: linear-gradient(to right, #d32f4a 0%, #d32f4a 50%, #f34358 50%, #f34358 100%);
}
.votebar:nth-child(4) .bar {
  background: linear-gradient(to right, #eab839 0%, #eab839 50%, #ffd359 50%, #ffd359 100%);
}
.bar .name {
  position: absolute;
  left: 30%;
  bottom: 50px;
  font-size: 36px;
  font-weight: 600;
  white-space: nowrap;
  background: #fff;
  padding: 0px 10px;
}
.bar .number {
  font-family: "DIN Condensed";
  font-size: 72px;
  color: #fff;
  width: 100%;
  position: absolute;
  top: -150px;
}
.diamond {
  width: 70px;
  height: 70px;
  object-fit: cover;
  outline: 10px solid #fff;
  outline-offset: -10px;
  overflow: hidden;
  margin: 0 auto;
  transform-origin: 50% 50%;
  transform: translateY(-50%) rotate(45deg);
  border: 8px solid #fff;
}
.diamond img {
  transform-origin: 50% 50%;
  transform: rotate(-45deg) translateY(-23.5%);
  width: 150%;
  height: 150%;
}
</style>
