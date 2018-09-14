<template>
  <div>
    <div class="header">
      <div>{{title}}</div>
      <div class="title" @click="showNav = !showNav">#NEC2018</div>
      <div class="nav" v-show="showNav">
        <button class="prev" @click="prev()">前へ</button>
        <button class="next" @click="next()">次へ</button>
      </div>
    </div>
    <div class="container">
    <VoteBar v-for="(p, index) in currentPanel" :key="index"
      :name="p.name" 
      :votes="p.votes"
      :vote-count="p.voteCount"
      :avatar="p.avatar" />
    </div>
  </div>
</template>

<script>
import VoteBar from '@/components/VoteBar.vue'
import api from '@/utils/api'

export default {
  name: 'TalkSession',
  components: { VoteBar },
  data() {
    const titles = [
      '仮想通貨は、地域創生の転換点を生み出せるのか',
      'ブロックチェーンの世界で、日本企業は勝てるのか',
      '日本発プロジェクトが作る新しいコミュニティの形'
    ]
    const names = [
      '小幡和輝', '正田英樹', '川田修平', '深山周作', '平野淳也', '深井未来生', 
      '中村昂平', '竹田匡宏', 'ポイン', '安昌浩', '神谷知愛'
    ]
    const panelists = names.map((name, index) => ({ 
      name,
      votes: [],
      voteCount: 0,
      avatar: require(`@/assets/player-${index + 1}.jpg`)
    }))
    const offset = this.$route.meta.offset
    const showNav = false
    return {
      panelists, offset, titles, showNav
    }
  },
  computed: {
    currentPanel() {
      return this.panelists.slice(this.offset * 4, this.offset * 4 + 4)
    },
    title() {
      return this.titles[this.offset]
    }
  },
  methods: {
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
      const { asset_id, memo, opponent: { full_name, user_id } } = data
      if (asset_id !== '07065d64-fd33-39b5-b275-9a2cc4806ef4') return // The only valid token for voting
      
      const panelist = this.panelists[parseInt(memo, 10) - 1] // the index of candidate is in memo
      panelist.votes.push({
        voter_id: user_id,
        voter: full_name || '相場ユーザー',
      })
      panelist.voteCount += 1
    },
    prev() {
      if (this.offset > 0) this.offset--
      this.showNav = false
    },
    next() {
      if (this.offset < 2) this.offset++
      else this.$router.push({ path: '/result' })
      this.showNav = false
    },
  },
  mounted() {
    this.fetchVotes() // load vote count
    this.timer = setInterval(() => this.fetchVotes(), 3000) // load vote count every 3 seconds to correct the vote count

    this.$options.sockets.onmessage = (data) => {
      try {
        this.add(JSON.parse(data.data).data)
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style scoped>

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
