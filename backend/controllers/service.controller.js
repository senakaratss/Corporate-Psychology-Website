import Service from "../models/service.model.js";

export const addService = async (req, res) => {
  try {
    const { icon, title, description, shortDescription, features, duration } =
      req.body;

    if (!icon || !title || !description || !shortDescription) {
      return res.status(400).json({ message: "Gerekli alanları doldurunuz" });
    }

    const newService = new Service({
      icon,
      title,
      description,
      shortDescription,
      features,
      duration,
    });

    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    console.log("Error in addService controller:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getServices = async (req, res) => {
  try {
    const services = await Service.find({});

    if (!services || services.length === 0) {
      return res.status(404).json({ message: "Henüz hiç hizmet eklenmemiş." });
    }
    return res.status(200).json(services);
  } catch (error) {
    console.log("Error in getServices controller:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export const deleteService = async (req, res) => {
  try {
    const serviceId = req.params.id;

    const deleted = await Service.findByIdAndDelete(serviceId);
    if (!deleted) {
      return res.status(404).json({ message: "Hizmet bulunamadı" });
    }

    res.status(200).json({ message: "Hizmet başarıyla silindi" });
  } catch (error) {
    console.log("Error in deleteService controller:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, shortDescription, icon, features, duration } =
      req.body;

    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ message: "Hizmet bulunamadı" });
    }
    if (title !== undefined) service.title = title;
    if (description !== undefined) service.description = description;
    if (shortDescription !== undefined)
      service.shortDescription = shortDescription;
    if (icon !== undefined) service.icon = icon;
    if (features !== undefined) service.features = features;
    if (duration !== undefined) service.duration = duration;

    const updatedService = await service.save();
    res.status(200).json(updatedService);
  } catch (error) {
    console.log("Error in updateService controller:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({ message: "Hizmet bulunamadı" });
    }
    return res.status(200).json(service);
  } catch (error) {
    console.log("Error in getServiceById controller:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
