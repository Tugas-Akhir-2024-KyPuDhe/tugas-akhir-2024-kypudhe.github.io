import React from "react";
import { HeaderTitlePage } from "../../../../components/headerTitlePage";
import { Table } from "../../../../features/staffPages/managementSiswaPage/dataSiswaPage/table";

export const DataSiswaMangementSiswaPage: React.FC = () => {
  return (
    <>
      <HeaderTitlePage
        title="Data Siswa"
        subTitle="Data Siswa SMKN 1 Lumban Julu"
        backDisplay={false}
        addDisplay={true}
        linkAdd="tambah"
      />
      <Table />
    </>
  );
};
