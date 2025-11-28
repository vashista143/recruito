import User from "../lib/models/user.js"
import DB from "../lib/connectdb.js"

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  await DB.connect()

  try {
    const { userid, name, education, university, gender, dateOfBirth, mobile, email, location } = req.body

    if (!userid) {
      return res.status(400).json({ message: "User id missing" })
    }

    const updatedUser = await User.findByIdAndUpdate(
      userid,
      {
        name,
        education,
        university,
        gender,
        dateOfBirth,
        mobile,
        email,
        location
      },
      { new: true }
    )

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" })
    }

    return res.json({
      message: "User updated successfully",
      user: updatedUser
    })

  } catch (error) {
    console.error("Update user error", error)
    return res.status(500).json({ message: "Internal server error" })
  }
}
