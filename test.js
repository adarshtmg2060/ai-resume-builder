export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "User content is required" });
    }

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gemini-2.0-flash",
      messages: [
        {
          role: "system",
          Content:
            "you are an expert in resume writing. Your task is to enhance the professional summary of a resume. The summary should be 1-2 sentences also highlighting key skills, experience, and career objectives. Make it compelling and ATS-friendly. and only return text no options or anything else. ",
        },
        {
          role: "user",
          Content: userContent,
        },
      ],
    });

    const enhancedContent = response.choices[0].message.content;

    res.status(200).json({ enhancedContent });
  } catch (error) {
    console.error("Error enhancing professional summary:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// controller for enhancing a resume job description using AI
//POST: /api/ai/enhance-job-desc

export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "User content is required" });
    }
    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gemini-2.0-flash",
      messages: [
        {
          role: "system",
          Content:
            "you are an expert in resume writing. Your task is to enhance the job description of a resume. The description should be 1-2 sentences also highlighting key achievements, responsibilities, and skills relevant to the job role.Use action verbs and quantifiable results where possible. Make it compelling and ATS-friendly. and only return text no options or anything else. ",
        },
        {
          role: "user",
          Content: userContent,
        },
      ],
    });

    const enhancedContent = response.choices[0].message.content;

    res.status(200).json({ enhancedContent });
  } catch (error) {
    console.error("Error enhancing job description:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// controller for uploading a resume to the database
// POST: /api/ai/upload-resume

// export const uploadResume = async (req, res) => {
//   try {
//     const { resumeText, title } = req.body;
//     const userId = req.userId;

//     if (!resumeText) {
//       return res.status(400).json({ message: "Resume text is required" });
//     }

//     const systemPrompt =
//       "You are an expert AI agent to extract data from a resume.";

//     const userPrompt = `Extract data from this resume: ${resumeText}
//     Provide data in the following JSON format with no additional text before or after:

//     {
//       professional_summary: "",
//       skills: [""],
//       personal_info: {
//         image: "",
//         full_name: "",
//         profession: "",
//         email: "",
//         phone: "",
//         location: "",
//         linkedin: "",
//         website: ""
//       },
//       experiences: [
//         {
//           company: "",
//           position: "",
//           start_date: "",
//           end_date: "",
//           description: "",
//           is_current: false
//         }
//       ],
//       project: [
//         {
//           name: "",
//           type: "",
//           description: ""
//         }
//       ],
//       education: [
//         {
//           institution: "",
//           degree: "",
//           field: "",
//           graduation_date: "",
//           gpa: ""
//         }
//       ]
//     }
//     `;

//     const response = await ai.chat.completions.create({
//       model: process.env.OPENAI_MODEL || "gpt-4o-mini",
//       messages: [
//         { role: "system", content: systemPrompt },
//         { role: "user", content: userPrompt },
//       ],
//       response_format: { type: "json_object" },
//     });

//     const extractedData = response.choices[0].message.content;
//     const parsedData = JSON.parse(extractedData);

//     const newResume = await Resume.create({
//       userId,
//       title,
//       ...parsedData,
//     });

//     res.json({ resumeId: newResume._id });
//   } catch (error) {
//     console.error("Error uploading resume:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
