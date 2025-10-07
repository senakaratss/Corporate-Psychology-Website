import Message from "../models/message.model.js";

export const addMessage = async (req, res) => {
  try {
    const { fullName, phone, email, subject, message } = req.body;

    if (!fullName || !phone || !email || !message) {
      return res.status(400).json({ message: "Zorunlu alanları doldurun." });
    }

    const newMessage = new Message({
      fullName,
      phone,
      email,
      subject,
      message,
    });

    await newMessage.save();
    res.status(201).json({ message: "Mesaj başarıyla gönderildi." });
  } catch (error) {
    console.log("Error in addMessage controller:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    await Message.findByIdAndDelete(id);
    res.status(200).json({ message: "Mesaj silindi." });
  } catch (error) {
    console.log("Error in deleteMessage controller:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
