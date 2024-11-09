import React from "react";

import { Header } from "../../../features/pengelolaanSiswa/daftarSiswaPage/header";
import { Table } from "../../../features/pengelolaanSiswa/daftarSiswaPage/table";

export const DaftarSiswaPage: React.FC = () => {
  
  return (
    <>
      <Header actionText="" backDisplay={false} addDisplay={true} />
      <Table />
    </>
  );
};
