import React from "react";

import { Header } from "../../../features/pengelolaanSiswa/nilaiSiswaPage/header";
import { Table } from "../../../features/pengelolaanSiswa/nilaiSiswaPage/table";

export const NilaiSiswaPage: React.FC = () => {
  
  return (
    <>
      <Header actionText="" backDisplay={false} addDisplay={true} />
      <Table />
    </>
  );
};
