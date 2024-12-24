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

export const DetailKelasSiswaPage: React.FC = () => {
  const navigate = useNavigate();
  const studentHistory = StudentHistoryService();

  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<StudentHistory>();

  useEffect(() => {
    const getDataSiswa = async () => {
      if (id) {
        try {
          setLoading(true);
          const response = await studentHistory.getStudentHistoryDetail(id);
          setData(response.data);
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
      <CardNilaiDetailKelas loading={loading} data={data!} />
      <CardAbsensiDetailKelas loading={loading} data={data!} />
    </>
  );
};
