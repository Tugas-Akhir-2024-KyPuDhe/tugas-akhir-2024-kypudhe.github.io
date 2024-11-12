import React from "react";
import { Table } from "../../../../features/teacherPages/pengelolaanSiswa/daftarSiswaPage/table";
import { HeaderTitlePage } from "../../../../components/headerTitlePage";

export const DaftarSiswaPage: React.FC = () => {
  
  return (
    <>
      <HeaderTitlePage title="Daftar Siswa" subTitle="Daftar Siswa SMKN 1 Lumban Julu" backDisplay={false} addDisplay={true} linkAdd="tambah"/>
      <Table />
    </>
  );
};
