require('dotenv').config()

const AWS = require('aws-sdk');
const fs = require('fs');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET
});

const uploadFile = async (filePath, fileName) => {
  const fileContent = fs.readFileSync(filePath);

  if (!fileName) {
    return console.error('Not send `fileName` in params');
  }

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName, 
    Body: fileContent
  };

  const Location = await s3.upload(params, function(err, data) {
      if (err) throw err;
      return data.Location;
  });

  return console.log(Location);
}

exports.uploadFile = uploadFile;

