import React, { useEffect, useState } from "react";
import { HeaderTitlePage } from "../../../../components/headerTitlePage";
import { IStudyTracer } from "../../../../interface/studyTracer.interface";
import StudyTracerService from "../../../../services/studyTracerService";
import { TableStudyTracer } from "../../../../features/staffPages/contentWebPage/studyTracerPage/tableStudyTracer";
import { showConfirmationDialog, Toast } from "../../../../utils/myFunctions";

export const StudyTracerPage: React.FC = () => {
  const studyTracerService = StudyTracerService();
  const [data, setData] = useState<IStudyTracer[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await studyTracerService.getAllStudyTracers();
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

  const deleteStudyTracer = async (id: number) => {
    const result = await showConfirmationDialog({
      title: "Ingin menghapus StudyTracer ini?",
      icon: "warning",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      setLoading(true);
      try {
        const response = await studyTracerService.deleteStudyTracer(id);
        if (response.status === 200) {
          getData();
          Toast.fire({
            icon: "success",
            title: "Study Tracer berhasil dihapus",
            timer: 4000,
          });
        }
      } catch (error) {
        console.error("Error deleting Study Tracer:", error);
        Toast.fire({
          icon: "error",
          title: "Terjadi kesalahan saat menghapus Study Tracer",
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
        title="Study Tracer"
        subTitle="Study Tracer SMKN 1 Lumban Julu"
        backDisplay={false}
        addDisplay={true}
        linkAdd="tambah"
      />

      <TableStudyTracer
        loading={loading}
        keySearch={searchTerm}
        data={data}
        handleChangekeySearch={handleChangekey}
        handleDetelete={deleteStudyTracer}
      />
    </>
  );
};
