import React, { useEffect, useState } from "react";
import { HeaderTitlePage } from "../../../../components/headerTitlePage";
import { IStudyTracer } from "../../../../interface/studyTracer.interface";
import StudyTracerService from "../../../../services/studyTracerService";
import { Toast } from "../../../../utils/myFunctions";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosError } from "axios";
import noPhotoMale from "./../../../../assets/images/profile-male.jpg";
import noPhotoFemale from "./../../../../assets/images/profile-female.jpg";
export const DetailStudyTracerPage: React.FC = () => {
  const studyTracerService = StudyTracerService();
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<IStudyTracer>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      if (id) {
        try {
          const response = await studyTracerService.getStudyTracerById(
            parseInt(id)
          );
          const data = response.data;
          setData(data);
        } catch (error) {
          const axiosError = error as AxiosError;
          if (axiosError.response?.status === 404) {
            Toast.fire({
              icon: "error",
              title: `Data Tidak Ditemukan!`,
              timer: 4000,
            });
            navigate("/");
          }
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <>
      <HeaderTitlePage
        title="Study Tracer"
        subTitle="Study Tracer SMKN 1 Lumban Julu"
        backDisplay={true}
        addDisplay={false}
        linkAdd=""
      />

      <div
        className="shadow p-4 m-1 m-lg-4 m-md-4 my-4 rounded"
        style={{ backgroundColor: "#fff", position: "relative" }}
      >
        {loading && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              zIndex: 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        <div className="row g-3" key={id}>
          <div className="col-12 col-lg-4 m-auto text-center">
            <img
              src={data?.gender === "Perempuan" ? noPhotoFemale : noPhotoMale}
              alt=""
              className="img-fluid rounded-circle mb-3"
              style={{ width: "170px" }}
            />
            <div className="fw-bold">{data?.name}</div>
            <div className="fw-medium">{data?.endYear}</div>
          </div>
          <div className="col-12 col-lg-8">
            <div className="row">
              <div className="col-12 col-lg-6">
                <div className="mb-3">
                  <label className="fw-bold">Nama Siswa</label>
                  <div className="fw-medium">{data?.name}</div>
                </div>
                <div className="mb-3">
                  <label className="fw-bold">Tahun Masuk</label>
                  <div className="fw-medium">{data?.startYear}</div>
                </div>
                <div className="mb-3">
                  <label className="fw-bold">Tahun Lulus</label>
                  <div className="fw-medium">{data?.endYear}</div>
                </div>
                <div className="mb-3">
                  <label className="fw-bold">Status Saat Ini</label>
                  <div className="fw-medium">{data?.employmentStatus}</div>
                </div>
                <div className="mb-3">
                  <label className="fw-bold">Nama Instansi</label>
                  <div className="fw-medium">{data?.institutionName}</div>
                </div>
                <div className="mb-3">
                  <label className="fw-bold">Alamat Instansi</label>
                  <div className="fw-medium">{data?.institutionAddress}</div>
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div className="mb-3">
                  <label className="fw-bold">Jenis Kelamin</label>
                  <div className="fw-medium">{data?.gender}</div>
                </div>
                <div className="mb-3">
                  <label className="fw-bold">Tempat Tanggal Lahir</label>
                  <div className="fw-medium">{data?.ttl}</div>
                </div>
                <div className="mb-3">
                  <label className="fw-bold">Alamat Saat ini</label>
                  <div className="fw-medium">{data?.address}</div>
                </div>
                <div className="mb-3">
                  <label className="fw-bold">Email</label>
                  <div className="fw-medium">{data?.email}</div>
                </div>
                <div className="mb-3">
                  <label className="fw-bold">No. Telp</label>
                  <div className="fw-medium">{data?.phone}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
