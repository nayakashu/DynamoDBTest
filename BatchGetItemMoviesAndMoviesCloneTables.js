var AWS = require("aws-sdk");

var AWSConfig = require("./config/aws_config_remote")();

var dynamodb = new AWS.DynamoDB();

var params = {
    RequestItems: {
        Movies: {
            ExpressionAttributeNames:{
                "#yr": "year"
            },
            Keys: [
                {
                    "year": { "N": "2013" },
                    "title": { "S": "Rush" }
                }
                // ,
                // {
                //     "year": { "N": "2013" },
                //     "title": { "S": "Prisoners" }
                // },
                // {
                //     "year": { "N": "2013" },
                //     "title": { "S": "The Hunger Games: Catching Fire" }
                // }
            ],
            ProjectionExpression: "#yr, title, info.rating, info.plot",
            ConsistentRead: true
            // AttributesToGet: [ // option (attributes to retrieve from this table)
            //     "info.rating", "info.plot"
            //     // ... more attribute names ...
            // ]
        },
        Movies_Clone: {
            ExpressionAttributeNames:{
                "#yr": "year"
            },
            Keys: [
                {
                    "year": { "N": "2013" },
                    "title": { "S": "Thor: The Dark World" }
                }
                // ,
                // {
                //     "year": { "N": "2013" },
                //     "title": { "S": "This Is the End" }
                // }
            ],
            ProjectionExpression: "#yr, title, info.directors[0], info.actors[0]",
            ConsistentRead: true
        }
    },
    ReturnConsumedCapacity: "TOTAL"
};

console.log("Trying to get items in batch from Movies and Movies_Clone...");
dynamodb.batchGetItem(params, onBatchGetItem);

var getItemBatchCounter = 0;
function onBatchGetItem(err, data) {
    if (err) {
        console.error("Unable to process BatchGetItem. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("BatchGetItem response " + (++getItemBatchCounter) + " JSON:", JSON.stringify(data, null, 2));
        if(JSON.stringify(data.UnprocessedKeys) != "{}") {
            params.RequestItems = data.UnprocessedKeys;
            dynamodb.batchGetItem(params, onBatchGetItem);
        }
    }
}