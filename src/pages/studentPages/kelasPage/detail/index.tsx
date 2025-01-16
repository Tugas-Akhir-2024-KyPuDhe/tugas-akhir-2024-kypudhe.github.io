import React, { useEffect, useState } from "react";
import { HeaderTitlePage } from "../../../../components/headerTitlePage";
import { useNavigate, useParams } from "react-router-dom";
import StudentHistoryService from "../../../../services/studentHistoryService";
import { StudentHistory } from "../../../../interface/studentHistory.interface";
import { CardSumaryDetailKelas } from "../../../../features/studentPages/kelasPage/CardSumaryDetailKelas";
import { CardNilaiDetailKelas } from "../../../../features/studentPages/kelasPage/CardNilaiDetailKelas";
import { CardAbsensiDetailKelas } from "../../../../features/studentPages/kelasPage/CardAbsensiDetailKelas";
import { AxiosError } from "axios";
import { Toast } from "../../../../utils/myFunctions";
import { CardPerangkatKelas } from "../../../../features/studentPages/kelasPage/CardPerangkatKelas";
import StudentPositionService from "../../../../services/studentPositionInClassService";
import { IStudentPositionInClass } from "../../../../interface/studentPosition.interface";

export const DetailKelasSiswaPage: React.FC = () => {
  const navigate = useNavigate();
  const studentHistory = StudentHistoryService();
  const studentPosition = StudentPositionService();

  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<StudentHistory>();
  const [dataPosition, setDataPosition] = useState<IStudentPositionInClass[]>(
    []
  );

  useEffect(() => {
    const getDataSiswa = async () => {
      if (id) {
        try {
          setLoading(true);
          const response = await studentHistory.getStudentHistoryDetail(id);
          setData(response.data);
          await getPositionInClass(parseInt(response.data.currentClassId));
        } catch (error) {
          console.error(error);
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
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    getDataSiswa();
  }, []);

  const getPositionInClass = async (id: number) => {
    try {
      const response = await studentPosition.getAllPositionByClass(id);
      setDataPosition(response.data!);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <HeaderTitlePage
        title="Detail Riwayat Kelas Siswa"
        subTitle="Detail Riwayat Kelas Siswa Selama Belajar"
        backDisplay={true}
        addDisplay={false}
        linkAdd=""
      />
      <CardSumaryDetailKelas loading={loading} data={data!} />
      <CardPerangkatKelas
        loading={loading}
        data={dataPosition || []}
      />
      <CardNilaiDetailKelas loading={loading} data={data!} />
      <CardAbsensiDetailKelas loading={loading} data={data!} />
    </>
  );
};
