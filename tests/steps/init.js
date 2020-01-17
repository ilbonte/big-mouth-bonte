const awscred = require("awscred")
const util = require("util")
const load = util.promisify(awscred.load)


let initalize = false;
let init = async function () {
    if (initalize)
        return

    process.env.restaurants_api = "https://o7pjcegau3.execute-api.eu-west-1.amazonaws.com/dev/restaurants";
    process.env.restaurants_table = "restaurants-bonte";
    process.env.AWS_REGION = "eu-west-1";
    process.env.cognito_user_pool_id = "test_cognito_user_pool_id";
    process.env.cognito_client_id = "test_cognito_client_id";

    const cred = await load()

    process.env.AWS_ACCESS_KEY_ID = cred.credentials.accessKeyId;
    process.env.AWS_SECRET_ACCESS_KEY = cred.credentials.secretAccessKey;

    console.log(`AWS credential loaded`);
}

module.exports = {
    init
}