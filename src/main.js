import Vue from 'vue'
import App from './App.vue'
import store from './store'
import { firestorePlugin } from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'

Vue.config.productionTip = false;

Vue.use(firestorePlugin);

firebase.initializeApp({
    projectId: 'todolist-5e1f3',
    databaseURL: 'https://console.firebase.google.com/project/todolist-5e1f3/database/firestore/data~2Flist'
});

export const db = firebase.firestore();


new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
