import Resume from "../models/Resume.js";
import fs from "fs";

import { ImageKit } from "@imagekit/nodejs";

const imageKit = new ImageKit({
  publicKey: "public_mCeMHEZMEQTAHUhEQy74wc/tWDk=",
  privateKey: "private_e4TEYWR7z8NTADUsoeteLRJo7EY=",
  urlEndpoint: "https://ik.imagekit.io/x7xxa304at", // Required
});

// controller for creating a resume
// POST: /api/resumes/create
export const createResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { title } = req.body;

    // create new resume
    const newResume = await Resume.create({
      userId,
      title,
    });
    // return success message
    return res
      .status(201)
      .json({ message: "Resume created successfully", resume: newResume });
  } catch (error) {
    console.error("Error in creating resume:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// controller for deleting a resume
// DELETE: /api/resumes/delete
export const deleteResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    await Resume.findOneAndDelete({ userId, _id: resumeId });

    // return success message
    return res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    console.error("Error in deleting resume:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// get user resumes by id
// GET: /api/resumes/get

export const getResumeById = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    const resume = await Resume.findOne({ userId, _id: resumeId });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    resume.__v = undefined; // hide __v field
    resume.createdAt = undefined; // hide createdAt field
    resume.updatedAt = undefined; // hide updatedAt field

    // return resume
    return res.status(200).json({ resume });
  } catch (error) {
    console.error("Error in getting resume by ID:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// controller for get resume by id public
// GET: /api/resumes/public

export const getPublicResumeById = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const resume = await Resume.findById({ public: true, _id: resumeId });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    // return resume
    return res.status(200).json({ resume });
  } catch (error) {
    console.error("Error in getting public resume by ID:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// controller for updating a resume
// PUT: /api/resumes/update

export const updateResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId, resumeData, removeBackground } = req.body;
    const image = req.file;

    // Parse resumeData if it comes as string
    let resumeDataCopy =
      typeof resumeData === "string"
        ? JSON.parse(resumeData)
        : structuredClone(resumeData);

    // Handle image upload
    if (image) {
      // 2. Define the base upload parameters
      const uploadParams = {
        file: fs.createReadStream(image.path),
        fileName: `resume-${Date.now()}.png`, // Add timestamp for uniqueness
        folder: "user-resumes",
      };

      // Upload to ImageKit
      const response = await imageKit.files.upload(uploadParams);

      // Save uploaded image URL in resume data
      resumeDataCopy.personal_info.image = response.url;

      // Optional: delete local file after upload
      fs.unlink(image.path, (err) => {
        if (err) console.error("Error deleting temp file:", err);
      });
    }

    // Update resume in DB
    const resume = await Resume.findOneAndUpdate(
      { userId, _id: resumeId },
      { $set: resumeDataCopy },
      { new: true }
    );

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.status(200).json({
      message: "Resume updated successfully",
      resume,
    });
  } catch (error) {
    console.error("Error in updating resume:", error);

    // Use detailed error information from the ImageKit SDK error object
    if (error.status && error.error) {
      return res.status(error.status).json({
        message:
          error.error.message || "Image upload failed due to ImageKit error",
      });
    }

    res.status(500).json({ message: "Server Error" });
  }
};
