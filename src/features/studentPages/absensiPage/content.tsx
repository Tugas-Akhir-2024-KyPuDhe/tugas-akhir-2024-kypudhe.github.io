import React, { useEffect, useState } from "react";
import Select from "react-select";
import StudentAttendanceService from "../../../services/studentAttendanceService";
import useCookie from "react-use-cookie";
import { decodeToken } from "../../../utils/myFunctions";
import StudentHistoryService from "../../../services/studentHistoryService";
import { StudentHistory } from "../../../interface/studentHistory.interface";
import { AttendanceMonth } from "../../../interface/studentAttendance.interface";
import { CardAbsensiStudent } from "../../../components/cardAbsensiStudent";

export const Content: React.FC = () => {
  const studentAttendanceService = StudentAttendanceService();
  const studentHistory = StudentHistoryService();

  const [cookieLogin] = useCookie("userLoginCookie");
  const userLoginCookie = cookieLogin ? JSON.parse(cookieLogin) : null;
  const dtoken = decodeToken(userLoginCookie.token);
  const [selectedOption, setSelectedOption] = useState({
    value: "",
    label: "",
  });
  const [summary, setSummary] = useState({
    waliKelas: "",
    kelas: "",
    status: "",
  });
  const [dataHistory, setDataHistory] = useState<StudentHistory[]>([]);
  const [dataAttendance, setDataAttendance] = useState<AttendanceMonth[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await studentHistory.getStudentHistory(
        dtoken.student_id
      );
      setDataHistory(response.data);
      const activeClass = response.data.find((item) => item.status === "Aktif");
      if (activeClass) {
        await getStudentDetailAttendance(
          dtoken.nis,
          parseInt(activeClass.currentClassId)
        );
        setSelectedOption({
          label: activeClass.currentClass.name,
          value: activeClass.currentClass.name,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const selectedClass = dataHistory.find(
      (dt) => dt.currentClass.name === selectedOption.value
    );

    if (selectedClass) {
      setSummary({
        waliKelas:
          selectedClass.currentClass.homeRoomTeacher?.name || "Tidak Ada",
        kelas: selectedClass.currentClass.name || "Tidak Ada",
        status: selectedClass.status,
      });
    }
  }, [selectedOption, dataHistory]);

  const getStudentDetailAttendance = async (nis: string, classId: number) => {
    try {
      const response =
        await studentAttendanceService.getStudentDetailAttendance(nis, classId);
      setDataAttendance(response.data.attendances);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectChange = (
    selectedOption: { value: string; label: string } | null
  ) => {
    if (selectedOption) {
      setSelectedOption(selectedOption);
    }
  };

  return (
    <>
      <div
        className="shadow p-4 m-1 m-lg-4 m-md-4 my-4 rounded"
        style={{
          backgroundColor: "#fff",
          position: "relative",
          minHeight: "30vh",
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
        <div className="row gy-3">
          <div className="col-12">
            <div className="col-12 col-lg-4 col-md-3">
              <Select
                options={dataHistory.map((dt) => ({
                  value: dt.currentClass.name,
                  label: dt.currentClass.name,
                }))}
                onChange={handleSelectChange}
                value={selectedOption}
                isSearchable={false}
                placeholder="Pilih Kelas"
                className="form-control-lg px-0 pt-0"
                styles={{
                  control: (baseStyles) => ({
                    ...baseStyles,
                    fontSize: "0.955rem",
                    minHeight: "48px",
                    borderRadius: "8px",
                  }),
                  option: (provided) => ({
                    ...provided,
                    fontSize: "1rem",
                  }),
                }}
              />
            </div>
          </div>

          <div className="col-12">
            <div className="row mb-3">
              <div className="col-2 fw-medium">Wali Kelas</div>
              <div className="col-auto">:</div>
              <div className="col-9 fw-medium">{summary.waliKelas}</div>
            </div>
            <div className="row mb-3">
              <div className="col-2 fw-medium">Kelas</div>
              <div className="col-auto">:</div>
              <div className="col-9 fw-medium">{summary.kelas}</div>
            </div>
            <div className="row mb-3">
              <div className="col-2 fw-medium">Status </div>
              <div className="col-auto">:</div>
              <div className="col-9 fw-medium">{summary.status}</div>
            </div>
          </div>
        </div>
      </div>

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
        <div className="row mb-3 g-3">
          <CardAbsensiStudent data={dataAttendance} />
        </div>
      </div>
    </>
  );
};
