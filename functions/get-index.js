'use strict';

const fs = require('fs').promises
const URL = require('url')
const axios = require('axios').default;
const aws4 = require('aws4')
const Mustache = require('mustache');
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const restaurantsApiRoot = process.env.restaurants_api;

async function loadHtml() {
  return await fs.readFile('./static/index.html', 'utf-8')
}


module.exports.handler = async event => {
  let template = await loadHtml();
  let restaurants = await getRestaurants()
  let dayOfWeek = days[new Date().getDay()];
  let html = Mustache.render(template, { dayOfWeek, restaurants });
  return {
    statusCode: 200,
    body: html,
    headers: {
      'Content-Type': 'text/html; charset=UTF-8'
    }
  };
};

async function getRestaurants() {
  let url = URL.parse(restaurantsApiRoot)
  let opts = {
    host: url.hostname,
    path: url.pathname
  }

  aws4.sign(opts)

  try {
    const response = await axios.get(restaurantsApiRoot, {
      headers: {
        "Host": opts.headers["Host"],
        "X-Amz-Date": opts.headers["X-Amz-Date"],
        "Authorization": opts.headers["Authorization"],
        "X-Amz-Security-Token": opts.headers["X-Amz-Security-Token"]
      }
    });
    return response.data
  } catch (error) {
    console.error(error);
  }
}
