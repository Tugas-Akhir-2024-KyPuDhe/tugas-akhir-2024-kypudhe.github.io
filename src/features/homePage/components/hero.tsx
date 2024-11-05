import React from "react";

export const Hero: React.FC = () => {
  return (
    <div
      className="shadow p-4 m-3 m-lg-4 m-md-4 my-4 rounded"
      style={{ backgroundColor: "#fff" }}
    >
      <div className="h3">Hallo <span className="text-blue fw-bold">Muhammad Syahputra</span>, Selamat Datang</div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, beatae!
        Quo maiores nisi dolores aliquid sapiente alias amet, fugit obcaecati
        corporis sequi omnis quia iste nesciunt dolore hic voluptates?
        Blanditiis.
      </p>
    </div>
  );
};
