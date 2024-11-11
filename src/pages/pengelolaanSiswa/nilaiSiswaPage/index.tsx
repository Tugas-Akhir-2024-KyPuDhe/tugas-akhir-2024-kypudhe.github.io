import React from "react";
import { Table } from "../../../features/pengelolaanSiswa/nilaiSiswaPage/table";
import { HeaderTitlePage } from "../../../components/headerTitlePage";

export const NilaiSiswaPage: React.FC = () => {
  
  return (
    <>
      <HeaderTitlePage title="Nilai Siswa" subTitle="Nilai Siswa SMKN 1 Lumban Julu" backDisplay={false} addDisplay={true} linkAdd="tambah"/>
      <Table />
    </>
  );
};
