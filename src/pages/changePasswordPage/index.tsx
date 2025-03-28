import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AuthService from "../../services/authService";
import { PayloadChangePassword } from "../../interface/auth.interface";
import { decodeToken, Toast } from "../../utils/myFunctions";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import useCookie from "react-use-cookie";

export const ChangePasswordPage: React.FC = () => {
  const authService = AuthService();
  const navigate = useNavigate();
  const [cookieLogin] = useCookie("userLoginCookie");
  const userLoginCookie = cookieLogin ? JSON.parse(cookieLogin) : null;
  const dtoken = decodeToken(userLoginCookie.token);

  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [formPassword, setFormPassword] = useState<PayloadChangePassword>({
    userId: dtoken.id,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errorFormPassword, setErrorFormPassword] = useState<{
    [key: string]: string;
  }>({});
  const [loading, setLoading] = useState<boolean>(false);

  const togglePasswordVisibility = (field: keyof typeof showPassword) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormPassword((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrorFormPassword((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!formPassword.oldPassword)
      errors.oldPassword = "Password lama wajib diisi.";
    if (!formPassword.newPassword) {
      errors.newPassword = "Password baru wajib diisi.";
    } else if (formPassword.newPassword.length < 8) {
      errors.newPassword = "Password baru minimal 8 karakter.";
    }
    if (!formPassword.confirmPassword) {
      errors.confirmPassword = "Konfirmasi password wajib diisi.";
    } else if (formPassword.confirmPassword !== formPassword.newPassword) {
      errors.confirmPassword = "Konfirmasi password tidak cocok.";
    }

    setErrorFormPassword(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await authService.changePassword(formPassword);
      if (response.status === 200) {
        Toast.fire({
          icon: "success",
          title: `Password Berhasil Diubah`,
          timer: 4000,
        });
        navigate("/dashboard");
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      let errorMessage = "Terjadi kesalahan!";

      if (axiosError.response?.status === 400) {
        errorMessage = "Permintaan tidak valid!";
      } else if (axiosError.response?.status === 401) {
        errorMessage = "Password lama tidak sesuai!";
      }

      Toast.fire({
        icon: "error",
        title: errorMessage,
        timer: 4000,
      });
    } finally {
      setLoading(false);
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
              Ganti Password
            </div>

            <form onSubmit={handleSubmit}>
              {/* Password Lama */}
              <div className="mb-3 position-relative">
                <label htmlFor="oldPassword" className="form-label ms-1">
                  Password Lama
                </label>
                <input
                  type={showPassword.oldPassword ? "text" : "password"}
                  name="oldPassword"
                  id="oldPassword"
                  className={`form-control form-control-lg pe-5 ${
                    errorFormPassword.oldPassword ? "is-invalid" : ""
                  }`}
                  value={formPassword.oldPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="btn position-absolute translate-middle-y me-3"
                  style={{ top: 55, right: -15 }}
                  onClick={() => togglePasswordVisibility("oldPassword")}
                >
                  {showPassword.oldPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                {errorFormPassword.oldPassword && (
                  <div className="invalid-feedback">
                    {errorFormPassword.oldPassword}
                  </div>
                )}
              </div>

              {/* Password Baru */}
              <div className="mb-3 position-relative">
                <label htmlFor="newPassword" className="form-label ms-1">
                  Password Baru
                </label>
                <input
                  type={showPassword.newPassword ? "text" : "password"}
                  name="newPassword"
                  id="newPassword"
                  className={`form-control form-control-lg pe-5 ${
                    errorFormPassword.newPassword ? "is-invalid" : ""
                  }`}
                  value={formPassword.newPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="btn position-absolute translate-middle-y me-3"
                  style={{ top: 55, right: -15 }}
                  onClick={() => togglePasswordVisibility("newPassword")}
                >
                  {showPassword.newPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                {errorFormPassword.newPassword && (
                  <div className="invalid-feedback">
                    {errorFormPassword.newPassword}
                  </div>
                )}
              </div>

              {/* Konfirmasi Password Baru */}
              <div className="mb-3 position-relative">
                <label htmlFor="confirmPassword" className="form-label ms-1">
                  Ulangi Password Baru
                </label>
                <input
                  type={showPassword.confirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  className={`form-control form-control-lg pe-5 ${
                    errorFormPassword.confirmPassword ? "is-invalid" : ""
                  }`}
                  value={formPassword.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="btn position-absolute translate-middle-y me-3"
                  style={{ top: 55, right: -15 }}
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                >
                  {showPassword.confirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                {errorFormPassword.confirmPassword && (
                  <div className="invalid-feedback">
                    {errorFormPassword.confirmPassword}
                  </div>
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
