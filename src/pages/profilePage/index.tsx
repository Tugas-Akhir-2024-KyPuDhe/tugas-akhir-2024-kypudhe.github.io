import { useEffect, useState } from "react";
import AuthService from "../../services/authService";
import { CardBiodata } from "../../features/profilePage/cardBiodata";
import { CardInformasi1 } from "../../features/profilePage/cardInformasi1";
import { CardInformasi2 } from "../../features/profilePage/cardInformasi2";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  DetailUserResponse,
  UpdatedBiodata,
} from "../../interface/auth.interface";
import { formatGender, Toast } from "../../utils/myFunctions";
import noPhotoFemale from "./../../assets/images/profile-female.jpg";
import noPhotoMale from "./../../assets/images/profile-male.jpg";

export const ProfilePage = () => {
  const authService = AuthService();

  const [profileDetail, setProfileDetail] = useState<DetailUserResponse | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [statusUpdateData, setstatusUpdateData] = useState(false);
  const [loadingUpdateData, setloadingUpdateData] = useState(false);

  const getUser = async () => {
    try {
      const user = await authService.getUser();
      setProfileDetail(user);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError("Failed to fetch user data");
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleUpdateAccess = () => setstatusUpdateData(!statusUpdateData);

  const handleSaveUpdate = async (updatedData: UpdatedBiodata) => {
    try {
      setloadingUpdateData(true);
      const response = await authService.updateUser(updatedData);
      if (response.status === 200) {
        await getUser();
        setstatusUpdateData(false);
        setloadingUpdateData(false);
        Toast.fire({
          icon: "success",
          title: `Data Berhasil Diupdate!`,
          timer: 4000,
        });
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
    setloadingUpdateData(false);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      {!loading && profileDetail ? (
        <div className="row g-0">
          <CardBiodata
            handleUpdateAccess={handleUpdateAccess}
            onSaveUpdate={handleSaveUpdate}
            statusUpdateData={statusUpdateData}
            loadingUpdateData={loadingUpdateData}
            photo={
              profileDetail.details[0].photo?.url ||
              profileDetail.details[0].gender === "L"
                ? noPhotoMale
                : noPhotoFemale
            }
            name={profileDetail.details[0].name}
            email={profileDetail.details[0].email || "-"}
            phone={profileDetail.details[0].phone || "-"}
            address={profileDetail.details[0].address || "-"}
            gender={formatGender(profileDetail.details[0].gender || "-")}
            birthPlace={profileDetail.details[0].birthPlace || "-"}
          />
          <div className="col-12 col-lg-7 col-md-7">
            <div className="row">
              <CardInformasi1
                //STAFF OR TEACHER
                nip={profileDetail.details[0].nip || "-"}
                position={profileDetail.details[0].position || "-"}
                startDate={profileDetail.details[0].startDate || "-"}
                typeStaff={profileDetail.details[0].type || "-"}
                //STUDENT
                nis={profileDetail.details[0].nis || "-"}
                nisn={profileDetail.details[0].nisn || "-"}
              />
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
