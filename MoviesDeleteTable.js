var AWS = require("aws-sdk");

var AWSConfig = require("./config/aws_config_remote")();

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "Movies_Gallery"
};

dynamodb.deleteTable(params, function(err, data) {
    if (err) {
        console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Deleted table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});