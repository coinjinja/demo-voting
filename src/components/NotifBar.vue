<template>
<transition-group name="list-notif" class="notif-stack" tag="div">
  <div class="notif-bar list-notif-item" v-for="v in queue" :key="v.voter_id">
    +1 {{v.voter}}
  </div>
</transition-group>
</template>

<script>
export default {
  name: 'Notif-Bar',
  props: {
    queue: {
      default: [],
      type: Array,
    },
  },
  data() {
    return {
      displayed: {},
    }
  },
  watch: {
    queue: function(newqueue) {
      const hide = (voter_id) => {
        setTimeout(() => {
          const found = this.queue.find((e) => {
            return e.voter_id === voter_id
          })
          if (found) this.queue.splice(found, 1)
        }, 5000)
      }
      for (const vote of newqueue) {
        const voter_id = vote.voter_id
        if (voter_id in this.displayed) continue
        this.displayed[voter_id] = true
        hide(voter_id)
      }
    }
  },
}
</script>

<style scoped>
.notif-stack {
  position: absolute;
  width: 300px;
  bottom: 100%;
  padding-bottom: 170px;
  transform: translateX(-50%);
  left: 50%;
  display: flex;
  overflow: hidden;
  flex-direction: column;
}
.notif-bar {
  align-self: center;
  color: white;
  font-weight: bold;
  font-size: 20px;
  padding: 10px 30px;
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  align-items: center;
  margin: 5px 0;
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
.list-notif-item {
  transition: all 0.3s;
  display: inline-block;
  margin-right: 10px;
}
.list-notif-enter {
  opacity: 0;
  transform: translateX(-50%);
}
.list-notif-leave-to {
  opacity: 0;
  transition-duration: 0.5s;
  transform: translateX(10%);
}
</style>
