import React from "react";

import { TableBanner } from "../../../features/contentWebPage/bannerPage/tableBanner";
import { HeaderTitlePage } from "../../../components/headerTitlePage";

export const BannerPage: React.FC = () => {
  
  return (
    <>
      <HeaderTitlePage title="Banner" subTitle="Banner Web SMKN 1 Lumban Julu" backDisplay={false} addDisplay={true} linkAdd="tambah"/>
      <TableBanner />
    </>
  );
};
