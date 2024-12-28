import React from "react";
import { Table } from "../../../features/teacherPages/jadwalMengajarPage/table";
import { HeaderTitlePage } from "../../../components/headerTitlePage";

export const JadwalMengajarPage: React.FC = () => {
  
  return (
    <>
      <HeaderTitlePage title="Jadwal Mengajar Guru" subTitle="Daftar Jadwal Mengajar Guru" backDisplay={false} addDisplay={false} linkAdd="tambah"/>
      <Table />
    </>
  );
};
