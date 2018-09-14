<template>
<div>
  <div class="header">
   <div>NEC2018 投票結果</div>
   <div class="title" @click="showNav = !showNav">#NEC2018</div>
  </div>
  <div class="container">
    <div class="top3">
      <div v-for="v in top3" :key="v.name">
        <div class="diamond">
          <img :alt="v.name" :src="v.avatar">
        </div>
        <div class="name">{{v.name}}</div>
        <div class="count">{{v.votes}}</div>
      </div>
    </div>
    <div class="others">
      <div v-for="v in others" :key="v.name">
        <div class="name">{{v.name}}</div>
        <div class="count">{{v.votes}}</div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import api from '@/utils/api'

export default {
  name: 'VoteResult',
  data() {
    const panelists = [
      '小幡和輝', '正田英樹', '川田修平', '深山周作', '平野淳也', '深井未来生', 
      '中村昂平', '竹田匡宏', 'ポイン', '安昌浩', '神谷知愛'
    ].map((name, index) => ({
      name, avatar: require(`@/assets/player-${index + 1}.jpg`), votes: 0
    }))
    return { panelists }
  },
  computed: {
    ordered() {
      return this.panelists.slice(0).sort((a, b) => b.votes - a.votes)
    },
    top3() {
      return this.ordered.slice(0, 3)
    },
    others() {
      return this.ordered.slice(3)
    }
  },
  methods: {
    async fetchVotes() {
      const { data: votes } = await api.fetchVotes()
      votes.forEach(v => {
        this.panelists[v.candidate - 1].votes = v.votes
      })
    },
  },
  mounted() {
    // load vote count
    this.fetchVotes() 
    // load vote count every 3 seconds to correct the vote count
    this.timer = setInterval(() => this.fetchVotes(), 3000)
  }
}
</script>

<style scoped>
.container {
  top: 0;
}

h1 {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  text-align: left;
}
</style>
