import React from "react";

import { Header } from "../../../features/pengelolaanSiswa/absensiSiswaPage/header";
import { Table } from "../../../features/pengelolaanSiswa/absensiSiswaPage/table";

export const AbsensiSiswaPage: React.FC = () => {
  
  return (
    <>
      <Header actionText="" backDisplay={false} />
      <Table />
    </>
  );
};
