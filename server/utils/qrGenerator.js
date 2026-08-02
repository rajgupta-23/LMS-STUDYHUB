const QRCode = require("qrcode");

const generateQRCode = async (certificateId) => {
    try {
        const verificationUrl =
            `${process.env.CLIENT_URL}/verify/${certificateId}`;
        const qrCode =
            await QRCode.toDataURL(verificationUrl);
        return qrCode;
    } catch (error) {
        throw new Error(
            "Failed to generate QR Code"
        );
    }
};

module.exports = generateQRCode;
