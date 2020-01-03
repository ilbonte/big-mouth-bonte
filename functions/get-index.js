'use strict';

const fs = require('fs').promises

async function loadHtml() {
  return await fs.readFile('./static/index.html', 'utf-8')
}

module.exports.handler = async event => {
  let html = await loadHtml();
  return {
    statusCode: 200,
    body: html,
    headers: {
      'Content-Type': 'text/html; charset=UTF-8'
    }
  };
};
