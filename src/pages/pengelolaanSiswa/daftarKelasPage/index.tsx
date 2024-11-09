import React from "react";

import { Header } from "../../../features/pengelolaanSiswa/daftarKelasPage/header";
import { Table } from "../../../features/pengelolaanSiswa/daftarKelasPage/table";

export const DaftarKelasPage: React.FC = () => {
  
  return (
    <>
      <Header actionText="" backDisplay={false} addDisplay={true} />
      <Table />
    </>
  );
};
