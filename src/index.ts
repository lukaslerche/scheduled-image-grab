import { Cron } from "croner";
import fs from "fs";
import crypto from "crypto";

let previousImageHash: string | null = null;

const calculateMD5 = (buffer: ArrayBuffer) => {
    const hash = crypto.createHash('md5');
    hash.update(Buffer.from(buffer));
    return hash.digest('hex');
}

const grabImage = async (imageSourceUrl: string, imageSavePath: string, imageSaveName: string, imageExtension: string) => {
    try {
        const response = await fetch(imageSourceUrl);
        const buffer = await response.arrayBuffer();
        const currentImageHash = calculateMD5(buffer);

        if (currentImageHash !== previousImageHash) {
            if (!fs.existsSync(imageSavePath)) {
                fs.mkdirSync(imageSavePath, { recursive: true });
            }

            const files = fs.readdirSync(imageSavePath);
            const existingImage = files.find(file => file.includes(currentImageHash));

            if (!existingImage) {
                fs.writeFileSync(`${imageSavePath}/${imageSaveName}_${currentImageHash}${imageExtension}`, Buffer.from(buffer));
                console.log("Image grabbed and saved successfully");
                previousImageHash = currentImageHash;
            } else {
                console.log("Skip: Image with the same MD5 already in folder.");
                previousImageHash = currentImageHash;
            }
        } else {
            console.log("Skip: MD5 has not changed since last grab.");
        }
    } catch (error) {
        console.error("Failed to grab and save image:", error);
    }
};



console.log("Starting image grab. This will run every minute");
const cron = new Cron("* * * * *", () => {
    console.log("Running image grab at "+ new Date().toISOString() + "...");
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();
    const imageName = `${formattedDate}`;
    grabImage("https://baublog.ub.tu-dortmund.de/webcam/current.jpg", "images", imageName, ".jpg");
});

