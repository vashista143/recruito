import { v2 as cloudinary } from "cloudinary"
import formidable from "formidable"
import fs from "fs"
import os from "os"
import { PDFParse } from "pdf-parse"   // ✅ correct import for v2
import User from "../lib/models/user.js"
import db from "../lib/connectdb.js"

export const config = {
  api: { bodyParser: false }
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  await db.connect()

  try {
    const form = formidable({
      multiples: false,
      uploadDir: os.tmpdir(),    // ✅ always exists
      keepExtensions: true,
      maxFileSize: 2 * 1024 * 1024,
    })

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("FORM PARSE ERROR:", err)
        return res.status(400).json({ message: "Invalid form data" })
      }

      const userId = fields.userid?.[0] || fields.userid
      const file = files.resume?.[0]

      if (!file) return res.status(400).json({ message: "No file uploaded" })

      // ✅ fileBuffer OK
      const fileBuffer = fs.readFileSync(file.filepath)

      // ✅ Upload to Cloudinary
      const uploaded = await cloudinary.uploader.upload(file.filepath, {
  resource_type: "auto",
  folder: "resumes",
  public_id: `${userId}-${Date.now()}`
})



      // ✅ pdf-parse v2 — absolutely correct usage
      const parser = new PDFParse({ data: fileBuffer })
      const parsedPdf = await parser.getText()
      const parsedText = parsedPdf.text

      // ✅ Save to DB
      await User.findByIdAndUpdate(userId, {
        resumePdfUrl: uploaded.secure_url,
        resumeParsedText: parsedText,
      })

      return res.status(200).json({
        message: "Resume uploaded and parsed successfully",
        resumeUrl: uploaded.secure_url,
        textLength: parsedText.length,
      })
    })

  } catch (error) {
    console.error("UPLOAD ERROR:", error)
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    })
  }
}
