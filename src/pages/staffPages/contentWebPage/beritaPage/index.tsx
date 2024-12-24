import React from "react";

import { Table } from "../../../../features/staffPages/contentWebPage/beritaPage/table";
import { HeaderTitlePage } from "../../../../components/headerTitlePage";

export const BeritaPage: React.FC = () => {
  
  return (
    <>
      <HeaderTitlePage title="Berita/Artikel" subTitle="Berita Web SMKN 1 Lumban Julu" backDisplay={false} addDisplay={true} linkAdd="tambah"/>
      <Table />
    </>
  );
};
