import PrivateService from "../models/privateService.model.js";

export const getPrivateServices = async (req, res) => {
  try {
    const services = await PrivateService.find({});

    if (!services || services.length === 0) {
      return res
        .status(404)
        .json({ message: "Henüz hiç özel hizmet eklenmemiş." });
    }
    return res.status(200).json(services);
  } catch (error) {
    console.log("Error in getPrivateServices controller:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export const addPrivateService = async (req, res) => {
  try {
    const { icon, title, description } = req.body;

    if (!icon || !title || !description) {
      return res.status(400).json({ message: "Gerekli alanları doldurunuz" });
    }

    const newPrivateService = new PrivateService({
      icon,
      title,
      description,
    });

    await newPrivateService.save();
    res.status(201).json(newPrivateService);
  } catch (error) {
    console.log("Error in addPrivateService controller:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deletePrivateService = async (req, res) => {
  try {
    const serviceId = req.params.id;

    const deleted = await PrivateService.findByIdAndDelete(serviceId);
    if (!deleted) {
      return res.status(404).json({ message: "Özel Hizmet bulunamadı" });
    }

    res.status(200).json({ message: "Özel Hizmet başarıyla silindi" });
  } catch (error) {
    console.log("Error in deletePrivateService controller:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export const updatePrivateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, shortDescription, icon, features, duration } =
      req.body;

    const service = await PrivateService.findById(id);
    if (!service) {
      return res.status(404).json({ message: "Hizmet bulunamadı" });
    }
    if (icon !== undefined) service.icon = icon;
    if (title !== undefined) service.title = title;
    if (description !== undefined) service.description = description;

    const updatedService = await service.save();
    res.status(200).json(updatedService);
  } catch (error) {
    console.log("Error in updatePrivateService controller:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
