<template>
    <BaseCard>

    </BaseCard>
</template>

<script>
import BaseCard from '../common/BaseCard'

export default {
  name: 'Params',
  components: {
    BaseCard
  },
  data () {
    return {
      cateList: []
    }
  },
  created () {
    this.getCateList()
  },
  methods: {
    async getCateList () {
      const { data: res } = await this.$axios.get('categories', { params: { type: 3 } })
      console.log('categories:', res)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.catelist = res.data.result
    }
  }
}
</script>

<style lang="less" scoped>

</style>
