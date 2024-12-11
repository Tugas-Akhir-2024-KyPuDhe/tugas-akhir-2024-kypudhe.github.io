import React from "react";
import { Table } from "../../../../../features/teacherPages/pengelolaanSiswa/daftarKelasPage/nilaiSiswa/table";
import { HeaderTitlePage } from "../../../../../components/headerTitlePage";

export const DaftarKelasNilaiSiswaPage: React.FC = () => {
  
  return (
    <>
      <HeaderTitlePage title="Penilaian Siswa" subTitle="Penilaian Siswa SMKN 1 Lumban Julu" backDisplay={true} addDisplay={false} linkAdd="tambah"/>
      <Table />
    </>
  );
};
