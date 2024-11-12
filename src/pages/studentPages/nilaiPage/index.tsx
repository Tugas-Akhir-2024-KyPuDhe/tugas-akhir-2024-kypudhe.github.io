import React from "react";
import { Content } from "../../../features/studentPages/nilaiPage/content";
import { HeaderTitlePage } from "../../../components/headerTitlePage";

export const NilaiPage: React.FC = () => {
  
  return (
    <>
      <HeaderTitlePage title="Nilai" subTitle="Nilai Siswa" backDisplay={false} addDisplay={false} linkAdd=""/>
      <Content />
    </>
  );
};
