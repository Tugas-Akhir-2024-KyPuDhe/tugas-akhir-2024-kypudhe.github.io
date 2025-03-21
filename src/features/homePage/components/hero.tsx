import React from "react";
import useCookie from "react-use-cookie";

export const Hero: React.FC = () => {
  const [cookieLogin] = useCookie("userLoginCookie");
  const userLoginCookie = cookieLogin ? JSON.parse(cookieLogin) : null;

  return (
    <div
      className="shadow p-4 m-1 m-lg-4 m-md-4 my-4 rounded"
      style={{ backgroundColor: "#fff" }}
    >
      <div className="h3">Hallo <span className="text-blue fw-bold">{userLoginCookie?.name}</span>, Selamat Datang</div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, beatae!
        Quo maiores nisi dolores aliquid sapiente alias amet, fugit obcaecati
        corporis sequi omnis quia iste nesciunt dolore hic voluptates?
        Blanditiis.
      </p>
    </div>
  );
};
