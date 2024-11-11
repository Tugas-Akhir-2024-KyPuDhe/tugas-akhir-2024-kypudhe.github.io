import React from "react";
import { Content } from "../../features/kelasPage/content";
import { HeaderTitlePage } from "../../components/headerTitlePage";

export const KelasPage: React.FC = () => {
  
  return (
    <>
      <HeaderTitlePage title="Kelas" subTitle="Kelas Siswa" backDisplay={false} addDisplay={false} linkAdd=""/>
      <Content />
    </>
  );
};
