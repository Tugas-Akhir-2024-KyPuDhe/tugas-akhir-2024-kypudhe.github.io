import React from "react";

import { Header } from "../../../features/pengelolaanSiswa/absensiSiswaPage/header";
import { DetailContent } from "../../../features/pengelolaanSiswa/absensiSiswaPage/detailContent";

export const DetailAbsensiSiswaPage: React.FC = () => {
  
  return (
    <>
      <Header actionText="Detail" backDisplay={false} />
      <DetailContent />
    </>
  );
};
