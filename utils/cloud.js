const cloudinary = require("cloudinary").v2
cloudinary.config({ 
    cloud_name: process.env.cloud_name, 
    api_key: process.env.api_key, 
    api_secret: process.env.api_secret
  });

const uploadToCloudinary = async (path, folder) => {
    const image = await cloudinary.uploader.upload(path, {folder})
    return image
}

const deleteFromCloudinary = async (id) => {
    await cloudinary.destroy(id, (error, result) => console.log(result))
}

module.exports = {uploadToCloudinary, deleteFromCloudinary}