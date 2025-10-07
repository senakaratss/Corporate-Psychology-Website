import { ArrowLeft, CheckCircle2, Clock, DollarSign, Edit } from "lucide-react";
import React from "react";
import { useNavigate, Link, useParams } from "react-router";
import { useService } from "../../hooks/useService";

const AdminServiceView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: service, isLoading } = useService(id);

  if (isLoading) return <p>Yükleniyor...</p>;
  if (!service) return <p>Hizmet bulunamadı</p>; // service undefined ise hata vermesin

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/admin/services")}
            className="p-2 hover:text-white hover:bg-sky-500 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="space-y-1">
            <h1 className="text-3xl font-bold ">Hizmet Detayı</h1>
            <p className="text-gray-600">Detaylı görünüm</p>
          </div>
        </div>

        <Link to={`/admin/edit-service/${id}`}>
          <button className="flex items-center justify-center gap-1 w-40  cursor-pointer bg-gradient-to-r from-sky-600 to-green-400 text-white px-3 py-2 rounded-lg font-semibold">
            <Edit className="w-5 h-5" />
            Düzenle
          </button>
        </Link>
      </div>

      <div className="grid gap-6 max-w-4xl mx-auto">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-medium text-4xl mb-4">{service.title}</h3>
          <p className="text-lg text-gray-600">{service.shortDescription}</p>
          <div className="flex gap-6 border-t border-gray-200 mt-4 p-2">
            <div className="flex items-center gap-2 ">
              <Clock className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Seans Süresi</p>
                <p className="text-lg font-semibold ">{service.duration}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Seans Ücreti</p>
                <p className="text-lg font-semibold">500 ₺</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-medium text-2xl mb-4">Hizmet Açıklaması</h3>
          <p className="text-gray-600">{service.description}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-medium text-2xl mb-4">Hizmet Özellikleri</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.features && service.features.length > 0 ? (
              service.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-sky-500" />
                  <span>{feature}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-600">Özellik bulunamadı</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminServiceView;
