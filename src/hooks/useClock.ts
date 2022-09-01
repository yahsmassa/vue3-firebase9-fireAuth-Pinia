import { onBeforeUnmount, onMounted, ref } from "vue";
import { Pausable, useIntervalFn } from "@vueuse/core";
import { Nullable } from "@/types/mytype";
import { dateString } from "@/utils/stringFormat";

function getCurrentTime(format: string) {
  return dateString(new Date(), format);
}

export function useClock(format: string = "MM/DD") {
  const value = ref<string>(getCurrentTime(format));
  let pausable: Nullable<Pausable> = null;

  onMounted(() => {
    useIntervalFn(() => {
      value.value = getCurrentTime(format);
    }, 1000);
  });

  onBeforeUnmount(() => {
    pausable?.pause();
  });

  return value;
}
