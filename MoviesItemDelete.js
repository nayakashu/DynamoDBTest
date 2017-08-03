var AWS = require("aws-sdk");

var AWSConfig = require("./config/aws_config_remote")();

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "Movies";

var year = 2013;
var title = "Prisoners";

var params = {
    TableName:table,
    Key:{
        "year":year,
        "title":title
    }
};

console.log("Attempting a delete...");
docClient.delete(params, function(err, data) {
    if (err) {
        console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
    }
});
