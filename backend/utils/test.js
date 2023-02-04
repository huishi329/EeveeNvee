const AWS = require("aws-sdk");
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });
const fetch = require('node-fetch');
require('dotenv').config();

const NAME_OF_BUCKET = "eeveenvee";

const uploadImageFromURL = async url => {
    const buffer = await fetch(url).then(res => res.buffer());
    // use the last segment of the url as key
    const key = new URL(url).pathname.split('/').pop();
    const uploadParams = {
        Bucket: NAME_OF_BUCKET,
        Key: key,
        Body: buffer,
        ACL: "public-read",
    };
    const result = await s3.upload(uploadParams).promise();
    return result.Location
};

uploadImageFromURL("https://a0.muscache.com/im/pictures/miso/Hosting-24372539/original/1ac7e1c6-e80b-4b74-9377-245c55c208d3.jpeg?im_w=1200")
