import Blog from "../models/blog.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("category", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(blogs);
  } catch (error) {
    console.log("Error in getBlogs controller:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "category",
      "name"
    );

    if (!blog) {
      return res.status(404).json({ message: "Blog bulunamadı" });
    }

    res.status(200).json(blog);
  } catch (error) {
    console.log("Error in getBlogById controller:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addBlog = async (req, res) => {
  try {
    const { title, summary, content, author, category, image, readTime } =
      req.body;

    if (!title || !summary || !content || !author || !category || !image) {
      return res
        .status(400)
        .json({ message: "Lütfen tüm zorunlu alanları doldurun" });
    }

    let cloudinaryResponse = null;
    if (image) {
      cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "blogs",
      });
    }

    const blog = new Blog({
      title,
      summary,
      content,
      author,
      category,
      image: cloudinaryResponse?.secure_url
        ? cloudinaryResponse.secure_url
        : "",
      readTime,
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    console.log("Error in addBlog controller:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { title, summary, content, author, category, image, readTime } =
      req.body;

    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog bulunamadı" });
    }

    let imageUrl = blog.image;
    if (image && image !== blog.image) {
      // eski resmi sil
      if (blog.image) {
        const publicId = blog.image.split("/").pop().split(".")[0];
        try {
          await cloudinary.uploader.destroy(`blogs/${publicId}`);
          console.log("Eski görsel silindi");
        } catch (error) {
          console.log("Cloudinary silme hatası:", error.message);
        }
      }

      const cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "blogs",
      });
      imageUrl = cloudinaryResponse?.secure_url;
    }

    // Blogu güncelle
    blog.title = title || blog.title;
    blog.summary = summary || blog.summary;
    blog.content = content || blog.content;
    blog.author = author || blog.author;
    blog.category = category || blog.category;
    blog.readTime = readTime || blog.readTime;
    blog.image = imageUrl;

    const updatedBlog = await blog.save();

    res.status(200).json(updatedBlog);
  } catch (error) {
    console.log("Error in updateBlog controller:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog bulunamadı" });
    }
    if (blog.image) {
      const publicId = blog.image.split("/").pop().split(".")[0];
      try {
        await cloudinary.uploader.destroy(`blogs/${publicId}`);
        console.log("deleted image from cloudinary");
      } catch (error) {
        console.log("error deleting image from cloudinary", error);
      }
    }
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.log("Error in deleteBlog controller:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
