import React from "react";
import { HeaderTitlePage } from "../../../../components/headerTitlePage";
import { TableCollectionGaleri } from "../../../../features/staffPages/contentWebPage/galeriPage/tableCollection";

export const UpdateGaleriColletion: React.FC = () => {

  return (
    <>
      <HeaderTitlePage
        title={`Update Koleksi Galeri`}
        subTitle="Koleksi Galeri Web SMKN 1 Lumban Julu"
        backDisplay={true}
        addDisplay={false}
        linkAdd=""
      />
      <TableCollectionGaleri /> 
    </>
  );
};
