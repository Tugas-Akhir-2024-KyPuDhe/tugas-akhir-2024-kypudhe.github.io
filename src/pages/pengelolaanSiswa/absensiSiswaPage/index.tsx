import React from "react";

import { Table } from "../../../features/pengelolaanSiswa/absensiSiswaPage/table";
import { HeaderTitlePage } from "../../../components/headerTitlePage";

export const AbsensiSiswaPage: React.FC = () => {
  
  return (
    <>
      <HeaderTitlePage title="Absensi Siswa" subTitle="Absensi Siswa SMKN 1 Lumban Julu" backDisplay={false} addDisplay={false} linkAdd=""/>
      <Table />
    </>
  );
};
