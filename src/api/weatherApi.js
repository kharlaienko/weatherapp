import i18n from '@/plugins/i18n';
import axios from 'axios';

const weatherApi = axios.create({
   baseURL: `https://api.openweathermap.org/data/2.5/`,
});

const APP_ID = `${import.meta.env.VITE_OPEN_WEATHER_API_KEY}`

weatherApi.interceptors.request.use(config => {

   const paramsToAdd = { appid: APP_ID, lang: i18n.global.locale.value }

   if ('params' in config) {
      config.params = { ...config.params, ...paramsToAdd };
   } else {
      config.params = paramsToAdd;
   }

   return config;
}, error => {
   return Promise.reject(error);
});

export default weatherApi