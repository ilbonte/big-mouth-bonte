'use strict';

const fs = require('fs').promises
const axios = require('axios').default;
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
  try {
    const response = await axios.get(restaurantsApiRoot);
    return response.data
  } catch (error) {
    console.error(error);
  }
}
