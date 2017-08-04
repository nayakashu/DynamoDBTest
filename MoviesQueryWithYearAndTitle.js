var AWS = require("aws-sdk");

var AWSConfig = require("./config/aws_config_remote")();

var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
    TableName : "Movies",

    /**
     * ProjectionExpression specifies the attributes you want in the query result.
     */
    ProjectionExpression:"#yr, title, info.genres, info.actors[0]",
    KeyConditionExpression: "#yr = :yyyy and title between :letter1 and :letter2",
    ExpressionAttributeNames:{
        "#yr": "year"
    },
    ExpressionAttributeValues: {
        ":yyyy": 1992,
        ":letter1": "A",
        ":letter2": "L"
    }
};

console.log("Querying for movies from " + params.ExpressionAttributeValues[":yyyy"] + " - titles A-L, with genres and lead actor");

docClient.query(params, function(err, data) {
    if (err) {
        console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log(" -", item.year + ": " + item.title
            + " ... " + item.info.genres
            + " ... " + item.info.actors[0]);
        });
    }
});