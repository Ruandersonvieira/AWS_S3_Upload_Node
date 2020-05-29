const AWS = require('aws-sdk');

require('dotenv').config()



// Criar Bucket

// Enter copied or downloaded access ID and secret key here
const ID = process.env.AWS_ID;
const SECRET = process.env.AWS_KEY;

// The name of the bucket that you have created
const BUCKET_NAME = 'ruandersonveiira';


const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET
});

// const params = {
//   Bucket: BUCKET_NAME,
//   // CreateBucketConfiguration: {
//   //     LocationConstraint: "eu-west-1"
//   // }
// };

// s3.createBucket(params, function(err, data) {
//   if (err) console.log(err, err.stack);
//   else console.log('Bucket Created Successfully', data.Location);
// });




const fs = require('fs');

const uploadFile = (fileName) => {
  // Read content from the file
  const fileContent = fs.readFileSync(fileName);

  // Setting up S3 upload parameters
  const params = {
      Bucket: BUCKET_NAME,
      Key: 'rocket.jpeg', // File name you want to save as in S3
      Body: fileContent
  };

  // Uploading files to the bucket
  s3.upload(params, function(err, data) {
      if (err) {
          throw err;
      }
      console.log(`File uploaded successfully. ${data.Location}`);
  });
};


uploadFile('rocket.jpeg');
