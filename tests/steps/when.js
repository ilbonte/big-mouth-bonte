const APP_ROOT = '../../'
const _ = require('lodash')

let we_invoke_get_index = async function () {
    let handler = require(`${APP_ROOT}/functions/get-index`).handler

    return new Promise((resolve, reject) => {
        let context = {}

        let callback = function (err, response) {
            if (err) {
                reject(err)
            } else {
                let contentType = _.get(response, 'headers.Content-Type', 'application/json')
                if (response.body && contentType === 'application/json')
                    response.body = JSON.parse(response.body)

                resolve(response)
            }
        }

        handler({}, context, callback)

    })

}

module.exports = {
    we_invoke_get_index
}