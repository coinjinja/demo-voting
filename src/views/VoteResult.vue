<template>
<div>
  <div class="header">
   <div>いいね！ランキング</div>
    <div class="title">#NEC2018</div>
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
  top: 90px;
}
.top3, .others {
  flex: 1;
  align-self: center;
  display: flex;
  flex-direction: column;
}
.top3 > div {
  position: relative;
  padding: 30px 10px 30px 20px;
  font-size: 40px;
  font-weight: 600;
  color: #fff;
  align-self: center;
}
.top3 .name {
  width: 250px;
  padding: 20px 60px 20px 80px;
  overflow: hidden;
  position: relative;
}
.top3 .name::before {
  position: absolute;
  z-index: -1;
  top: 50%;
  left: 0;
  content: ' ';
  width: 80%;
  padding-bottom: 80%;
  transform-origin: 50% 50%;
  transform: translateY(-50%) rotate(45deg);
  background: linear-gradient(-45deg, #eab839 0%, #eab839 50%, #ffd359 50%, #ffd359 100%);
}
.top3 div:nth-child(2) .name::before {
  background: linear-gradient(-45deg, #808080 0%, #808080 50%, #adaaaa 50%, #adaaaa 100%);
}
.top3 div:nth-child(3) .name::before {
  background: linear-gradient(-45deg, #da6329 0%, #da6329 50%, #f37d43 50%, #f37d43 100%);
}
.top3 .count {
  font-family: DINCondensed-Bold;
  font-size: 60px;
  position: absolute;
  padding-top: 16px;
  top: 50%;
  right: 0;
  transform: translate(100%, -50%);
}
.others {
  font-size: 28px;
  font-weight: bold;
  color: #fff;
}
.others > div {
  display: flex;
  padding: 12px;
  align-self: center;
}
.others .name {
  text-align: left;
  width: 350px;
}
.diamond {
  position: absolute;
  left: -10px;
  top: 50%;
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
