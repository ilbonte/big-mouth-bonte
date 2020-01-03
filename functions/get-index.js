'use strict';

const fs = require('fs').promises
const Mustache = require('mustache');
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

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
  return [
    {
      name: "Fangtasia",
      image: "https://d2qt42rcwzspd6.cloudfront.net/manning/fangtasia.png",
      themes: ["true blood"]
    },
    {
      name: "Shoney's",
      image: "https://d2qt42rcwzspd6.cloudfront.net/manning/shoney's.png",
      themes: ["cartoon", "rick and morty"]
    },
    {
      name: "Freddy's BBQ Joint",
      image: "https://d2qt42rcwzspd6.cloudfront.net/manning/freddy's+bbq+joint.png",
      themes: ["netflix", "house of cards"]
    },
    {
      name: "Pizza Planet",
      image: "https://d2qt42rcwzspd6.cloudfront.net/manning/pizza+planet.png",
      themes: ["netflix", "toy story"]
    },
    {
      name: "Leaky Cauldron",
      image: "https://d2qt42rcwzspd6.cloudfront.net/manning/leaky+cauldron.png",
      themes: ["movie", "harry potter"]
    },
    {
      name: "Lil' Bits",
      image: "https://d2qt42rcwzspd6.cloudfront.net/manning/lil+bits.png",
      themes: ["cartoon", "rick and morty"]
    },
    {
      name: "Fancy Eats",
      image: "https://d2qt42rcwzspd6.cloudfront.net/manning/fancy+eats.png",
      themes: ["cartoon", "rick and morty"]
    },
    {
      name: "Don Cuco",
      image: "https://d2qt42rcwzspd6.cloudfront.net/manning/don%20cuco.png",
      themes: ["cartoon", "rick and morty"]
    },
  ];
}
