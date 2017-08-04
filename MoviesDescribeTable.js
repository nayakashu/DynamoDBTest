var AWS = require("aws-sdk");

var AWSConfig = require("./config/aws_config_remote")();

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "Movies"
};

console.log("Getting table details...");
dynamodb.describeTable(params, function(err, data) {
    if (err) {
        console.error("Unable to describe the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Table description JSON:", JSON.stringify(data, null, 2));
    }
});