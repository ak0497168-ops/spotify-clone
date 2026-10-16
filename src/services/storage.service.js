// ✅ Correct import
const ImageKit = require("@imagekit/nodejs");

// ✅ Initialize client
const imagekitClient = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

// ✅ Upload function
async function uploadFile(file) {
  const result = await imagekitClient.upload({
    file, // can be base64 string, file path, or URL
    fileName: "music_" + Date.now(),
    folder: "yt-complete-backend/music"
  });
  return result;
}

module.exports = { uploadFile };
