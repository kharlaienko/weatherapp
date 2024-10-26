import { createI18n } from 'vue-i18n';
import en from '../langs/en.json'
import uk from '../langs/uk.json'

const i18n = createI18n({
   legacy: false,
   locale: 'uk',
   fallbackLocale: 'en',
   messages: {
      en: en,
      uk: uk

   }
})



export default i18n;