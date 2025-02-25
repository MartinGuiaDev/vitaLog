import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import * as images from "../../img";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
    backgroundColor: "#f7f7f7",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#007BFF",
  },
  logo: {
    width: 80,
    height: 40,
  },
  textClient:{
    fontSize: 11,
    color: "#000000",
    fontWeight: "bold",
  },
  textAddress:{
    fontSize: 8,
    color: "#000000",
    fontWeight: "medium",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007BFF",
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    backgroundColor: "#ffffff",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 12,
    color: "#555",
  },
  sectionBold: {
    fontSize: 12,
    color: "#000000",
    fontWeight: "bold",
  },
  table: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#007BFF",
    color: "#fff",
    padding: 7,
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    padding: 7,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tableRowOdd: {
    backgroundColor: "#f9f9f9",
  },
  tableCell: {
    flex: 1, // Tamaño estándar para las demás columnas
    fontSize: 9,
    textAlign: "center",
  },
  tableCellWO: {
    flex: 0.6, // Reducir espacio para la columna de Línea
    fontSize: 9,
    textAlign: "center",
  },
  tableCellDO: {
    flex: 0.2, // Reducir espacio para la columna de Línea
    fontSize: 9,
    textAlign: "center",
  },
  rejectionRow: {
    flexDirection: "row",
    padding: 8,
    backgroundColor: "#f1f1f1", // Color de fondo para destacar
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  rejectionCell: {
    flex: 4, // Ocupar el espacio de 4 columnas
    fontSize: 8,
    textAlign: "left",
    color: "#333",
    paddingLeft: 8, // Alinear ligeramente el texto
  },
  emptyCell: {
    flex: 6, // Ocupar el espacio restante para alinear correctamente
  },
});

const WorkOrderPDF = ({ workOrder }) => {
  // if (!workOrder) return null; // Asegúrate de que workOrder no sea null

  return (
    <Document>
      <Page style={styles.page} orientation="landscape">
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>
              Nota de Entrega: {workOrder.numero}
            </Text>
            <Text style={styles.sectionContent}>VITA-BAJIO S.A de C.V</Text>
            <Text style={styles.sectionContent}>
              Hidalgo 1500 San Juan de La Presa, Salamanca
            </Text>
          </View>
          <Image src={images.logoVB} style={styles.logo} />
        </View>
        <View style={styles.section}>
          <View>
            <Text style={styles.sectionTitle}>Detalles de la Recolección</Text>
            <Text style={styles.sectionContent}>
              Recolector:{" "}
              <Text style={styles.sectionBold}>
                {workOrder.createdBy?.name}
                {workOrder.createdBy?.lastName}
              </Text>
            </Text>
            <Text style={styles.sectionContent}>
              Fecha de entrega:{" "}
              <Text style={styles.sectionBold}>
                {workOrder.formattedCreatedAt}
              </Text>
            </Text>
          </View>
          <View>
            <Text style={styles.sectionContent}>Para:</Text>
            <Text style={styles.textClient}>{workOrder.client.name}</Text>
            <Text style={styles.textAddress}>{workOrder.client.address1}</Text>
            <Text style={styles.textAddress}>{workOrder.client.region}</Text>
            <Text style={styles.textAddress}>{workOrder.client.city}{" "}{workOrder.client.zipCode}</Text>
          </View>
        </View>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            {/* <Text style={styles.tableCellDO}></Text> */}
            <Text style={styles.tableCellWO}>Linea</Text>
            <Text style={styles.tableCell}>Código de Ítem</Text>
            <Text style={styles.tableCell}>Código de Barras</Text>
            <Text style={styles.tableCell}>Medida</Text>
            <Text style={styles.tableCell}>Marca</Text>
            <Text style={styles.tableCell}>Banda Requerida</Text>
            <Text style={styles.tableCell}>DOT</Text>
          </View>
          {workOrder.tires.map((tire, index) => (
            <React.Fragment key={index}>
              <View
                style={[
                  styles.tableRow,
                  index % 2 === 1 ? styles.tableRowOdd : null,
                ]}
              >
                {/* <Text style={styles.tableCellDO}>{tire.linea || "-"}</Text> */}
                <Text style={styles.tableCellWO}>
                  {tire.linea || "-"}
                </Text>
                <Text style={styles.tableCell}>{tire.itemCode || "-"}</Text>
                <Text style={styles.tableCell}>{tire.barCode || "-"}</Text>
                <Text style={styles.tableCell}>
                  {tire.helmetMeasurement || "-"}
                </Text>
                <Text style={styles.tableCell}>{tire.brand || "-"}</Text>
                <Text style={styles.tableCell}>{tire.requiredBand || "-"}</Text>
                <Text style={styles.tableCell}>{tire.antiquityDot || "-"}</Text>
              </View>
             
            </React.Fragment>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default WorkOrderPDF;
