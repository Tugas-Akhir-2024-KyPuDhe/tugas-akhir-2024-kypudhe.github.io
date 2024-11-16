import React from "react";
import { Table } from "../../../../features/staffPages/contentWebPage/galeriPage/table";
import { HeaderTitlePage } from "../../../../components/headerTitlePage";

export const GaleriPage: React.FC = () => {
  return (
    <>
      <HeaderTitlePage
        title="Galeri"
        subTitle="Galeri Web SMKN 1 Lumban Julu"
        backDisplay={false}
        addDisplay={true}
        linkAdd="tambah"
      />
      <Table />
    </>
  );
};
