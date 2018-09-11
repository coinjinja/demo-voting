<template>
  <div id="app">
    <div class="container">
      <VoteBar v-for="(p, index) in panelists" :key="index"
        :name="p.name" 
        :votes="p.votes"
        :avatar="p.avatar" />
    </div>
    <div class="header">
      <div class="session">ブロックチェーンの世界で、日本企業は勝てるのか</div>
      <div class="title" @click="showNav = !showNav">#NEC2018</div>
    </div>
    <div class="nav" v-show="showNav">
      <button class="prev" @click="prev()">次へ</button>
      <button class="next" @click="next()">前へ</button>
    </div>
  </div>
</template>

<script>
import VoteBar from './components/VoteBar.vue'
import faker from 'faker'

export default {
  name: 'app',
  components: { VoteBar },
  data() {
    const panelists = [
      { 
        name: "深井未来生" ,
        votes: [],
        avatar: require('./assets/player-1.png')
      },
      { 
        name: "平野淳也" ,
        votes: [],
        avatar: require('./assets/player-2.png')
      },
      { 
        name: "中村昂平" ,
        votes: [],
        avatar: require('./assets/player-3.png')
      },
      { 
        name: "竹田匡宏" ,
        votes: [],
        avatar: require('./assets/player-4.png')
      },
    ]
    return {
      panelists,
      showNav: false,
    }
  },
  methods: {
    prev() {
      // TODO: connect ws for new votes
      const vote = {
        voter: faker.name.findName(),
        show: true,
      }
      this.panelists[3].votes.push(vote)
    },
    next() {
      // TODO: connect ws for new votes
      const vote = {
        voter: faker.name.findName(),
        show: true,
      }
      this.panelists[2].votes.push(vote)
    }
  },
  mounted() {
    // TODO: load all votes from server, which don't need to be shown
    function addElements(arr, n) {
      for (let i = 0; i < n; i++) {
        arr.push({
          voter: faker.name.findName(),
          show: false,
        })
      }
    }
    addElements(this.panelists[0].votes, 128)
    addElements(this.panelists[1].votes, 94)
    addElements(this.panelists[2].votes, 191)
    addElements(this.panelists[3].votes, 3)
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background: linear-gradient(to bottom, #1a2b33 0%,#1e3751 100%);
}
body, button {
  font-family: "Open Sans", "Source Han Sans", -apple-system, "Helvetica Neue", Helvetica, Arial, sans-serif;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;
  /* background-color: #1a2b33; */
}
.container {
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
}
.header {
  position: absolute;
  top: 0;
  width: 100%;
  color: #8c9599;
  font-weight: 600;
  font-size: 42px;
  display: flex;
  padding: 20px;
  box-sizing: border-box;
}
.header .title {
  text-align: right;
  flex: 1;
  cursor: pointer;
}
.nav {
  position: absolute;
  top: 80px;
  right: 0px;
  margin-right: 20px;
}
.nav button {
  cursor: pointer;
  display: block;
  font-size: 32px;
  font-weight: 200;
  background: transparent;
  color: #8c9599;
  border: 0;
  padding-right: 20px;
  outline: 0;
  border-right: 2px solid #8c9599;
  margin-top: 10px;
  transition: all 0.3s ease-out;
}
.nav button:active {
  color: #ccc;
  border-right-color: #ccc;
}

</style>
