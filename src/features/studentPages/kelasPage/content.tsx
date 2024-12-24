import React, { useEffect, useState } from "react";
import StudentHistoryService from "../../../services/studentHistoryService";
import { decodeToken } from "../../../utils/myFunctions";
import useCookie from "react-use-cookie";
import { StudentHistory } from "../../../interface/studentHistory.interface";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

export const Content: React.FC = () => {
  const [cookieLogin] = useCookie("userLoginCookie");
  const userLoginCookie = cookieLogin ? JSON.parse(cookieLogin) : null;
  const studentHistory = StudentHistoryService();
  const dtoken = decodeToken(userLoginCookie.token);

  const [data, setData] = useState<StudentHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await studentHistory.getStudentHistory(
        dtoken.student_id
      );
      setData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div
      className="shadow p-4 m-1 m-lg-4 m-md-4 my-4 rounded"
      style={{
        backgroundColor: "#fff",
        position: "relative",
      }}
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
        {data.map((data, index) => (
          <>
            <div className="col-12 col-lg-4 col-md-3 mb-3" key={index}>
              <div className="card card-body">
                <span
                  className={`badge mb-2 ${
                    data.status === "Aktif"
                      ? "text-bg-success"
                      : data.status === "Naik"
                      ? "text-bg-primary"
                      : "text-bg-danger"
                  }`}
                  style={{ maxWidth: "fit-content" }}
                >
                  {data.status}
                </span>
                <h4>{data.currentClass.name}</h4>
                <h6>Wali Kelas : {data.currentClass.homeRoomTeacher.name}</h6>
                <hr />
                <div className="d-flex justify-content-between">
                  <div className="my-auto text-start fw-medium">{data.academicYear}</div>
                  <Link to={`detail/${data.uuid}`} className="btn btn-primary bg-blue w-auto px-3">
                    <FaArrowRight className="fs-5"/>{" "}
                  </Link>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};
