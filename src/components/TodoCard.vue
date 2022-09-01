<template>
  <div class="px-2 py-3 rounded w-full flex flex-row" :class="todo.done ? 'done' : ''">
    <p class="text-sm text-left w-[14%] mr-2 mt-1 text-gray-500">
      {{ createdAt }}
    </p>
    <p class="text-xl w-[70%] " :class="todo.done ? 'line-through' : ''">
      {{ todo.text }}
    </p>
    <Button class="text-xs p-1" :class="todo.done ? 'btn-warning' : 'btn-success'" @click="emits('toggle', todo)">
      {{ todo.done ? 'Revert' : 'Done' }}
    </Button>
    <TrashIcon class="w-10 ml-2 cursor-pointer" @click="emits('delete', todo)" />
  </div>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue'
import { Todo } from '@/types/mytype'
import { dateString } from '@/utils/stringFormat'
import Button from '@/components/Button.vue'
import { TrashIcon } from '@heroicons/vue/outline'

const props = defineProps({
  todo: {
    type: Object as PropType<Todo>,
    default: null
  }
})

const emits = defineEmits(['delete', 'toggle'])

const createdAt = computed(() => dateString(props.todo?.createdAt ?? ''))
</script>

<style scoped>
</style>
