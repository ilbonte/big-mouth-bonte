'use strict';

const fs = require("fs")

module.exports.handler = async event => {
  let html = "<html><body><h1>hello</h1></body></html>"
  return {
    statusCode: 200,
    body: html,
    headers: {
      'Content-Type': 'text/html; charset=UTF-8'
    }
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
