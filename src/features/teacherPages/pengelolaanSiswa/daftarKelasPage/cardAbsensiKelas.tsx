import React from "react";

interface CardProps {
  loading: boolean;
}

export const CardAbsensiKelas: React.FC<CardProps> = ({ loading }) => {
  return (
    <div
      className="shadow p-4 m-1 m-lg-4 m-md-4 my-4 rounded"
      style={{ backgroundColor: "#fff", position: "relative" }}
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
            zIndex: 9999,
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
      <div className="row g-3">
        <div className="col-12">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
          rerum, modi fugiat nam sint ratione vero doloribus temporibus
          reiciendis repellat provident beatae nemo delectus, officiis autem
          ipsam asperiores deleniti ad.
        </div>
      </div>
    </div>
  );
};
