import React from "react";
import { DetailContent } from "../../../../features/teacherPages/pengelolaanSiswa/absensiSiswaPage/detailContent";
import { HeaderTitlePage } from "../../../../components/headerTitlePage";

export const DetailAbsensiSiswaPage: React.FC = () => {
  
  return (
    <>
      <HeaderTitlePage title="Detail Absensi Siswa" subTitle="Absensi Siswa SMKN 1 Lumban Julu" backDisplay={false} addDisplay={false} linkAdd=""/>
      <DetailContent />
    </>
  );
};
