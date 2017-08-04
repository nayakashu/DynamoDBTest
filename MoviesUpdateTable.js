var AWS = require("aws-sdk");

var AWSConfig = require("./config/aws_config_remote")();

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "Movies",
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 1
    }
};

console.log("Trying to update the table...");
dynamodb.updateTable(params, function(err, data) {
    if (err) {
        console.error("Unable to update the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Updated table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});