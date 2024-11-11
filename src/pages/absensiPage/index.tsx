import React from "react";
import { Content } from "../../features/absensiPage/content";
import { HeaderTitlePage } from "../../components/headerTitlePage";

export const AbsensiPage: React.FC = () => {
  
  return (
    <>
      <HeaderTitlePage title="Absensi" subTitle="Absensi Siswa" backDisplay={false} addDisplay={false} linkAdd=""/>
      <Content />
    </>
  );
};
