const AWS = require('aws-sdk');
const fs = require('fs');
require('dotenv').config()

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.SECRET
});

const uploadFile = (filePath, fileName) => {
  const fileContent = fs.readFileSync(filePath);

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName, 
    Body: fileContent
  };

  s3.upload(params, function(err, data) {
      if (err) throw err;

      return data.Location;
  });
}

exports.uploadFile = uploadFile;

