import React, { useState } from "react";
import { decodeToken, Toast } from "../../utils/myFunctions";
import { useNavigate } from "react-router-dom";
import useCookie from "react-use-cookie";
import ProblemService from "../../services/problemService";

type FormData = {
  createdBy: string;
  idName: string;
  pageProblem: string;
  problemDescription: string;
  telp: string;
};

export const FormProblemReportPage: React.FC = () => {
  const problemService = ProblemService();
  const navigate = useNavigate();
  const [cookieLogin] = useCookie("userLoginCookie");
  const userLoginCookie = cookieLogin ? JSON.parse(cookieLogin) : null;
  const dtoken = decodeToken(userLoginCookie.token);

  const [formData, setFormData] = useState<FormData>({
    createdBy: dtoken.username + "-" + dtoken.name,
    idName: "",
    pageProblem: "",
    problemDescription: "",
    telp: "",
  });

  const [errorFormData, setErrorFormData] = useState<{
    [key: string]: string;
  }>({});
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
    setErrorFormData((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const requiredFields = [
      "idName",
      "pageProblem",
      "problemDescription",
      "telp",
    ];
    const newErrors: { [key: string]: string } = {};

    requiredFields.forEach((field) => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = `is required.`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrorFormData(newErrors);
      return;
    }

    setLoading(true);
    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      payload.append(key, value as string | Blob);
    });

    try {
      const response = await problemService.addProblem(payload);
      if (response.status === 201 || response.status === 200) {
        Toast.fire({
          icon: "success",
          title: `Laporan masalah berhasil dikirim`,
        });
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      Toast.fire({
        icon: "error",
        title: `Terjadi kesalahan`,
      });
      console.error("Error processing:", error);
    }
  };

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-12 col-md-7">
          <div className="shadow p-4 m-1 m-lg-4 m-md-4 my-4 mb-lg-0 mb-md-0 rounded bg-white">
            <div className="fw-bold fs-5 mb-4 text-dark-soft position-relative pb-2">
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: 0,
                  width: "50px",
                  height: "5px",
                  backgroundColor: "var(--blue-color)",
                }}
              />
              Laporkan Kendala
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="idName" className="form-label ms-1">
                  NIP/NIM dan Nama <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  autoComplete="false"
                  name="idName"
                  id="idName"
                  placeholder="contoh: 0091913711 - Aldo"
                  className={`form-control form-control-lg pe-5 ${
                    errorFormData.idName ? "is-invalid" : ""
                  }`}
                  value={formData.idName}
                  onChange={handleChange}
                />
                {errorFormData.idName && (
                  <div className="invalid-feedback">Wajib diisi</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="pageProblem" className="form-label ms-1">
                  Halaman yang terkendala <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  autoComplete="false"
                  name="pageProblem"
                  id="pageProblem"
                  placeholder="contoh: halaman nilai"
                  className={`form-control form-control-lg pe-5 ${
                    errorFormData.pageProblem ? "is-invalid" : ""
                  }`}
                  value={formData.pageProblem}
                  onChange={handleChange}
                />
                {errorFormData.pageProblem && (
                  <div className="invalid-feedback">Wajib diisi</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="problemDescription" className="form-label ms-1">
                  Jelaskan Masalah <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  autoComplete="false"
                  name="problemDescription"
                  id="problemDescription"
                  placeholder="contoh: nilai saya tidak muncul"
                  className={`form-control form-control-lg pe-5 ${
                    errorFormData.problemDescription ? "is-invalid" : ""
                  }`}
                  value={formData.problemDescription}
                  onChange={handleChange}
                />
                {errorFormData.problemDescription && (
                  <div className="invalid-feedback">Wajib diisi</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="problemDescription" className="form-label ms-1">
                  Foto/Screenhoot Halaman
                </label>
                <input
                  type="file"
                  name="media"
                  accept=".jpeg, .jpg, .png, .gif"
                  className="form-control fs-6"
                  id="photo"
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="telp" className="form-label ms-1">
                  Nomor WhatsApp <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  autoComplete="false"
                  name="telp"
                  id="telp"
                  placeholder="+628"
                  className={`form-control form-control-lg pe-5 ${
                    errorFormData.telp ? "is-invalid" : ""
                  }`}
                  value={formData.telp}
                  onChange={handleChange}
                />
                {errorFormData.telp && (
                  <div className="invalid-feedback">Wajib diisi</div>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary bg-blue border-0 w-100 py-2 fw-bold"
                disabled={loading}
              >
                {loading ? (
                  <div className="spinner-border text-light py-0" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  "Kirim"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
