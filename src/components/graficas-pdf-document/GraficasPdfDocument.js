import React from "react";
import { Page, Text, View, Document, Image } from "@react-pdf/renderer";

export const GraficasPdfDocument = ({ title, stateArr }) => {
  return (
    <Document>
      <Page>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            paddingTop: 10,
          }}
        >
          <Text>{title}</Text>
        </View>
        {stateArr.map((srcUrl) => (
          <Image src={srcUrl} style={{ padding: 20 }} />
        ))}
      </Page>
    </Document>
  );
};
