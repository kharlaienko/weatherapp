import axios from "axios"

export const USER_CITY = 'user_city';

export const getUserCity = async () => {
   const cityFromLocalStorage = localStorage.getItem(USER_CITY);

   if (cityFromLocalStorage) return cityFromLocalStorage;

   const res = await axios.get('https://ipinfo.io')
   localStorage.setItem(USER_CITY, res.data.city)
   return res.data.city
}

