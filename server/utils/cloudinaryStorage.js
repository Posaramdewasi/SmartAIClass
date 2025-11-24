import pkg from 'multer-storage-cloudinary';
import multer from 'multer';
import cloudinary from '../services/cloudinary.js';

const CloudinaryStorage = (pkg && (pkg.CloudinaryStorage ?? pkg.default?.CloudinaryStorage)) || pkg;

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: `SmartAIClass/${req.userId || "anonymous"}`,
    resource_type: 'raw',
    allowed_formats: ['pdf', 'txt'],
     public_id: `${Date.now()}_${file.originalname.replace(/\.[^/.]+$/, "")}`,
     format: 'pdf'
  }),
});

const upload = multer({ storage });

export default upload;