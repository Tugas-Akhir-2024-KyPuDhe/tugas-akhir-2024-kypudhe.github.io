import React from "react";

import { HeaderBanner } from "../../../features/contentWebPage/bannerPage/headerBanner";
import { TableBanner } from "../../../features/contentWebPage/bannerPage/tableBanner";

export const BannerPage: React.FC = () => {
  
  return (
    <>
      <HeaderBanner />
      <TableBanner />
    </>
  );
};
