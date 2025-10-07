import About from "../models/about.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    if (!about) {
      return res
        .status(404)
        .json({ message: "Hakkımızda bilgisi eklenmemiş." });
    }
    res.status(200).json(about);
  } catch (error) {
    console.log("Error in getAbout controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const upsertAbout = async (req, res) => {
  try {
    const { vision, mission, headerImage } = req.body;

    if (!vision || !mission) {
      return res.status(400).json({ message: "Vizyon ve misyon gerekli." });
    }

    let about = await About.findOne();

    if (!about && !headerImage) {
      return res.status(400).json({ message: "Header image gerekli." });
    }

    if (about) {
      let imageUrl = about.headerImage;

      if (headerImage && headerImage !== about.headerImage) {
        if (!headerImage.startsWith("http")) {
          const cloudinaryRes = await cloudinary.uploader.upload(headerImage, {
            folder: "about",
          });
          imageUrl = cloudinaryRes.secure_url;

          if (about.headerImage) {
            const publicId = about.headerImage.split("/").pop().split(".")[0];
            await cloudinary.uploader
              .destroy(`about/${publicId}`)
              .catch(console.log);
          }
        } else {
          imageUrl = headerImage;
        }
      }

      about.headerImage = imageUrl;
      about.vision = vision;
      about.mission = mission;
      await about.save();
      return res.status(200).json(about);
    } else {
      let imageUrl = headerImage;

      if (!headerImage.startsWith("http")) {
        const cloudinaryRes = await cloudinary.uploader.upload(headerImage, {
          folder: "about",
        });
        imageUrl = cloudinaryRes.secure_url;
      }

      about = new About({
        headerImage: imageUrl,
        vision,
        mission,
      });
      await about.save();
      return res.status(201).json(about);
    }
  } catch (error) {
    console.log("Error in upsertAbout controller:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
