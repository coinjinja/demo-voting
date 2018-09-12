<template>
  <div id="app">
    <div class="container">
      <VoteBar v-for="(p, index) in currentPanel" :key="index"
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
import api from './utils/api'

export default {
  name: 'app',
  components: { VoteBar },
  data() {
    const names = ['小幡和輝', '正田英樹', '川田修平', '深山周作', '平野淳也', '深井未来生', '中村昂平', '竹田匡宏', 'ポイン', '安昌浩', '神谷知愛']
    const panelists = names.map((name, index) => ({ 
      name,
      votes: [],
      voteCount: 0,
      avatar: require(`./assets/player-${index + 1}.png`)
    }))
    return {
      panelists,
      offset: 0,
      showNav: false,
    }
  },
  computed: {
    currentPanel() {
      return this.panelists.slice(this.offset, this.offset + 4)
    }
  },
  methods: {
    prev() {
      if (this.offset === 0) return
      this.offset -= 4
    },
    next() {
      if (this.offset + 4 >= this.panelists.length) return
      this.offset += 4
    },
    async fetchVotes() {
      const { data: votes } = await api.fetchVotes()
      votes.forEach(v => {
        // make sure the numbers won't be reversed
        if (this.panelists[v.candidate - 1].voteCount < v.votes) {
          this.panelists[v.candidate - 1].voteCount = v.votes
        }
      })
    },
    add(data) {
      const { memo, opponent: { full_name, user_id } } = data
      const panelist = this.panelists[parseInt(memo, 10) - 1] // the index of candidate is in memo
      const vote = {
        voter_id: user_id,
        voter: full_name || '相場ユーザー',
      }
      panelist.votes.push(vote)
      panelist.voteCounts += 1
    }
  },
  mounted() {
    this.fetchVotes() // load vote count
    this.timer = setInterval(() => this.fetchVotes(), 3000) // load vote count every 3 seconds to correct the vote count

    this.$options.sockets.onmessage = (data) => {
      try {
        const json = JSON.parse(data.data).data
        const { asset_id } = json
        if (asset_id === '07065d64-fd33-39b5-b275-9a2cc4806ef4') { // The only valid token for voting
          this.add(json)
        }
      } catch (error) {
        return
      }
    }
  }
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
  padding: 0 40px;
}
.header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 20px 40px;
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
  margin-right: 40px;
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
