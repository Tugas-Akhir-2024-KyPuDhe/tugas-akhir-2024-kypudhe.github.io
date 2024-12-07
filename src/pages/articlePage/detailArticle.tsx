import React, { useEffect, useState } from "react";
import { FaCalendarDay, FaClock } from "react-icons/fa6";
import ArtikelService from "../../services/artikelService";
import { useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";
import { formatDate, formatTime, Toast } from "../../utils/myFunctions";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { AxiosError } from "axios";

interface FormState {
  id?: number;
  title: string;
  description: string;
  status: string;
  type: string;
  category: string;
  banner: string;
  createAt: Date;
}

export const DetailArticlePage: React.FC = () => {
  const navigate = useNavigate();
  const articleService = ArtikelService();
  const { id } = useParams<{ id: string }>();
  const [dataDetail, setDataDetail] = useState<FormState>({
    title: "",
    description: "",
    status: "",
    type: "",
    category: "",
    banner: "",
    createAt: new Date(),
  });
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const getData = async () => {
      if (id) {
        try {
          const response = await articleService.getArtikelById(id);
          const data = response.data;

          setDataDetail({
            id: data.id,
            title: data.title,
            description: data.description,
            status: data.status,
            type: data.type,
            category: data.category,
            banner: data.banner?.url,
            createAt: data.createdAt,
          });
        } catch (error) {
          const axiosError = error as AxiosError;
          if (axiosError.response?.status === 404) {
            Toast.fire({
              icon: "error",
              title: `Data Tidak Ditemukan!`,
              timer: 4000,
            });
            navigate("/");
          }
        } finally {
          setLoadingData(false);
        }
      } else {
        setLoadingData(false);
      }
    };

    getData();
  }, []);

  return (
    <>
      <div
        className="shadow p-4 m-1 m-lg-4 m-md-4 my-4 rounded"
        style={{ backgroundColor: "#fff" }}
      >
        {loadingData ? (
          <div className="col-12">
            <Skeleton width={"100%"} />
            <Skeleton width={"45%"} />
            <Skeleton width={80} />
            <Skeleton height={450} />
            <div className=" pt-2 pb-5 text-primary fw-medium">
              <div className="d-flex">
                <Skeleton width={150} className="me-4" />
                <Skeleton width={150} />
              </div>
            </div>
            <div className="card-body">
              <Skeleton count={5} />
            </div>
          </div>
        ) : (
          <>
            <div className="title-article mb-2">
              <h4 className="fw-bold mb-1 text-dark-soft">
                {dataDetail.title}
              </h4>
              <div>
                <span className="me-4 text-blue fw-bold">
                  {dataDetail.category || "No Category"}
                </span>
              </div>
            </div>
            {dataDetail.banner && (
              <div className="img-banner mb-2 mt-3">
                <img
                  src={dataDetail.banner}
                  alt={dataDetail.title}
                  className="img-fluid rounded"
                  style={{ height: "450px", width: "100%", objectFit: "cover" }}
                />
              </div>
            )}

            <div className="mb-4">
              <FaCalendarDay className="text-blue fs-6" />
              <span className="ms-2 fw-medium" style={{ fontSize: "0.95em" }}>
                {formatDate(dataDetail.createAt)}
              </span>
              <span className="mx-3">|</span>
              <FaClock className="text-blue fs-6" />
              <span className="ms-2 fw-medium" style={{ fontSize: "0.95em" }}>
                {formatTime(dataDetail.createAt)}
              </span>
            </div>
            <div className="description-article">
              <p>{parse(dataDetail.description)}</p>
            </div>
          </>
        )}
      </div>
    </>
  );
};
