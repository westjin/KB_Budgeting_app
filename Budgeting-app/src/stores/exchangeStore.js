// /stores/exchangeStore.js
import { defineStore } from 'pinia';

export const useExchangeStore = defineStore('exchange', {
  state: () => ({
    rates: [],
    lastFetched: null,
    currencyMap: {
      USD: { name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
      JPY: { name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
      EUR: { name: 'Euro', symbol: '€', flag: '🇪🇺' },
      KRW: { name: 'Korean Won', symbol: '₩', flag: '🇰🇷' },
    },
  }),
  actions: {
    async fetchRates() {
      try {
        const res = await fetch(
          `https://api.currencyfreaks.com/latest?apikey=YOUR_API_KEY&symbols=USD,JPY,EUR,KRW`
        );
        const json = await res.json();
        const base = Number(json.rates.KRW);

        this.rates = ['USD', 'JPY', 'EUR'].map((code) => ({
          country: code,
          name: this.currencyMap[code].name,
          symbol: this.currencyMap[code].symbol,
          flag: this.currencyMap[code].flag,
          value: Math.round((Number(json.rates[code]) / base) * 100) / 100,
        }));
        this.lastFetched = new Date().toISOString();
        localStorage.setItem('exchangeRates', JSON.stringify(this.rates));
      } catch (err) {
        console.error('환율 API 오류', err);
      }
    },
  },
});
