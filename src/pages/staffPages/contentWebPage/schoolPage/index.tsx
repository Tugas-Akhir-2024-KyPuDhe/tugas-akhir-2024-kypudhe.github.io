import React, { useEffect, useState } from "react";
import { HeaderTitlePage } from "../../../../components/headerTitlePage";
import ConfigSchoolService from "../../../../services/sekolahConfigService";
import { School } from "../../../../interface/school.interface";
import parse from "html-react-parser";
import ReactQuill from "react-quill";
import { FaPen } from "react-icons/fa6";
import { Toast } from "../../../../utils/myFunctions";

const toolbarOptions = [
  [{ header: "1" }, { header: "2" }, { font: [] }],
  [{ size: ["small", false, "large", "huge"] }],
  ["bold", "italic", "underline", "strike", "blockquote"],
  [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
  ["link", "image", "video"],
  [{ align: [] }, { color: [] }, { background: [] }],
  ["clean"],
];

export const SchoolPage: React.FC = () => {
  const configSchool = ConfigSchoolService();
  const [data, setdata] = useState<School>({
    name: "",
    about: "",
    vision: "",
    mission: "",
    address: "",
    maps: "",
    mediaId: null,
    telp: "",
    email: "",
    npsn: "",
    fb: "",
    ig: "",
    tiktok: "",
    youtube: "",
  });
  const [errorsForms, setErrorsForms] = useState<{ [key: string]: string }>({});
  const [loading, setloading] = useState(true);
  const [tempLogo, setTempLogo] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [statusUpdateInfo, setStatusUpdateInfo] = useState(false);

  const getData = async () => {
    const response = await configSchool.getConfigSchool();
    setdata(response.data);
    setTempLogo(response.data.logo!.url);
    setloading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setdata((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
    setErrorsForms((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleQuillChange = (key: string, value: string) => {
    setdata((prev) => ({ ...prev, [key]: value }));
    setErrorsForms((prevErrors) => ({ ...prevErrors, [key]: "" }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onload = () => setTempLogo(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleUpdatePhotoClick = () => {
    document.getElementById("fileInputLogo")?.click();
  };

  const handleupdateLogo = async (id: number, photoFile: File) => {
    try {
      setloading(true);
      const formData = new FormData();
      formData.append("media", photoFile);

      const response = await configSchool.updateLogoConfig(id, formData);
      if (response.status === 200) {
        await getData();
        setloading(false);
        setloading(false);
        Toast.fire({
          icon: "success",
          title: "Logo Berhasil di Perbarui",
          timer: 4000,
        });
      }
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Logo Gagal di Perbarui",
        timer: 4000,
      });
      console.error("Error updating photo:", error);
    }
    setloading(false);
  };

  const handleUpdateInformasi = async (id: number) => {
    const requiredFields = [
      "npsn",
      "name",
      "email",
      "telp",
      "address",
      "about",
      "vision",
      "mission",
    ];
    const newErrors: { [key: string]: string } = {};

    requiredFields.forEach((field) => {
      if (!data[field as keyof typeof data]) {
        newErrors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required.`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrorsForms(newErrors);
      return;
    }

    setloading(true);
    const payload = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      payload.append(key, value as string | Blob);
    });

    try {
      const response = await configSchool.updateDataConfigSchool(id, payload);
      if (response.status === 201 || response.status === 200) {
        Toast.fire({
          icon: "success",
          title: `Data Sekolah Berhasil di Perbarui`,
        });
      }
    } catch (error) {
      setloading(false);
      Toast.fire({
        icon: "error",
        title: `${error}`,
      });
      console.error("Error processing galeri:", error);
    }finally{
      setloading(false)
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <HeaderTitlePage
        title="Config Sekolah"
        subTitle="SMKN 1 Lumban Julu"
        backDisplay={false}
        addDisplay={false}
        linkAdd=""
      />
      <div className="row g-0">
        <div className="col-12 col-md-4">
          <div
            className="shadow p-4 m-1 m-lg-4 m-md-4 my-4 rounded sticky-lg-top"
            style={{ backgroundColor: "#fff", marginTop: "40px", top: "130px", }}
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
            <div className="row">
              <div className="col-12">
                <div className="img-profile">
                  <div className="d-flex justify-content-between">
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
                      <div className="d-flex justify-content-between">
                        <div>Logo</div>
                        {/* {!statusUpdateData && (
                          <div
                            style={{ cursor: "pointer" }}
                            onClick={handleUpdateAccess}
                          >
                            <FaPen />
                          </div>
                        )} */}
                      </div>
                    </div>
                    <div
                      className="bg-light fw-bold shadow d-flex align-items-center justify-content-center"
                      style={{
                        borderRadius: "100%",
                        width: "40px",
                        height: "40px",
                        cursor: "pointer",
                      }}
                      onClick={handleUpdatePhotoClick}
                    >
                      <FaPen />
                    </div>
                  </div>
                  <div className="d-flex align-items-start position-relative">
                    <img
                      src={tempLogo}
                      alt=""
                      className="img-fluid rounded mb-3 px-3 py-3 border"
                      style={{
                        width: "100%",
                        objectFit: "contain",
                      }}
                    />
                    <input
                      type="file"
                      id="fileInputLogo"
                      style={{ display: "none" }}
                      accept=".jpeg, .jpg, .png, .gif"
                      onChange={handleFileChange}
                    />
                  </div>
                  {photoFile && (
                    <div className="text-end">
                      <button
                        className="btn btn-primary bg-blue border-0 text-light mb-3"
                        onClick={() => handleupdateLogo(data.id!, photoFile)}
                        disabled={loading}
                      >
                        {loading ? (
                          <div
                            className="spinner-border spinner-border-sm text-light"
                            role="status"
                          >
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        ) : (
                          "Simpan Foto"
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-8">
          <div
            className="shadow p-4 m-1 m-lg-4 m-md-4 my-4 rounded position-relative"
            style={{ backgroundColor: "#fff" }}
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
            <div className="row">
              <div className="col-12 d-flex justify-content-between">
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
                  <div className="d-flex justify-content-between">
                    <div>Informasi Sekolah</div>
                    {/* {!statusUpdateData && (
                          <div
                            style={{ cursor: "pointer" }}
                            onClick={handleUpdateAccess}
                          >
                            <FaPen />
                          </div>
                        )} */}
                  </div>
                </div>
                <div
                  className="bg-light fw-bold shadow d-flex align-items-center justify-content-center"
                  style={{
                    borderRadius: "100%",
                    width: "40px",
                    height: "40px",
                    cursor: "pointer",
                  }}
                  onClick={() => setStatusUpdateInfo(!statusUpdateInfo)}
                >
                  <FaPen />
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div className="form-group mb-3">
                  <label className="mb-2 fw-bold text-dark-soft">
                    NPSN Sekolah
                  </label>
                  {statusUpdateInfo ? (
                    <>
                      <input
                        type="text"
                        name="npsn"
                        value={data?.npsn}
                        onChange={handleInputChange}
                        className={`form-control ${
                          errorsForms.npsn ? "is-invalid" : ""
                        }`}
                        placeholder="Masukkan NPSN Sekolah"
                      />
                      {errorsForms.npsn && (
                        <div className="invalid-form">NPSN masih kosong!</div>
                      )}
                    </>
                  ) : (
                    <div>{data.npsn || "-"}</div>
                  )}
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div className="form-group mb-3">
                  <label className="mb-2 fw-bold text-dark-soft">
                    Nama Sekolah
                  </label>
                  {statusUpdateInfo ? (
                    <>
                      <input
                        type="text"
                        name="name"
                        value={data?.name}
                        className={`form-control ${
                          errorsForms.name ? "is-invalid" : ""
                        }`}
                        onChange={handleInputChange}
                        placeholder="Masukkan Nama Sekolah"
                      />
                      {errorsForms.name && (
                        <div className="invalid-form">
                          Nama Sekolah masih kosong!
                        </div>
                      )}
                    </>
                  ) : (
                    <div>{data.name || "-"}</div>
                  )}
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div className="form-group mb-3">
                  <label className="mb-2 fw-bold text-dark-soft">Email</label>
                  {statusUpdateInfo ? (
                    <>
                      <input
                        type="email"
                        name="email"
                        className={`form-control ${
                          errorsForms.email ? "is-invalid" : ""
                        }`}
                        value={data?.email}
                        onChange={handleInputChange}
                        placeholder="Masukkan Email"
                      />
                      {errorsForms.email && (
                        <div className="invalid-form">
                          Email Sekolah masih kosong!
                        </div>
                      )}
                    </>
                  ) : (
                    <div>{data.email || "-"}</div>
                  )}
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div className="form-group mb-3">
                  <label className="mb-2 fw-bold text-dark-soft">
                    No Telepon
                  </label>
                  {statusUpdateInfo ? (
                    <>
                      <input
                        type="text"
                        name="telp"
                        className={`form-control ${
                          errorsForms.telp ? "is-invalid" : ""
                        }`}
                        value={data?.telp}
                        onChange={handleInputChange}
                        placeholder="Masukkan No Telepon"
                      />
                      {errorsForms.telp && (
                        <div className="invalid-form">
                          Nomor Telp masih kosong!
                        </div>
                      )}
                    </>
                  ) : (
                    <div>{data.telp || "-"}</div>
                  )}
                </div>
              </div>
              <div className="col-12">
                <div className="form-group mb-3">
                  <label className="mb-2 fw-bold text-dark-soft">Alamat</label>
                  {statusUpdateInfo ? (
                    <>
                      <textarea
                        name="address"
                        className={`form-control ${
                          errorsForms.address ? "is-invalid" : ""
                        }`}
                        value={data?.address}
                        // onChange={handleInputChange}
                        placeholder="Masukkan alamat"
                      />
                      {errorsForms.address && (
                        <div className="invalid-form">
                          Alamat Sekolah masih kosong!
                        </div>
                      )}
                    </>
                  ) : (
                    <div>{data.address || "-"}</div>
                  )}
                </div>
              </div>
              <div className="col-12">
                <div className="form-group mb-3">
                  <label className="mb-2 fw-bold text-dark-soft">Tentang</label>
                  {statusUpdateInfo ? (
                    <>
                      <ReactQuill
                        theme="snow"
                        value={data.about}
                        onChange={(value) => handleQuillChange("about", value)}
                        modules={{ toolbar: toolbarOptions }}
                        formats={[
                          "header",
                          "font",
                          "size",
                          "bold",
                          "italic",
                          "underline",
                          "strike",
                          "blockquote",
                          "list",
                          "bullet",
                          "indent",
                          "link",
                          "image",
                          "video",
                          "align",
                          "color",
                          "background",
                        ]}
                      />
                      {errorsForms.about && (
                        <div className="invalid-form">
                          Tentang Sekolah masih kosong!
                        </div>
                      )}
                    </>
                  ) : (
                    <div>{parse(data.about || "-")}</div>
                  )}
                </div>
              </div>
              <div className="col-12">
                <div className="form-group mb-3">
                  <label className="mb-2 fw-bold text-dark-soft">Visi</label>
                  {statusUpdateInfo ? (
                    <>
                      <ReactQuill
                        theme="snow"
                        value={data.vision}
                        onChange={(value) => handleQuillChange("vision", value)}
                        modules={{ toolbar: toolbarOptions }}
                        formats={[
                          "header",
                          "font",
                          "size",
                          "bold",
                          "italic",
                          "underline",
                          "strike",
                          "blockquote",
                          "list",
                          "bullet",
                          "indent",
                          "link",
                          "image",
                          "video",
                          "align",
                          "color",
                          "background",
                        ]}
                      />
                      {errorsForms.vision && (
                        <div className="invalid-form">
                          Visi Sekolah masih kosong!
                        </div>
                      )}
                    </>
                  ) : (
                    <div>{parse(data.vision || "-")}</div>
                  )}
                </div>
              </div>
              <div className="col-12">
                <div className="form-group mb-3">
                  <label className="mb-2 fw-bold text-dark-soft">Misi</label>
                  {statusUpdateInfo ? (
                    <>
                      <ReactQuill
                        theme="snow"
                        value={data.mission}
                        onChange={(value) =>
                          handleQuillChange("mission", value)
                        }
                        modules={{ toolbar: toolbarOptions }}
                        formats={[
                          "header",
                          "font",
                          "size",
                          "bold",
                          "italic",
                          "underline",
                          "strike",
                          "blockquote",
                          "list",
                          "bullet",
                          "indent",
                          "link",
                          "image",
                          "video",
                          "align",
                          "color",
                          "background",
                        ]}
                      />
                      {errorsForms.mission && (
                        <div className="invalid-form">
                          Misi Sekolah masih kosong!
                        </div>
                      )}
                    </>
                  ) : (
                    <div>{parse(data.mission || "-")}</div>
                  )}
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div className="form-group mb-3">
                  <label className="mb-2 fw-bold text-dark-soft">
                    Link Facebook
                  </label>
                  {statusUpdateInfo ? (
                    <>
                      <input
                        type="text"
                        name="fb"
                        className={`form-control`}
                        value={data?.fb}
                        onChange={handleInputChange}
                        placeholder="Masukkan Link Facebook"
                      />
                    </>
                  ) : (
                    <div>{parse(data.fb || "-")}</div>
                  )}
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div className="form-group mb-3">
                  <label className="mb-2 fw-bold text-dark-soft">
                    Link Instagram
                  </label>
                  {statusUpdateInfo ? (
                    <>
                      <input
                        type="text"
                        name="ig"
                        className={`form-control`}
                        value={data?.ig}
                        onChange={handleInputChange}
                        placeholder="Masukkan Link Instagram"
                      />
                    </>
                  ) : (
                    <div>{data.ig || "-"}</div>
                  )}
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div className="form-group mb-3">
                  <label className="mb-2 fw-bold text-dark-soft">
                    Link Tiktok
                  </label>
                  {statusUpdateInfo ? (
                    <>
                      <input
                        type="text"
                        name="tiktok"
                        className={`form-control`}
                        value={data?.tiktok}
                        onChange={handleInputChange}
                        placeholder="Masukkan Link Tiktok"
                      />
                    </>
                  ) : (
                    <div>{data.tiktok || "-"}</div>
                  )}
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div className="form-group mb-3">
                  <label className="mb-2 fw-bold text-dark-soft">
                    Link Youtube
                  </label>
                  {statusUpdateInfo ? (
                    <>
                      <input
                        type="text"
                        name="youtube"
                        className={`form-control`}
                        value={data?.youtube}
                        onChange={handleInputChange}
                        placeholder="Masukkan Link Youtube"
                      />
                    </>
                  ) : (
                    <div>{data.youtube || "-"}</div>
                  )}
                </div>
              </div>
              <div className="col-12">
                <div className="form-group mb-3">
                  <label className="mb-2 fw-bold text-dark-soft">
                    Link Maps
                  </label>
                  {statusUpdateInfo ? (
                    <>
                      <input
                        type="text"
                        name="maps"
                        className={`form-control`}
                        value={data?.maps}
                        onChange={handleInputChange}
                        placeholder="Masukkan Link Facebook"
                      />
                    </>
                  ) : (
                    <div>
                      {data.maps &&
                        parse(
                          data.maps
                            .replace('height="450"', 'height="400"')
                            .replace('width="600"', 'width="100%"')
                        )}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-12">
                <button
                  className={`btn btn-primary bg-blue border-0`}
                  // type="submit"
                  style={{ fontSize: "1.1rem" }}
                  disabled={loading}
                  onClick={() => handleUpdateInformasi(data.id!)}
                >
                  {loading ? (
                    <div className="spinner-border text-light" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    "Update"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
