import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: process.env.CLOUDINARY_FOLDER_NAME,
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
        public_id: (req, file) => `img-${Date.now()}`,
        quality: 'auto:good',
        fetch_format: 'auto',
        transformation: [
            { width: 1920, crop: 'limit' },
            { quality: 'auto:eco' }
        ]
    }
});

export const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/image\/(jpeg|jpg|png|gif|webp)/)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'), false);
        }
    }
});

export const uploadImage = (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: 'No image file provided'
        });
    }

    return res.status(200).json({
        success: true,
        imageUrl: req.file.path,
        publicId: req.file.filename
    });
};

export const deleteImage = async (imageUrl) => {
    const publicId = process.env.CLOUDINARY_FOLDER_NAME+"/"+imageUrl.split('/').pop().split('.')[0];
    console.log(publicId);
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        console.log(result);
        return result;
    } catch (error) {
        console.error('Error deleting image:', error);
        throw error;
    }
};