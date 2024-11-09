// import { CardMapel } from "../../features/homePage/components/cardMapel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";
import { Hero } from "../../features/homePage/components/hero";
import ArtikelService from "../../services/artikelService";
import { useEffect, useState } from "react";
import { Artikel } from "../../interface/artikel.interface";
import { Link } from "react-router-dom";
import {
  FaCaretRight,
  FaCodeBranch,
  FaGraduationCap,
  FaPersonChalkboard,
} from "react-icons/fa6";
import { CardBerita } from "../../components/cardBerita";
import { CardBeritaSkeleton } from "../../components/cardBeritaSkeleton";
import useCookie from "react-use-cookie";
import { CardInformasi } from "../../features/homePage/components/cardInformasi";
import { showConfirmationDialog, Toast } from "../../utils/myFunctions";
import Swal from "sweetalert2";

interface MataPelajaran {
  nama: string,
  hari: string,
  jam_mulai: string,
  jam_selesai: string,
  guru: string,
}

export const HomePage = () => {
  const articleService = ArtikelService();
  const [cookieLogin] = useCookie("userLoginCookie");
  const userLoginCookie = cookieLogin ? JSON.parse(cookieLogin) : null;

  const [dataMapel] = useState<MataPelajaran[]>([
    {
      "nama" : "Matematika",
      "hari" : "Senin",
      "jam_mulai" : "10:00",
      "jam_selesai" : "12:00",
      "guru" : "Rizky Fadillah",
    },
    {
      "nama" : "Bahasa",
      "hari" : "Selasa",
      "jam_mulai" : "10:00",
      "jam_selesai" : "12:00",
      "guru" : "Putra Fadillah",
    },
    {
      "nama" : "Teknik",
      "hari" : "Rabu",
      "jam_mulai" : "10:00",
      "jam_selesai" : "12:00",
      "guru" : "John Doe",
    },
  ]);

  const [dataArtikel, setDataArtikel] = useState<Artikel[]>([]);
  const [loadingDeleteBerita, setLoadingDeleteBerita] = useState(false);

  const getAllArtikel = async () => {
    const response = await articleService.getAllArtikels(1, 8);
    setDataArtikel(response.data);
  };

  const handleDeleteBerita = async (idArtikel: number) => {
    const result = await showConfirmationDialog({
      title: "Ingin menghapus Berita ini?",
      icon: "warning",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      setLoadingDeleteBerita(true);
      try {
        const response = await articleService.deleteArtikel(idArtikel);
        if (response.status === 200) {
          getAllArtikel();
          Toast.fire({
            icon: "success",
            title: "Berita/Artikel berhasil dihapus",
            timer: 4000,
          });
        }
      } catch (error) {
        console.error("Error deleting Berita/Artikel:", error);
        Swal.fire("Gagal", "Terjadi kesalahan saat menghapus Berita/Artikel", "error");
      } finally {
        setLoadingDeleteBerita(false); // Set loading to false once the operation is complete
      }
    }
  };

  useEffect(() => {
    getAllArtikel();
  }, []);

  return (
    <>
      {userLoginCookie.role === "STAFF" || userLoginCookie.role === "TEACHER" ? (
        <div className="m-1 m-lg-4 m-md-4 my-4">
          <div className="fw-bold fs-5 mb-3 text-dark-soft">Dashboard</div>
          <div className="container-fluid px-0">
            <div className="row">
              <CardInformasi
                icon={<FaGraduationCap className="display-6" />}
                title="Total Murid"
                total={442}
                bgColor="#FBD288"
              />
              <CardInformasi
                icon={<FaPersonChalkboard className="display-6" />}
                title="Total Guru"
                total={29}
                bgColor="#D4F6FF"
              />
              <CardInformasi
                icon={<FaCodeBranch className="display-6" />}
                title="Total Jurusan"
                total={3}
                bgColor="#F95454"
              />
              <CardInformasi
                icon={<FaGraduationCap className="display-6" />}
                title="Total Murid"
                total={442}
                bgColor="#A8DADC"
              />
            </div>
          </div>
        </div>
      ) : (
        <Hero />
      )}

      {userLoginCookie.role === "STUDENT" && (
        <div className="m-1 m-lg-4 m-md-4 my-4">
          <div className="fw-bold fs-5 text-dark-soft mb-3">Mata Pelajaran</div>
          <div className="container-fluid px-0">
            <div className="row">
            {dataMapel.map(dt=>(
              <div className="col-12 col-lg-4 col-md-3 mb-3" key={dt.nama}>
                <div className="card card-body">
                  <span className={`badge mb-2 text-bg-info`} style={{maxWidth: 'fit-content'}}>{dt.hari}</span>
                  <h4>{dt.nama}</h4>
                  <h6>Guru : {dt.guru}</h6>
                  <hr />
                  <div className="d-flex gap-3">
                    <div>
                      <h6>Jam Mulai</h6>
                      <p>{dt.jam_mulai}</p>
                    </div>
                    <div>
                      <h6>Jam Selesai</h6>
                      <p>{dt.jam_selesai}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      )}

      <div className="m-1 m-lg-4 m-md-4 my-4">
        <div className="d-flex justify-content-between mb-3">
          <span className="fw-bold fs-5 text-dark-soft">Berita/Artikel</span>
          <Link to="/berita" className="fw-medium fs-5 text-primary">
            Lainnya <FaCaretRight/>
          </Link>
        </div>
        <section className="">
          <div className="container-fluid px-0">
            <div className="row g-3 d-flex">
              {dataArtikel.length > 0
                ? dataArtikel.map((data, index) => (
                    <div className="col-12 col-lg-3 col-md-6" key={index}>
                      <CardBerita
                        idArtikel={data.id}
                        uuidArtikel={data.uuid}
                        imageArtikel={data.banner?.url || "https://plus.unsplash.com/premium_photo-1661772661721-b16346fe5b0f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnVzc2luZXNzfGVufDB8fDB8fHww"}
                        tipeArtikel={data.type}
                        dateArtikel={data.createdAt}
                        statusArtikel={data.status}
                        titleArtikel={data.title}
                        descArtikel={data.description}
                        handleDeleteBerita={handleDeleteBerita}
                        loadingDeleteBerita={loadingDeleteBerita}
                      />
                    </div>
                  ))
                : Array.from({ length: 8 }).map((_, index) => (
                    <CardBeritaSkeleton key={index} />
                  ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
