import React from "react";
import { HeaderTitlePage } from "../../../../components/headerTitlePage";

export const SchoolPage: React.FC = () => {
  
  return (
    <>
      <HeaderTitlePage title="Config Sekolah" subTitle="SMKN 1 Lumban Julu" backDisplay={false} addDisplay={false} linkAdd=""/>
      <div
        className="shadow p-4 m-1 m-lg-4 m-md-4 my-4 rounded"
        style={{ backgroundColor: "#fff", position: "relative" }}
      >
        <form>
          <div className="row">
            <div className="col-12 col-lg-6">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">NPSN Sekolah</label>
                <input
                  type="text"
                  name="NPSN"
                  className={`form-control`}
                  placeholder="Masukkan NPSN Sekolah"
                />
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">Nama Sekolah</label>
                <input
                  type="text"
                  name="name"
                  className={`form-control`}
                  placeholder="Masukkan Nama Sekolah"
                />
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  className={`form-control`}
                  placeholder="Masukkan Email"
                />
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">No Telepon</label>
                <input
                  type="text"
                  name="telp"
                  className={`form-control`}
                  placeholder="Masukkan No Telepon"
                />
              </div>
            </div>
            <div className="col-12">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">Tentang</label>
                <textarea
                  name="about"
                  className={`form-control`}
                  placeholder="Masukkan tentang"
                />
              </div>
            </div>
            <div className="col-12">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">Alamat</label>
                <textarea
                  name="address"
                  className={`form-control`}
                  placeholder="Masukkan alamat"
                />
              </div>
            </div>
            <div className="col-12">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">Visi</label>
                <textarea
                  name="vision"
                  className={`form-control`}
                  placeholder="Masukkan Visi"
                />
              </div>
            </div>
            <div className="col-12">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">Misi</label>
                <textarea
                  name="mission"
                  className={`form-control`}
                  placeholder="Masukkan Misi"
                />
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">Link Facebook</label>
                <input
                  type="text"
                  name="fb"
                  className={`form-control`}
                  placeholder="Masukkan Link Facebook"
                />
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">Link Instagram</label>
                <input
                  type="text"
                  name="ig"
                  className={`form-control`}
                  placeholder="Masukkan Link Instagram"
                />
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">Link Tiktok</label>
                <input
                  type="text"
                  name="tiktok"
                  className={`form-control`}
                  placeholder="Masukkan Link Tiktok"
                />
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">Link Youtube</label>
                <input
                  type="text"
                  name="youtube"
                  className={`form-control`}
                  placeholder="Masukkan Link Youtube"
                />
              </div>
            </div>
          </div>

          <div className="col-12 d-flex">
            <button
              className={`btn btn-success`}
              type="submit"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
