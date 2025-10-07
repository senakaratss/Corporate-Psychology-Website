import ContactInfo from "../models/contact.model.js";

export const getContactInfo = async (req, res) => {
  try {
    const info = await ContactInfo.findOne();
    if (!info) {
      return res
        .status(404)
        .json({ message: "Henüz iletişim bilgisi eklenmemiş." });
    }
    res.status(200).json(info);
  } catch (error) {
    console.log("Error in getContactInfo controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const upsertContactInfo = async (req, res) => {
  try {
    const {
      companyName,
      companyDescription,
      website,
      workingHours,
      tel,
      phone,
      email,
      address,
      facebook,
      instagram,
      twitter,
    } = req.body;

    if (!tel || !email || !address) {
      return res
        .status(400)
        .json({ message: "Telefon, e-posta ve adres gerekli." });
    }

    let info = await ContactInfo.findOne();

    if (info) {
      // mevcut obje varsa güncelle
      info.companyName = companyName;
      info.companyDescription = companyDescription;
      info.website = website;
      info.workingHours = workingHours;
      info.phone = phone;
      info.tel = tel;
      info.email = email;
      info.address = address;
      info.facebook = facebook;
      info.instagram = instagram;
      info.twitter = twitter;
      await info.save();
      return res.status(200).json(info);
    } else {
      // yoksa oluştur
      info = new ContactInfo({
        companyName,
        companyDescription,
        website,
        workingHours,
        phone,
        tel,
        email,
        address,
        facebook,
        instagram,
        twitter,
      });
      await info.save();
      return res.status(201).json(info);
    }
  } catch (error) {
    console.log("Error in upsertContactInfo controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
