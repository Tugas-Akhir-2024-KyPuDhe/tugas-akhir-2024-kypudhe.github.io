import { useEffect, useState } from "react";
import AuthService from "../../services/authService";
import {
  GetUserResponse,
  StaffDetails,
  StudentDetails,
} from "../../interface/auth.interface";
import { CardBiodata } from "../../features/profilePage/cardBiodata";
import { CardInformasi1 } from "../../features/profilePage/cardInformasi1";
import { CardInformasi2 } from "../../features/profilePage/cardInformasi2";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const ProfilePage = () => {
  const authService = AuthService();

  const [profileDetail, setProfileDetail] = useState<
    StudentDetails | StaffDetails | null
  >(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getUser = async () => {
    try {
      const response: GetUserResponse = await authService.getUser();

      if (response.status === 200) {
        if (response.user.role === "STUDENT") {
          setProfileDetail({
            id: response.user.details[0].id,
            uuid: response.user.details[0].uuid,
            name: response.user.details[0].name,
            birthPlace: response.user.details[0].birthPlace,
            address: response.user.details[0].address,
            nis: "112233",
            nisn: "332211",
            phone: response.user.details[0].phone,
            email: response.user.details[0].email,
            startYear: "2018-09-02",
            createdAt: "",
            updatedAt: "",
            photo: null,
          });
        } else if (
          response.user.role === "STAFF" ||
          response.user.role === "TEACHER"
        ) {
          setProfileDetail({
            id: response.user.details[0].id,
            uuid: response.user.details[0].uuid,
            name: response.user.details[0].name,
            birthPlace: response.user.details[0].birthPlace,
            address: response.user.details[0].address,
            phone: response.user.details[0].phone,
            email: response.user.details[0].email,
            nip: "P001",
            type: "ADMIN",
            startDate: "",
            createdAt: "",
            updatedAt: "",
            photo: null,
          });
        }
      }

      setLoading(false);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError("Failed to fetch user data.");
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      {!loading && profileDetail ? (
        <div className="row g-0">
          <CardBiodata
            name={profileDetail.name}
            email={profileDetail.email || "-"}
            phone={profileDetail.phone || "-"}
            address={profileDetail.address || "-"}
            birthPlace={profileDetail.birthPlace || "-"}
          />
          <div className="col-12 col-lg-7 col-md-7">
            <div className="row">
              <CardInformasi1 />
              <CardInformasi2 />
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 m-1 m-lg-4 m-md-4 my-4 me-lg-0 me-md-0 rounded">
          <div className="row">
            <div className="col-12 col-lg-5 col-md-5">
              <Skeleton height={650} />
            </div>
            <div className="col-12 col-lg-7 col-md-7">
              <div className="row g-4">
                <div className="col-12">
                  <Skeleton height={350} />
                </div>
                <div className="col-12">
                  <Skeleton height={300} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
