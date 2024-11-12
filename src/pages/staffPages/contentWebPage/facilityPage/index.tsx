import React from "react";
import { Table } from "../../../../features/staffPages/contentWebPage/facilityPage/table";
import { HeaderTitlePage } from "../../../../components/headerTitlePage";

export const FacilityPage: React.FC = () => {
  
  return (
    <>
     <HeaderTitlePage title="Fasilitas" subTitle="Fasilitas Web SMKN 1 Lumban Julu" backDisplay={false} addDisplay={true} linkAdd="tambah" />
      <Table />
    </>
  );
};
