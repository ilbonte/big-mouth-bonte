'use strict';

const fs = require('fs').promises
const AWS = require('aws-sdk')
const dynamodb = new AWS.DynamoDB.DocumentClient()

const defaultResults = process.env.defaultResults || 8;
const tableName = process.env.restaurants_table;

async function findRestaurantsByTheme(theme, count) {
  let req = {
    TableName: tableName,
    Limit: count,
    FilterExpression: "contains(themes, :theme)",
    ExpressionAttributeValues: { ":theme": theme }
  };

  let resp = await dynamodb.scan(req).promise();
  return resp.Items;
}

module.exports.handler = async event => {
  const req = JSON.parse(event.body)
  const restaurants = await findRestaurantsByTheme(req.theme, defaultResults)
  return {
    statusCode: 200,
    body: JSON.stringify(restaurants)
  };
};
