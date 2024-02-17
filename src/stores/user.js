import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
    state: () => ({
        token: '1e10f824-8fb2-4951-9815-d84d7bb141f5',
        gmt: getUserGMT(),
    }),
});

const getUserGMT = () => new Date().toString().match(/GMT[+-]\d{2}/)[0];