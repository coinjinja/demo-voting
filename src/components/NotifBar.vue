<template>
<div class="notif-stack">
  <div class="notif-bar" v-for="(v, index) in reversed_votes" 
    :key="index" :style="{ opacity: v.show ? 1 : 0 }">
    +1 {{v.voter}}
  </div>
</div>
</template>

<script>
export default {
  name: 'Notif-Bar',
  props: {
    votes: {
      default: [],
      type: Array,
    },
  },
  data() {
    return {
      count: 0
    }
  },
  computed: {
    reversed_votes() {
      return this.votes.slice().reverse()
    }
  },
  watch: {
    votes: function(newVotes) {
      if (this.count !== 0) {
        function hide(item) {
          setTimeout(() => {
            console.log(item)
            item.show = false
          }, 5000)
        }
        for (let i = this.count; i < newVotes.length; i++) {
          newVotes[i].show = true
          hide(newVotes[i])
        }
      }
      this.count = newVotes.length
    }
  },
}
</script>

<style scoped>
.notif-stack .notif-bar:nth-child(2) {
  top: -290px;
}
.notif-stack .notif-bar:nth-child(3) {
  top: -360px;
}
.notif-stack .notif-bar:nth-child(4) {
  top: -430px;
}
.notif-stack .notif-bar:nth-child(5) {
  top: -490px;
}
.notif-bar {
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
  color: white;
  font-weight: bold;
  font-size: 20px;
  top: -220px;
  padding: 10px 30px;
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: all 1s;
}
.notif-bar::before {
  position: absolute;
  z-index: -1;
  top: 50%;
  left: 15%;
  content: ' ';
  background: #555760;
  width: 70%;
  padding-bottom: 70%;
  transform-origin: 50% 50%;
  transform: translateY(-50%) rotate(45deg);
}

</style>
