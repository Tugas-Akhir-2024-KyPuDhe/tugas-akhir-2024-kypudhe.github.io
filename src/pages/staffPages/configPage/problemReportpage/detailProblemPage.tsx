import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IProblem } from "../../../../interface/problem.interface";
import ProblemService from "../../../../services/problemService";
import { AxiosError } from "axios";
import { Toast } from "../../../../utils/myFunctions";
import Select from "react-select";
import { optionsStatusProblem } from "../../../../utils/optionsData";
import { HeaderTitlePage } from "../../../../components/headerTitlePage";

export const DetailProblemReportPage: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>();
  const problemService = ProblemService();
  const [formData, setFormData] = useState<IProblem>({
    id: 0,
    uuid: "",
    createdBy: "",
    idName: "",
    pageProblem: "",
    problemDescription: "",
    media: undefined,
    telp: "",
    status: "",
    createdAt: "",
    updatedAt: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      if (id) {
        try {
          const response = await problemService.getProblemById(parseInt(id));
          const data = response.data;
          setFormData(data);
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

  const handleSelectChange = (
    name: string,
    selectedOption: { value: string } | null
  ) => {
    setFormData((prev) => ({
      ...prev,
      [name]: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await problemService.updateProblem(formData.id, formData);
      if (response.status === 201 || response.status === 200) {
        Toast.fire({
          icon: "success",
          title: `Berhasil! Data berhasil diperbarui`,
        });
        navigate(-1);
      }
    } catch (error) {
      setLoading(false);
      Toast.fire({
        icon: "error",
        title: `Error! Terjadi kesalahan, coba lagi`,
      });
      console.error("Error processing banner:", error);
    }
  };
  
  return (
    <>
        <HeaderTitlePage
          title={`Detail Laporan Masalah`}
          subTitle="Detail laporan masalah yang dikirimkan oleh pengguna"
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

        <div className="row g-3">
          <div className="col-12">
            <div className="fw-bold position-relative pb-2">
              Detail Laporan Masalah
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: 0,
                  width: "50px",
                  height: "3px",
                  backgroundColor: "var(--blue-color)",
                }}
              />
            </div>
          </div>
          <div className="col-12">
            <div className="row mb-3">
              <div className="col-3 col-md-2 fw-medium my-auto">Status</div>
              <div className="col-auto my-auto">:</div>
              <div className="col fw-medium my-auto">
              <Select
                    options={optionsStatusProblem}
                    value={optionsStatusProblem.find(
                      (option) => option.value === formData!.status
                    )}
                    onChange={(option) => handleSelectChange("status", option)}
                    placeholder="Pilih Status"
                    className="form-control-lg px-0 pt-0"
                    styles={{
                      control: (baseStyles) => ({
                        ...baseStyles,
                        fontSize: "0.955rem",
                        minHeight: "48px",
                        borderRadius: "8px",
                      }),
                      option: (provided) => ({
                        ...provided,
                        fontSize: "1rem",
                      }),
                    }}
                  />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-3 col-md-2 fw-medium my-auto">Nama<br />Pengirim</div>
              <div className="col-auto my-auto">:</div>
              <div className="col fw-medium my-auto">{formData?.idName}</div>
            </div>
            <div className="row mb-3">
              <div className="col-3 col-md-2 fw-medium my-auto">No.Telp<br />Pengirim</div>
              <div className="col-auto my-auto">:</div>
              <div className="col fw-medium my-auto">{formData?.telp}</div>
            </div>
            <div className="row mb-3">
              <div className="col-3 col-md-2 fw-medium my-auto">Halaman<br />Bermasalah</div>
              <div className="col-auto my-auto">:</div>
              <div className="col fw-medium my-auto">{formData?.pageProblem}</div>
            </div>
            <div className="row mb-3">
              <div className="col-3 col-md-2 fw-medium my-auto">Deskripsi </div>
              <div className="col-auto my-auto">:</div>
              <div className="col fw-medium my-auto">{formData?.problemDescription}</div>
            </div>
            <div className="row mb-3">
              <div className="col-3 col-md-2 fw-medium my-auto">Foto Bukti</div>
              <div className="col-auto my-auto">:</div>
              <div className="col fw-medium my-auto">
                {
                  formData?.media ? (
                    <img src={formData?.media.url} alt={formData?.pageProblem} className="img-fluid"/>
                  ) : (
                    <p className="text-danger">Tidak ada foto bukti</p>
                  )
                }
                </div>
            </div>
            <div className="col-12 col-md-6 m-aut">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">&nbsp;</label>
                <button
                  className="btn bg-blue text-light w-100"
                  type="button"
                  onClick={() => handleSubmit()}
                >
                  Update Status
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
