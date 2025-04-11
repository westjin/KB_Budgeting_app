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
          `https://api.currencyfreaks.com/latest?apikey=f5e4204e10914c9bad64b9a1560238b8&symbols=USD,JPY,EUR,KRW`
        );

        const json = await res.json();

        const usdToKrw = Number(json.rates.KRW); // USD → KRW

        this.rates = [
          {
            country: 'USD',
            name: this.currencyMap.USD.name,
            symbol: this.currencyMap.USD.symbol,
            flag: this.currencyMap.USD.flag,
            value: usdToKrw,
          },
          {
            country: 'JPY',
            name: this.currencyMap.JPY.name,
            symbol: this.currencyMap.JPY.symbol,
            flag: this.currencyMap.JPY.flag,
            value:
              Math.round((usdToKrw / Number(json.rates.JPY)) * 10000) / 100, // × 100
          },
          {
            country: 'EUR',
            name: this.currencyMap.EUR.name,
            symbol: this.currencyMap.EUR.symbol,
            flag: this.currencyMap.EUR.flag,
            value: Math.round(usdToKrw / Number(json.rates.EUR)),
          },
        ];

        this.lastFetched = new Date().toISOString();

        // 캐싱
        localStorage.setItem('exchangeRates', JSON.stringify(this.rates));
        localStorage.setItem('exchangeFetchedAt', Date.now().toString());
        console.log('✅ 환율 갱신 성공:', this.rates);
      } catch (err) {
        console.error('❌ 환율 API 오류', err);
      }
    },
  },
});
