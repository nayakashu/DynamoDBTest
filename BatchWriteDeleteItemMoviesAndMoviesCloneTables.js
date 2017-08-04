var AWS = require("aws-sdk");

var AWSConfig = require("./config/aws_config_remote")();

var dynamodb = new AWS.DynamoDB();

var params = {
    RequestItems: {
        Movies: [
            {
                DeleteRequest: {
                    Key: {
                        "year": {
                            "N": "2017"
                        },
                        "title": {
                            "S": "Rockstar"
                        }
                    }
                }
            },
            {
                DeleteRequest: {
                    Key: {
                        "year": {
                            "N": "2017"
                        },
                        "title": {
                            "S": "Spiderman Homecoming"
                        }
                    }
                }
            },
            {
                DeleteRequest: {
                    Key: {
                        "year": {
                            "N": "2017"
                        },
                        "title": {
                            "S": "Transformers Dark Knight"
                        }
                    }
                }
            },
            {
                DeleteRequest: {
                    Key: {
                        "year": {
                            "N": "2017"
                        },
                        "title": {
                            "S": "2.0"
                        }
                    }
                }
            }
        ],
        Movies_Clone: [
            {
                DeleteRequest: {
                    Key: {
                        "year": {
                            "N": "2018"
                        },
                        "title": {
                            "S": "Avengers Infinity Stone"
                        }
                    }
                }
            },
            {
                DeleteRequest: {
                    Key: {
                        "year": {
                            "N": "2018"
                        },
                        "title": {
                            "S": "U2"
                        }
                    }
                }
            },
            {
                DeleteRequest: {
                    Key: {
                        "year": {
                            "N": "2018"
                        },
                        "title": {
                            "S": "Avataar 2"
                        }
                    }
                }
            },
            {
                DeleteRequest: {
                    Key: {
                        "year": {
                            "N": "2018"
                        },
                        "title": {
                            "S": "Thor Ragnarok"
                        }
                    }
                }
            }
        ]
    },
    ReturnConsumedCapacity: "TOTAL"
};

console.log("Trying to delete items in a batch from Movies and Movies_Clone...");

dynamodb.batchWriteItem(params, onBatchWriteItem);

var writeItemBatchCounter = 0;

function onBatchWriteItem(err, data) {
    if (err) {
        console.error("Unable to process BatchWriteItem. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("BatchWriteItem response " + (++writeItemBatchCounter) + " JSON:", JSON.stringify(data, null, 2));
        if(JSON.stringify(data.UnprocessedItems) != "{}") {
            params.RequestItems = data.UnprocessedItems;
            dynamodb.onBatchWriteItem(params, onBatchWriteItem);
        }
    }
}