// ./app.js


import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

const API_URL = 'https://www.googleapis.com/customsearch/v1?';
const key='AIzaSyBQBDBFK5BpRh8Jm9Zvz9arHxHRiXymEDM';
const cx='016088883029330661236:enp7zuosr8u';

  function buildURL (searchTerm) {
	
	url = '${API_URL}key=${key}&cx=${cx}&q=${searchTerm}';
    //return fetch(url)
    return url;
    //  .then(response => response.json())
    //  .then(result => result.photos);
  }

const vm = new Vue({
  el: '#app',
  data: {
    results: []
  },
  mounted () {
    this.getPosts('home');
  },
  methods: {
    getPosts(section) {
      let url = buildUrl(section);
      axios.get(url).then((response) => {
        this.results = response.data.results;
      }).catch( error => { console.log(error); });
    }
  },
  computed: {
    processedPosts() {
      let posts = this.results;

      // Add image_url attribute
      posts.map(post => {
        let imgObj = post.multimedia.find(media => media.format === "superJumbo");
        post.image_url = imgObj ? imgObj.url : "http://placehold.it/300x200?text=N/A";
      });

      // Put Array into Chunks
      let i, j, chunkedArray = [], chunk = 4;
      for (i=0, j=0; i < posts.length; i += chunk, j++) {
        chunkedArray[j] = posts.slice(i,i+chunk);
      }
      return chunkedArray;
    }
  }
});