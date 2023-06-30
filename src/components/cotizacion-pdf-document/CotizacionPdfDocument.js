import React from "react";
import { Page, Text, View, Document, Image } from "@react-pdf/renderer";

export const CotizacionPdfDocument = ({ imgSrcUrl }) => {
  return (
    <Document>
      <Page style={{ padding: 20 }}>
        {imgSrcUrl && <Image src={imgSrcUrl} />}
      </Page>
    </Document>
  );
};
