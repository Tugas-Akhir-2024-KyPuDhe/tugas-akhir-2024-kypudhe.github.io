import React from "react";
import { Table } from "../../../features/contentWebPage/ekskulPage/table";
import { HeaderTitlePage } from "../../../components/headerTitlePage";

export const EkskulPage: React.FC = () => {
  
  return (
    <>
      <HeaderTitlePage title="Ekstrakurikuler" subTitle="Ekstrakurikuler Web SMKN 1 Lumban Julu" backDisplay={false} addDisplay={true} linkAdd="tambah"/>
      <Table />
    </>
  );
};
