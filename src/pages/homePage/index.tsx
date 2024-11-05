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
import useCookie from "react-use-cookie";
import { CardInformasi } from "../../features/homePage/components/cardInformasi";

// interface Mapel {
//   imageMapel: string;
//   namaMapel: string;
//   guruMapel: string;
// }

export const HomePage = () => {
  const articleService = ArtikelService();
  const [cookieLogin] = useCookie("userLoginCookie");
  const userLoginCookie = cookieLogin ? JSON.parse(cookieLogin) : null;
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
      {userLoginCookie.role === "STAFF" ? (
        <div className="m-3 m-lg-4 m-md-4 my-4">
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
        <div className="m-3 m-lg-4 m-md-4 my-4">
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
      )}

      <div className="m-3 m-lg-4 m-md-4 my-4">
        <div className="d-flex justify-content-between mb-3">
          <span className="fw-bold fs-5 text-dark-soft">Berita/Artikel</span>
          <Link to="/berita" className="fw-medium fs-5 text-primary">
            <u>Lainnya {">"}</u>
          </Link>
        </div>
        <section className="">
          <div className="container-fluid px-0">
            <div className="row g-3 d-flex">
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
