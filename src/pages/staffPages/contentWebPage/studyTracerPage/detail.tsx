import React, { useEffect, useState } from "react";
import { HeaderTitlePage } from "../../../../components/headerTitlePage";
import { IStudyTracer } from "../../../../interface/studyTracer.interface";
import StudyTracerService from "../../../../services/studyTracerService";
import { convertStatusStudyTracer, Toast } from "../../../../utils/myFunctions";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosError } from "axios";
import noPhotoMale from "./../../../../assets/images/profile-male.jpg";
import noPhotoFemale from "./../../../../assets/images/profile-female.jpg";
import Select from "react-select";
import { optionsStatusStudyTracer } from "../../../../utils/optionsData";
import { FaPen } from "react-icons/fa6";

export const DetailStudyTracerPage: React.FC = () => {
  const studyTracerService = StudyTracerService();
  const [statusUpdateData, setStatusUpdateData] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<IStudyTracer>({
    id: null,
    uuid: "",
    name: "",
    ttl: "",
    gender: "",
    address: "",
    addressNow: "",
    phone: "",
    email: "",
    startYear: "",
    endYear: "",
    employmentStatus: "",
    institutionName: "",
    institutionAddress: "",
    isSatisfactionMet: "",
    disSatisfactionFactors: "",
    studyIssues: "",
    statusApprove: "",
    createdAt: "",
    updatedAt: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [updating, setUpdating] = useState<boolean>(false);
  const [errorsForms, setErrorsForms] = useState<{ [key: string]: string }>({});

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
    setErrorsForms((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (
    name: string,
    selectedOption: { value: string } | null
  ) => {
    setData((prev) => ({
      ...prev,
      [name]: selectedOption ? selectedOption.value : "",
    }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!data.name) {
      newErrors.name = "Nama siswa harus diisi";
    }

    if (!data.statusApprove) {
      newErrors.statusApprove = "Status persetujuan harus dipilih";
    }

    setErrorsForms(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setUpdating(true);
    try {
      if (!data.id) {
        Toast.fire({
          icon: "error",
          title: "ID data tidak valid",
        });
        return;
      }

      const response = await studyTracerService.updateStudyTracer(
        data.id,
        data
      );

      if (response.status === 200) {
        Toast.fire({
          icon: "success",
          title: "Data berhasil diupdate",
        });
        setStatusUpdateData(false);
        // Refresh data setelah update
        const updatedResponse = await studyTracerService.getStudyTracerById(
          data.id
        );
        setData(updatedResponse.data);
      }
    } catch (error) {
      console.error("Error updating study tracer:", error);
      Toast.fire({
        icon: "error",
        title: `Gagal, Terjadi kesalahan coba lagi`,
        timer: 4000,
      });
    } finally {
      setUpdating(false);
    }
  };

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
            <div className="fw-medium mb-2">{data?.endYear}</div>
            {!statusUpdateData && (
              <div
                className="btn bg-blue text-light"
                style={{ cursor: "pointer" }}
                onClick={() => setStatusUpdateData(!statusUpdateData)}
              >
                <FaPen />
              </div>
            )}
          </div>
          <div className="col-12 col-lg-8">
            <div className="row">
              <div className="col-12 col-lg-6">
                <div className="mb-3">
                  <label className="fw-bold">Nama Siswa</label>
                  {statusUpdateData ? (
                    <>
                      <input
                        name="name"
                        value={data.name}
                        onChange={handleInputChange}
                        className={`form-control mt-2${
                          errorsForms.name ? " is-invalid" : ""
                        }`}
                      />
                      {errorsForms.name && (
                        <div className="invalid-feedback">
                          {errorsForms.name}
                        </div>
                      )}
                    </>
                  ) : (
                    <div>{data.name || "-"}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="fw-bold">Tahun Masuk</label>
                  {statusUpdateData ? (
                    <input
                      name="startYear"
                      value={data.startYear}
                      onChange={handleInputChange}
                      className="form-control mt-2"
                    />
                  ) : (
                    <div className="fw-medium">{data?.startYear || "-"}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="fw-bold">Tahun Lulus</label>
                  {statusUpdateData ? (
                    <input
                      name="endYear"
                      value={data.endYear}
                      onChange={handleInputChange}
                      className="form-control mt-2"
                    />
                  ) : (
                    <div className="fw-medium">{data?.endYear || "-"}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="fw-bold">Status Saat Ini</label>
                  {statusUpdateData ? (
                    <input
                      name="employmentStatus"
                      value={data.employmentStatus}
                      onChange={handleInputChange}
                      className="form-control mt-2"
                    />
                  ) : (
                    <div className="fw-medium">
                      {data?.employmentStatus || "-"}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="fw-bold">Nama Instansi</label>
                  {statusUpdateData ? (
                    <input
                      name="institutionName"
                      value={data.institutionName}
                      onChange={handleInputChange}
                      className="form-control mt-2"
                    />
                  ) : (
                    <div className="fw-medium">
                      {data?.institutionName || "-"}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="fw-bold">Alamat Instansi</label>
                  {statusUpdateData ? (
                    <textarea
                      name="institutionAddress"
                      value={data.institutionAddress}
                      onChange={handleTextareaChange}
                      className="form-control mt-2"
                      rows={3}
                    />
                  ) : (
                    <div className="fw-medium">
                      {data?.institutionAddress || "-"}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div className="mb-3">
                  <label className="fw-bold">Jenis Kelamin</label>
                  {statusUpdateData ? (
                    <select
                      name="gender"
                      value={data.gender}
                      onChange={(e) =>
                        setData((prev) => ({ ...prev, gender: e.target.value }))
                      }
                      className="form-control mt-2"
                    >
                      <option value="">Pilih Jenis Kelamin</option>
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  ) : (
                    <div className="fw-medium">{data?.gender || "-"}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="fw-bold">Tempat Tanggal Lahir</label>
                  {statusUpdateData ? (
                    <input
                      name="ttl"
                      value={data.ttl}
                      onChange={handleInputChange}
                      className="form-control mt-2"
                    />
                  ) : (
                    <div className="fw-medium">{data?.ttl || "-"}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="fw-bold">Alamat Saat ini</label>
                  {statusUpdateData ? (
                    <textarea
                      name="address"
                      value={data.address}
                      onChange={handleTextareaChange}
                      className="form-control mt-2"
                      rows={3}
                    />
                  ) : (
                    <div className="fw-medium">{data?.address || "-"}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="fw-bold">Email</label>
                  {statusUpdateData ? (
                    <input
                      name="email"
                      value={data.email}
                      onChange={handleInputChange}
                      className="form-control mt-2"
                    />
                  ) : (
                    <div className="fw-medium">{data?.email || "-"}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="fw-bold">No. Telp</label>
                  {statusUpdateData ? (
                    <input
                      name="phone"
                      value={data.phone}
                      onChange={handleInputChange}
                      className="form-control mt-2"
                    />
                  ) : (
                    <div className="fw-medium">{data?.phone || "-"}</div>
                  )}
                </div>
              </div>

              {statusUpdateData && (
                <div className="col-12">
                  <div className="form-group mb-3">
                    <label className="fw-bold">
                      Kepuasan dengan Pendidikan
                    </label>
                    
                      <div className="fw-medium">
                        {data?.isSatisfactionMet || "-"}
                      </div>
                  </div>
                  <div className="form-group mb-3">
                    <label className="fw-bold">Faktor Ketidakpuasan</label>
                      
                      <div className="fw-medium">
                        {data?.disSatisfactionFactors || "-"}
                      </div>
                  </div>
                  <div className="form-group mb-3">
                    <label className="fw-bold">Masalah dalam Studi</label>
                      <div className="fw-medium">
                        {data?.studyIssues || "-"}
                      </div>
                  </div>
                </div>
              )}
              <div className="col-12">
                <div className="form-group mb-3">
                  <label className="fw-bold">Status Persetujuan</label>
                  {statusUpdateData ? (
                    <>
                      <Select
                        isSearchable={false}
                        options={optionsStatusStudyTracer}
                        value={optionsStatusStudyTracer.find(
                          (option) => option.value === data?.statusApprove
                        )}
                        onChange={(option) =>
                          handleSelectChange("statusApprove", option)
                        }
                        placeholder="Pilih Status"
                        className={`form-control-lg px-0 pt-0${
                          errorsForms.statusApprove ? " is-invalid" : ""
                        }`}
                        styles={{
                          control: (baseStyles) => ({
                            ...baseStyles,
                            fontSize: "0.955rem",
                            minHeight: "48px",
                            borderRadius: "8px",
                            borderColor: errorsForms.statusApprove
                              ? "#dc3545"
                              : baseStyles.borderColor,
                          }),
                          option: (provided) => ({
                            ...provided,
                            fontSize: "1rem",
                          }),
                        }}
                      />
                      {errorsForms.statusApprove && (
                        <div className="invalid-feedback">
                          {errorsForms.statusApprove}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="fw-medium">
                      {convertStatusStudyTracer(data?.statusApprove) || "-"}
                    </div>
                  )}
                </div>
              </div>
              {statusUpdateData && (
                <div className="col-12">
                  <div className="form-group mb-3">
                    <label className="mb-2 fw-medium">&nbsp;</label>
                    <div className="row">
                      <div className="col-4">
                        <button
                          className="btn btn-danger text-light w-100"
                          type="button"
                          onClick={() => {
                            setStatusUpdateData(false);
                            setErrorsForms({});
                          }}
                          disabled={updating}
                        >
                          Batal
                        </button>
                      </div>
                      <div className="col-8">
                        <button
                          className="btn bg-blue text-light w-100"
                          type="button"
                          onClick={handleSubmit}
                          disabled={updating}
                        >
                          {updating ? (
                            <>
                              <span
                                className="spinner-border spinner-border-sm me-2"
                                role="status"
                                aria-hidden="true"
                              ></span>
                              Memproses...
                            </>
                          ) : (
                            "Update"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
