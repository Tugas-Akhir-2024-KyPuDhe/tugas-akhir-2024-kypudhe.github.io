import React, { useEffect, useState } from "react";
import { HeaderTitlePage } from "../../../../components/headerTitlePage";
import { TableProblemReport } from "../../../../features/staffPages/contentWebPage/problemReportPage/tableproblemReport";
import { showConfirmationDialog, Toast } from "../../../../utils/myFunctions";
import ProblemService from "../../../../services/problemService";
import { IProblem } from "../../../../interface/problem.interface";

export const ProblemReportPage: React.FC = () => {
  const problemService = ProblemService();
  const [data, setData] = useState<IProblem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await problemService.getAllProblems();
      setData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangekey = async (key: string) => {
    setSearchTerm(key);
  };

  const deleteProblem = async (id: number) => {
    const result = await showConfirmationDialog({
      title: "Ingin menghapus laporan Malasah ini?",
      icon: "warning",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      setLoading(true);
      try {
        const response = await problemService.deleteProblem(id);
        if (response.status === 200) {
          await getData();
          Toast.fire({
            icon: "success",
            title: "Laporan Masalah berhasil dihapus",
            timer: 4000,
          });
        }
      } catch (error) {
        console.error("Error deleting Laporan Masalah:", error);
        Toast.fire({
          icon: "error",
          title: "Terjadi kesalahan saat menghapus Laporan Masalah",
          timer: 4000,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <HeaderTitlePage
        title="Laporan Masalah"
        subTitle="Laporan Masalah Portal SMKN 1 Lumban Julu"
        backDisplay={false}
        addDisplay={false}
        linkAdd=""
      />

      <TableProblemReport
        loading={loading}
        keySearch={searchTerm}
        data={data}
        handleChangekeySearch={handleChangekey}
        handleDetelete={deleteProblem}
      />
    </>
  );
};
