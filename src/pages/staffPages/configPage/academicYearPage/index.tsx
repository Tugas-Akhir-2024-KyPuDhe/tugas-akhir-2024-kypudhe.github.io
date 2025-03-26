import React from "react";
import { HeaderTitlePage } from "../../../../components/headerTitlePage";
import { TableAcademicYear } from "../../../../features/staffPages/configPage/academicYearPage/tableAcademicYear";

export const AcademicYearPage: React.FC = () => {
  
  return (
    <>
      <HeaderTitlePage title="Tahun Ajaran" subTitle="Data Tahun Ajaran SMKN 1 Lumban Julu" backDisplay={false} addDisplay={true} linkAdd="tambah"/>
      <TableAcademicYear />
    </>
  );
};
