require('dotenv').config();
const _ = require("lodash");

const customCache = new Map();

const fetchBlogs = _.memoize(
  async () => {
    const currentTime = Date.now(); //Get the current time
    const cacheEntry = customCache.get('cache-key');

    if (cacheEntry && currentTime - cacheEntry.timestamp < 5000) {
      return cacheEntry.data;
    }
    else
    {
      const response = await fetch(process.env.URL, {
        method: "GET",
        headers: {
          "x-hasura-admin-secret": process.env.SECRET
        }
      });
      const data = await response.json();
      customCache.set('cache-key', { data: data, timestamp: currentTime });
      return data;
    }
  },

  //Resolver
  ()=>{
    return "cache-key";
  }
);

//Clear the cache after every 5 seconds
setInterval(() => {
  customCache.clear();
}, 5000);

module.exports = fetchBlogs;
