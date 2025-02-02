import React from "react";
import { HeaderTitlePage } from "../../../../components/headerTitlePage";
import { TableSchoolYear } from "../../../../features/staffPages/configPage/bannerPage/tableSchoolYear";

export const SchoolYearPage: React.FC = () => {
  
  return (
    <>
      <HeaderTitlePage title="Tahun Ajaran" subTitle="Data Tahun Ajaran SMKN 1 Lumban Julu" backDisplay={false} addDisplay={true} linkAdd="tambah"/>
      <TableSchoolYear />
    </>
  );
};
