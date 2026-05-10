import * as fs from "fs";
import * as path from "path";
import { v4 as uuidv4 } from "uuid";

export function saveBase64Image(base64String: string, uploadDir: string): string | null {
  if (!base64String) return null;

  try {
    // Determine file extension
    let extension = "png";
    let dataString = base64String;

    if (base64String.startsWith("data:")) {
      const matches = base64String.match(/^data:image\/([a-zA-Z+]+);base64,(.+)$/);
      if (matches && matches.length === 3) {
        extension = matches[1] === "jpeg" ? "jpg" : matches[1];
        dataString = matches[2];
      }
    }

    const buffer = Buffer.from(dataString, "base64");
    const filename = `${uuidv4()}.${extension}`;
    const fullPath = path.join(process.cwd(), uploadDir, filename);

    // Ensure directory exists
    const targetDir = path.dirname(fullPath);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    fs.writeFileSync(fullPath, buffer);
    
    // Return relative URL path
    return `/${uploadDir.replace(/\\/g, "/")}/${filename}`;
  } catch (error) {
    console.error("Error saving base64 image:", error);
    return null;
  }
}
