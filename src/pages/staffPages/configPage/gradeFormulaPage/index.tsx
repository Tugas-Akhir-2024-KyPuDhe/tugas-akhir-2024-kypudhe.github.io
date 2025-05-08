import React from "react";

import { HeaderTitlePage } from "../../../../components/headerTitlePage";
import { TableGradeFormula } from "../../../../features/staffPages/configPage/gradeFormulaPage/tableGradeFormula";

export const GradeFormulaPage: React.FC = () => {
  
  return (
    <>
      <HeaderTitlePage title="Rumus Penilaian" subTitle="Rumus Penilaian Siswa SMKN 1 Lumban Julu" backDisplay={false} addDisplay={true} linkAdd="tambah"/>
      <TableGradeFormula />
    </>
  );
};
