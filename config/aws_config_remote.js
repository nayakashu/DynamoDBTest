var AWS = require("aws-sdk");

function AWSConfig() {
  AWS.config.update({
    region: "ap-south-1",
    endpoint: "dynamodb.ap-south-1.amazonaws.com"
  });
}

module.exports = AWSConfig;