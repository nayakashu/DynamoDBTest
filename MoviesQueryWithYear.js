var AWS = require("aws-sdk");

var AWSConfig = require("./config/aws_config_remote")();

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Querying for movies from 1985.");

var params = {
    TableName : "Movies",
    
    /**
     * ExpressionAttributeNames provides name substitution. 
     * We use this because year is a reserved word in DynamoDB,
     * you cannot use it directly in any expression, 
     * including KeyConditionExpression. 
     * We use the expression attribute name #yr to address this.
     */
    KeyConditionExpression: "#yr = :yyyy",

    /**
     * ExpressionAttributeValues provides value substitution. 
     * We use this because you cannot use literals in any expression, 
     * including KeyConditionExpression. 
     * We use the expression attribute value :yyyy to address this.
     */
    ExpressionAttributeNames:{
        "#yr": "year"
    },
    ExpressionAttributeValues: {
        ":yyyy":1985
    }
};

docClient.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log(" -", item.year + ": " + item.title);
        });
    }
});
