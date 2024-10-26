import { onMounted, ref, watch, } from "vue";


const FAVORITES = 'favorites'

export function useFavorites() {

   const items = ref();

   const toggleFavorite = (id) => {
      const index = items.value.findIndex(el => el === id)

      if (index !== -1) {
         items.value = items.value.toSpliced(index, 1)
         return;
      }

      items.value = [...items.value, id]
   }


   onMounted(() => {
      items.value = localStorage.getItem(FAVORITES) ? JSON.parse(localStorage.getItem(FAVORITES)) : []
   })

   watch(items, () => {
      localStorage.setItem(FAVORITES, JSON.stringify(items.value))
   })

   return {
      items: items,
      toggleFavorite
   }
}