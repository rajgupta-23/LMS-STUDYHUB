const cloudinary = require("../config/cloudinary");

const uploadCertificate = async (filePath, certificateId) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: "lms-certificates",
            resource_type: "raw", // PDF upload
            public_id: certificateId,
            overwrite: true,
        });

        return result.secure_url;
    } catch (error) {
        throw new Error("Certificate upload failed: " + error.message);
    }
};

module.exports = uploadCertificate;