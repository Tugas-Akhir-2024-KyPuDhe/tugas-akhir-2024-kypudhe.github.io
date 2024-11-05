import React from "react";
import { FaCalendarDay, FaClock } from "react-icons/fa6";

export const DetailArticlePage: React.FC = () => {
  return (
    <>
      <div
        className="shadow p-4 m-0 m-lg-3 m-md-3 my-4 rounded"
        style={{ backgroundColor: "#fff" }}
      >
        <div className="title-article mb-4">
          <h3 className="fw-bold mb-1 text-dark-soft">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et pariatur excepturi porro?</h3>
          <div>
            <span className="me-4 text-blue fw-bold">Berita Umum</span>
          </div>
        </div>
        <div className="img-banner mb-4">
          <img
            src="https://plus.unsplash.com/premium_photo-1661772661721-b16346fe5b0f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnVzc2luZXNzfGVufDB8fDB8fHww"
            alt=""
            className="img-fluid rounded"
            style={{ height: "450px", width: "100%", objectFit: "cover" }}
          />
          <div className="mt-2">
            <FaCalendarDay className="text-blue fs-5" />
            <span className="ms-2 fw-medium" style={{ fontSize: "1em" }}>
              20 Nov 2024
            </span>
            <span className="mx-3">|</span>
            <FaClock className="text-blue fs-5" />
            <span className="ms-2 fw-medium" style={{ fontSize: "1em" }}>
              15:30
            </span>
          </div>
        </div>
        {/* <div className="title-article mb-4">
          <h3 className="fw-bold mb-1 text-dark-soft">Lorem ipsum dolor sit amet.</h3>
          <div>
            <span className="me-4 text-blue fw-bold">Berita Umum</span>
          </div>
        </div> */}
        <div className="description-article">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti,
            obcaecati reprehenderit, ipsam quibusdam illo alias facere sit
            corrupti impedit vel ullam nam ab id! Quaerat, vel praesentium saepe
            distinctio ab architecto magnam, pariatur consequuntur rem nobis
            dicta odit. Magni maxime delectus sint atque vel sequi architecto,
            laboriosam molestiae laborum eius quis cumque, nesciunt nihil! Atque
            saepe sapiente culpa et deserunt neque, harum molestiae natus vitae
            mollitia, commodi animi dicta eius consequuntur incidunt maiores,
            nesciunt nisi cum unde. Exercitationem, expedita amet.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod libero
            natus ratione modi quibusdam quis voluptatibus eum iure ut, quae,
            qui vitae? Accusantium eos aspernatur, reprehenderit debitis
            cupiditate laborum ipsam animi tempora at harum, error nesciunt
            modi, possimus totam ex id in repudiandae eum voluptatibus rem iste?
            Nesciunt, quod dolorum?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore
            quibusdam temporibus suscipit repellendus quasi hic tempora ut
            ratione soluta saepe. Accusantium incidunt ut dolores similique
            expedita adipisci, saepe excepturi dolor consequuntur, velit ex quo
            illo dignissimos deleniti ipsa facere quibusdam quisquam laudantium?
            Laudantium illum dignissimos in. Pariatur itaque doloribus
            architecto amet quibusdam ipsam aut nesciunt laudantium debitis,
            iusto hic quam placeat ullam! Eum cumque tenetur error incidunt
            perspiciatis. Ducimus sed porro modi eius excepturi laudantium
            commodi nobis aut, expedita repellendus fugit recusandae velit
            veniam esse itaque, consequuntur nihil dignissimos. Rerum labore
            cumque esse veniam accusantium saepe dolore porro, aut nisi.
          </p>
        </div>
      </div>
    </>
  );
};
