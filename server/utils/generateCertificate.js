const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const generateCertificate = (
    userName,
    courseName,
    certificateId,
    issueDate
) => {
    return new Promise((resolve, reject) => {
        try {
            const folderPath = path.join(__dirname, "../uploads/certificates");
            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath, { recursive: true });
            }
            const filePath = path.join(folderPath, `${certificateId}.pdf`);
            const doc = new PDFDocument({
                layout: "landscape",
                size: "A4",
                margin: 0,
            });
            const stream = fs.createWriteStream(filePath);
            doc.pipe(stream);
            const templatePath = path.join(
                __dirname,
                "../certificate-template.png"
            );
            console.log("Template Path:", templatePath);
            console.log("Template Exists:", fs.existsSync(templatePath));

            if (fs.existsSync(templatePath)) {
                try {
                    // doc.image(templatePath, 0, 0, {
                    //     fit: [842, 595],
                    //     align: "center",
                    //     valign: "center",
                    // });
                    console.log(" Template loaded");
                } catch (err) {
                    console.error(" Image Error:", err);
                }
            }
            doc
                .font("Helvetica-Bold")
                .fontSize(34)
                .fillColor("#0B2D5C")
                .text(userName, 0, 245, {
                    align: "center",
                });
            doc
                .font("Helvetica-Bold")
                .fontSize(22)
                .fillColor("#0B2D5C")
                .text(courseName, 0, 355, {
                    align: "center",
                });
            doc
                .font("Helvetica")
                .fontSize(14)
                .fillColor("#0B2D5C")
                .text(
                    new Date(issueDate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                    }),
                    70,
                    535
                );
            doc
                .font("Helvetica")
                .fontSize(14)
                .fillColor("#0B2D5C")
                .text(certificateId, 640, 535);

            // Finish PDF
            doc.end();

            stream.on("finish", () => {
                resolve(filePath);
            });

            stream.on("error", (err) => {
                reject(err);
            });

        } catch (err) {
            reject(err);
        }
    });
};

module.exports = generateCertificate;