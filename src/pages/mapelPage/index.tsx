import React from "react";
import { Content } from "../../features/mapelPage/content";
import { HeaderTitlePage } from "../../components/headerTitlePage";

export const MapelPage: React.FC = () => {
  
  return (
    <>
      <HeaderTitlePage title="Mata Pelajaran" subTitle="Mata Pelajaran Siswa" backDisplay={false} addDisplay={false} linkAdd=""/>
      <Content />
    </>
  );
};
