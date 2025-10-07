import Admin from "../models/admin.model.js";

export const createInitialAdmin = async () => {
  const existing = await Admin.findOne({ username: "admin" });
  if (existing) return;

  const admin = new Admin({
    username: "admin",
    password: process.env.ADMIN_PASSWORD, // güvenli şifreyi env dosyasından da alabilirsin
  });

  await admin.save();
  console.log("İlk admin oluşturuldu");
};
