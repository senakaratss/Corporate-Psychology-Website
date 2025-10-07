const EmergencyContact = () => {
  return (
    <div className="bg-gradient-to-b from-red-100  to-red-50 shadow-xl rounded-lg p-6">
      <h3 className="text-lg font-bold mb-2">Acil Durum</h3>
      <p className="text-gray-600 text-sm mb-2">
        Acil psikolojik yardım ihtiyacınız varsa:
      </p>
      <div className="space-y-2">
        <p className="font-medium">🚨 Kriz Hattı: 112</p>
        <p className="font-medium">📞 7/24 Destek: (312) 234 56 99</p>
      </div>
    </div>
  );
};

export default EmergencyContact;
