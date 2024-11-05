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
  FaCodeBranch,
  FaGraduationCap,
  FaPersonChalkboard,
} from "react-icons/fa6";
import { CardBerita } from "../../components/cardBerita";
import { CardBeritaSkeleton } from "../../components/cardBeritaSkeleton";

// interface Mapel {
//   imageMapel: string;
//   namaMapel: string;
//   guruMapel: string;
// }

export const HomePage = () => {
  const articleService = ArtikelService();
  // const dataMapel: Mapel[] = [
  //   {
  //     imageMapel:
  //       "https://img.freepik.com/free-photo/digital-art-style-illustration-graphic-designer_23-2151536952.jpg?t=st=1730351094~exp=1730354694~hmac=f49f2f0431d73c2c786b8eb9cf8e732b40fb0e9b9979e8cc3bbfd249ce02df49&w=1060",
  //     namaMapel: "Bahasa Indonesia",
  //     guruMapel: "Sri Indah Wati",
  //   },
  //   {
  //     imageMapel:
  //       "https://img.freepik.com/free-photo/young-woman-working-home-office_23-2148292786.jpg?w=1060",
  //     namaMapel: "Matematika",
  //     guruMapel: "Joko Susilo",
  //   },
  //   {
  //     imageMapel:
  //       "https://img.freepik.com/free-photo/science-laboratory-with-glassware-equipment_23-2147494384.jpg?w=1060",
  //     namaMapel: "Biologi",
  //     guruMapel: "Dewi Lestari",
  //   },
  //   {
  //     imageMapel:
  //       "https://img.freepik.com/free-photo/students-classroom_23-2148281615.jpg?w=1060",
  //     namaMapel: "Fisika",
  //     guruMapel: "Agus Budi",
  //   },
  //   {
  //     imageMapel:
  //       "https://img.freepik.com/free-photo/hands-writing-notebook_23-2147981221.jpg?w=1060",
  //     namaMapel: "Kimia",
  //     guruMapel: "Siti Aisyah",
  //   },
  //   {
  //     imageMapel:
  //       "https://img.freepik.com/free-photo/happy-school-kids-learning-outside_23-2148281624.jpg?w=1060",
  //     namaMapel: "Sejarah",
  //     guruMapel: "Rudi Setiawan",
  //   },
  //   {
  //     imageMapel:
  //       "https://img.freepik.com/free-photo/english-teacher-classroom_23-2148228983.jpg?w=1060",
  //     namaMapel: "Bahasa Inggris",
  //     guruMapel: "Maria Grace",
  //   },
  // ];
  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   autoplay: true,

  //   slidesToShow: 4.5,
  //   slidesToScroll: 1,
  //   responsive: [
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 1,
  //       },
  //     },
  //     {
  //       breakpoint: 600,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //       },
  //     },
  //   ],
  // };

  const [dataArtikel, setDataArtikel] = useState<Artikel[]>([]);

  const getAllArtikel = async () => {
    const response = await articleService.getAllArtikels(1, 8);
    setDataArtikel(response.data);
  };

  useEffect(() => {
    getAllArtikel();
  }, []);

  return (
    <>
      <div className="m-3 my-4">
        <div className="fw-bold fs-5 mb-3 text-dark-soft">Dashboard</div>
        <div className="container-fluid px-0">
          <div className="row">
            <div className="col-6 col-lg-3 col-md-4">
              <div
                className="card mb-3 border-0 rounded shadow-sm"
                style={{ backgroundColor: "#A8DADC" }}
              >
                <div className="card-body text-center text-dark-soft">
                  <h5 className="card-title">
                    <FaGraduationCap className="display-5" />
                  </h5>
                  <div className="card-text fw-medium fs-5">Total Murid</div>
                  <div className="card-text fw-bold fs-5">442</div>
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-3 col-md-4">
              <div
                className="card mb-3 border-0 rounded shadow-sm"
                style={{ backgroundColor: "#FBD288" }}
              >
                <div className="card-body text-center text-dark-soft">
                  <h5 className="card-title">
                    <FaPersonChalkboard className="display-5" />
                  </h5>
                  <div className="card-text fw-medium fs-5">Total Guru</div>
                  <div className="card-text fw-bold fs-5">29</div>
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-3 col-md-4">
              <div
                className="card mb-3 border-0 rounded shadow-sm"
                style={{ backgroundColor: "#D4F6FF" }}
              >
                <div className="card-body text-center text-dark-soft">
                  <h5 className="card-title">
                    <FaCodeBranch className="display-5" />
                  </h5>
                  <div className="card-text fw-medium fs-5">Total Jurusan</div>
                  <div className="card-text fw-bold fs-5">3</div>
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-3 col-md-4">
              <div
                className="card mb-3 border-0 rounded shadow-sm"
                style={{ backgroundColor: "#F95454" }}
              >
                <div className="card-body text-center text-dark-soft">
                  <h5 className="card-title">
                    <FaCodeBranch className="display-5" />
                  </h5>
                  <div className="card-text fw-medium fs-5">Total Murid</div>
                  <div className="card-text fw-bold fs-5">127</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Hero />

      <div className="m-3 my-4">
        <div className="fw-bold fs-5 text-dark-soft">Mata Pelajaran</div>
        <div className="slider-container">
          <div className="container">
            {/* <Slider {...settings}>
              {dataMapel.map((data, index) => (
                <div key={index} className="p-2">
                  <CardMapel {...data} />
                </div>
              ))}
            </Slider> */}
          </div>
        </div>
      </div>

      <div className="m-3 my-4">
        <div className="d-flex justify-content-between mb-3">
          <span className="fw-bold fs-5 text-dark-soft">Berita/Artikel</span>
          <Link to="/" className="fw-medium fs-5 text-primary">
            <u>Lainnya {">"}</u>
          </Link>
        </div>
        <section className="">
          <div className="container px-0">
            <div className="row g-3 d-flex justify-content-between">
              {dataArtikel.length > 0
                ? dataArtikel.map((data, index) => (
                    <div className="col-12 col-lg-3 col-md-6" key={index}>
                      <CardBerita
                        uuidArtikel={data.uuid}
                        imageArtikel={
                          data.banner ||
                          "https://plus.unsplash.com/premium_photo-1661772661721-b16346fe5b0f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnVzc2luZXNzfGVufDB8fDB8fHww"
                        }
                        tipeArtikel={data.type}
                        dateArtikel={data.date}
                        titleArtikel={data.title}
                        descArtikel={data.description}
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
