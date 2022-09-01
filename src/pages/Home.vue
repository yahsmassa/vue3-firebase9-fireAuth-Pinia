<template>
  <main v-show="initiated && isAuthenticated">
    <section class="px-4">
      <div class="text-2xl flex flex-row justify-between">
        <p ref="t3">{{ clock }} </p>
        <p class="text-2xl" v-html="todayMessage" ref="t4" />
        &nbsp;
      </div>
    </section>
    <section class="px-4 mt-4" ref="t5">
      <InputCard v-model:show-all="checked" @save="events.onClickSave" ref="helloWorld" />
    </section>
    <hr class="mt-5">
    <section class="px-4 mt-4" ref="t6">
      <List>
        <template v-for="(item, index)  in computedRefs.todoList" :key="index">
          <ListItem>
            <TodoCard :todo="item" @delete="events.onClickDelete" @toggle="events.onClickToggle" />
          </ListItem>
        </template>
        <template v-if="todoList.length === 0">
          <ListItem>
            <NoneCard :no-item="haveNoItem" />
          </ListItem>
        </template>
      </List>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { computed, watch, ref, onMounted, toRefs, Ref, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useClock } from '@/hooks/useClock'
import { useFadeInOut } from '@/hooks/useTransitions'
import { useHtmlTemplateRefs, useHasHelloWorldTemplateRefs } from '@/hooks/useTemplateRefs'
import { useAuthStore } from '@/store/auth'
import { useTodoStore } from '@/store/todo'
import { Todo } from '@/types/mytype'

import List from '../components/List.vue'
import ListItem from '../components/ListItem.vue'
import TodoCard from '../components/TodoCard.vue'
import InputCard from '../components/InputCard.vue'
import NoneCard from '../components/NoneCard.vue'
import useScrollObserver from '@/hooks/useScrollObserver'
import { useDialog } from '@/store/dialog'

const dialog = useDialog()
const router = useRouter()
const authStore = useAuthStore()
const todoStore = useTodoStore()
const clock = useClock()

const checked = ref(false)

const { helloWorld } = useHasHelloWorldTemplateRefs(['helloWorld'])

const zxc = ['t1', 't2', 't3', 't4', 't5', 't6', 't7']
const { t1, t2, t3, t4, t5, t6, t7 } = useHtmlTemplateRefs(['t1', 't2', 't3', 't4', 't5', 't6', 't7'])

const { start, initiated } = useFadeInOut([t1, t2, t3, t4, t5, t6, t7], { milliseconds: 450 })

const { user, isAuthenticated } = storeToRefs(authStore)

const todoList = computed<Todo[]>(() => checked.value ? todoStore.getAllList : todoStore.getNotDoneList)
const notDoneList = computed<Todo[]>(() => todoStore.getNotDoneList)
const haveNoItem = computed<boolean>(() => todoStore.getAllList.length === 0)
const todayMessage = computed<string>(() => {
  if (haveNoItem.value) return `you haven't registered <span class="font-bold">any task</span> yet.`
  if (notDoneList.value.length > 0) return `${notDoneList.value.length} more <span class="emphasis">task${notDoneList.value.length > 1 ? 's' : ''}</span> ${notDoneList.value.length > 1 ? 'are' : 'is'} left.`
  return `You're having a <span class="emphasis">great</span> day 🥰`
})
//  or can use this like this.
const computedRefs = reactive({ todoList, notDoneList, haveNoItem, todayMessage })

watch(isAuthenticated, async authenticated => {
  if (authenticated) {
    await todoStore.fetchTodo(user.value?.userId)
    await start()
  }
}, {
  immediate: true
})

useScrollObserver({
  callback(x, y) {
    console.log('hello home page', { x, y })
  }
})

const events = {
  onClickSave(text: string) {
    if (text === 'hello-world-test') {
      helloWorld.value?.helloWorld()
      return
    }

    if (text === 'route-test') {
      router.push('/route-test')
      return
    }

    if (text.length === 0) {
      dialog.alert('Please enter something 🥲')
      return
    }

    todoStore.addTodo({ text, level: 0 }, user.value?.userId)
  },
  async onClickDelete(todo: Todo) {
    const confirmed = await dialog.confirm('Do you want to delete this todo? 🧐', { title: 'Delete Todo' })

    if (confirmed) {
      await todoStore.removeTodo(todo, user.value?.userId)
    }
  },
  onClickToggle(todo: Todo) {
    todoStore.modifyTodo({ ...todo, done: !todo.done }, user.value?.userId)
  }
}
</script>

<style scoped lang="scss">
</style>
