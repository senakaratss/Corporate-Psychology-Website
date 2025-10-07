import Appointment from "../models/appointment.model.js";

export const createAppointment = async (req, res) => {
  try {
    const { service, date, time, fullName, email, phone, age, note } = req.body;

    if (!service || !date || !time || !fullName || !email || !phone) {
      return res.status(400).json({
        message:
          "Lütfen hizmet, tarih, saat, ad-soyad, email ve telefon alanlarını doldurun.",
      });
    }

    // Aynı gün + saat için önceden alınmış randevu var mı?
    const existing = await Appointment.findOne({ date, time });
    if (existing) {
      return res
        .status(400)
        .json({ message: "Bu saat dolu. Lütfen başka bir saat seçin." });
    }

    const newAppointment = new Appointment({
      service,
      date,
      time,
      fullName,
      email,
      phone,
      age,
      note,
    });

    await newAppointment.save();
    res.status(201).json({ message: "Randevu başarıyla oluşturuldu." });
  } catch (error) {
    console.log("Error in createAppointment controller:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .sort({ date: 1, time: 1 })
      .populate("service");
    res.status(200).json(appointments);
  } catch (error) {
    console.log("Error in getAppointments controller:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getBookedTimes = async (req, res) => {
  try {
    const { date } = req.params;
    const appointments = await Appointment.find({ date }).select("time -_id");
    res.status(200).json(appointments.map((a) => a.time));
  } catch (error) {
    console.log("Error in getBookedTimes controller:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
