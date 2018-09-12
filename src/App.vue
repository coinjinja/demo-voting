<template>
  <div id="app">
    <div class="container">
      <VoteBar v-for="(p, index) in panelists" :key="index"
        :name="p.name" 
        :votes="p.votes"
        :vote-count="p.voteCount"
        :avatar="p.avatar" />
    </div>
    <div class="header">
      <div class="session">ブロックチェーンの世界で、日本企業は勝てるのか</div>
      <div class="title" @click="showNav = !showNav">#NEC2018</div>
      <div class="nav" v-show="showNav">
        <button class="prev" @click="prev()">前へ</button>
        <button class="next" @click="next()">次へ</button>
      </div>
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
        voteCount: 110,
        avatar: require('./assets/player-1.png')
      },
      { 
        name: "平野淳也" ,
        votes: [],
        voteCount: 87,
        avatar: require('./assets/player-2.png')
      },
      { 
        name: "中村昂平" ,
        votes: [],
        voteCount: 173,
        avatar: require('./assets/player-3.png')
      },
      { 
        name: "竹田匡宏" ,
        votes: [],
        voteCount: 3,
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
        voter_id: new Date().toISOString(),
        voter: faker.name.findName(),
      }
      this.panelists[3].votes.push(vote)
      this.panelists[3].voteCount++
    },
    next() {
      // TODO: connect ws for new votes
      const vote = {
        voter_id: new Date().toISOString(),
        voter: faker.name.findName(),
      }
      this.panelists[2].votes.push(vote)
      this.panelists[2].voteCount++
    }
  },
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background: #000;
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
}
.container {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  padding: 0 50px;
}
.header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 20px 50px;
  color: #8c9599;
  font-weight: 600;
  font-size: 36px;
  display: flex;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 60%);
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
  margin-right: 50px;
}
.nav button {
  cursor: pointer;
  font-size: 28px;
  background: transparent;
  color: #8c9599;
  border: 0;
  padding: 0 10px;
  outline: 0;
  border-right: 2px solid #8c9599;
}
.nav button.prev {
  border-right: 0;
  border-left: 2px solid #8c9599;
}
.nav button:active {
  color: #ccc;
  border-right-color: #ccc;
}
</style>
