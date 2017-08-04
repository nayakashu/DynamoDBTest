var AWS = require("aws-sdk");

var AWSConfig = require("./config/aws_config_remote")();

var dynamodb = new AWS.DynamoDB();

var params = {
    Limit: 1
};

var listCounter = 0;
console.log("Trying to list the tables...");
dynamodb.listTables(params, onList);

function onList(err, data) {
    if (err) {
        console.error("Unable to list the tables. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Table List " + (++listCounter)  + " JSON:", JSON.stringify(data, null, 2));
        if(data.hasOwnProperty("LastEvaluatedTableName")) {
            params = {
                "ExclusiveStartTableName": data.LastEvaluatedTableName,
                "Limit": 1
            }
            dynamodb.listTables(params, onList);
        } else {
            console.log("Listing table ends...");
        }
    }
}