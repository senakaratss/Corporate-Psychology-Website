import FAQ from "../models/faq.model.js";

export const getFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find().sort({ createdAt: -1 });
    res.status(200).json(faqs);
  } catch (error) {
    console.log("Error in getFAQs controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ message: "Soru ve cevap gerekli" });
    }

    const faq = new FAQ({ question, answer });
    await faq.save();

    res.status(201).json(faq);
  } catch (error) {
    console.log("Error in addFAQ controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteFAQ = async (req, res) => {
  try {
    const deleted = await FAQ.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "SSS bulunamadı" });
    }

    res.status(200).json({ message: "SSS silindi" });
  } catch (error) {
    console.log("Error in deleteFAQ controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
