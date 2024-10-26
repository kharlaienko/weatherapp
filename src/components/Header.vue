<script setup>
   import { RouterLink } from 'vue-router';
   import Button from './Button.vue';
   import Logo from '../assets/icons/logo.svg';
</script>

<template>
   <header class="header">
      <Logo width="80" />
      <nav class="navigation">
         <RouterLink class="link" :to="{ name: 'main' }">{{
            $t('main')
         }}</RouterLink>
         <RouterLink class="link" :to="{ name: 'favorites' }">{{
            $t('favorites')
         }}</RouterLink>
      </nav>
      <div class="locales">
         <Button
            v-for="locale in $i18n.availableLocales"
            :key="locale"
            @click="$i18n.locale = locale"
            :active="locale === $i18n.locale"
         >
            {{ locale }}
         </Button>
      </div>
   </header>
</template>

<style scoped>
   .header {
      display: flex;
      align-items: center;
      width: 100%;
   }

   .navigation {
      margin-inline: auto;

      display: inline-flex;
      gap: 1rem;
   }

   .link {
      color: inherit;
      text-decoration: none;
      font-size: 1.4rem;
   }
   .locales {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.2rem;
   }
   .router-link-active {
      text-decoration: underline;
   }
</style>
