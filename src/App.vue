<template>
  <Dialog />
  <Loading />
  <router-view />
</template>

<script setup lang="ts">
import Loading from '@/components/Loading.vue'
import Dialog from '@/components/Dialog.vue'
</script>

<style lang="scss">
</style>
