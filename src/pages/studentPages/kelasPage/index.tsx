import React from "react";
import { Content } from "../../../features/studentPages/kelasPage/content";
import { HeaderTitlePage } from "../../../components/headerTitlePage";

export const KelasPage: React.FC = () => {
  
  return (
    <>
      <HeaderTitlePage title="Kelas Siswa" subTitle="Semua Kelas Siswa Saat Ini" backDisplay={false} addDisplay={false} linkAdd=""/>
      <Content />
    </>
  );
};
