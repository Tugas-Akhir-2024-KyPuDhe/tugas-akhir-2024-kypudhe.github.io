import React from "react";

import { Header } from "../../../features/contentWebPage/bannerPage/header";
import { TableBanner } from "../../../features/contentWebPage/bannerPage/tableBanner";

export const BannerPage: React.FC = () => {
  
  return (
    <>
      <Header actionText="" backDisplay={false} addDisplay={true} />
      <TableBanner />
    </>
  );
};
