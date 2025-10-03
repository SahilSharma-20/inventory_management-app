sap.ui.define([ 
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast",
  "sap/ndc/BarcodeScanner"
], function (Controller, MessageToast, BarcodeScanner) {
  "use strict";

  return Controller.extend("inv.mgm.inventorymanagement.controller.Inbound", {
    onInit() {
      this.getView().setModel(new sap.ui.model.json.JSONModel({
        selectedMaterial: "",
        quantity: "0",          // default quantity 0 on load
        selectedLocation: ""
      }));
    },

    onScanMaterial() {
      BarcodeScanner.scan(
        (mResult) => {
          if (!mResult.cancelled) {
            this.getView().getModel().setProperty("/selectedMaterial", mResult.text);
          }
        },
        (Error) => {
          MessageToast.show("Scanning failed: " + Error);
        }
      );
    },

    onSubmit() {
      const oModel = this.getView().getModel();
      const data = oModel.getData();

      if (!data.selectedMaterial || !data.quantity || !data.selectedLocation) {
        MessageToast.show("Please fill all fields");
        return;
      }

      const appModel = this.getOwnerComponent().getModel("appModel");
      const stockData = appModel.getProperty("/stockData") || [];

      const index = stockData.findIndex(item => item.material === data.selectedMaterial && item.location === data.selectedLocation);
      if (index > -1) {
        stockData[index].quantity += parseInt(data.quantity, 10);
      } else {
        stockData.push({
          material: data.selectedMaterial,
          quantity: parseInt(data.quantity, 10),
          location: data.selectedLocation
        });
      }

      appModel.setProperty("/stockData", stockData);

      MessageToast.show("Inbound material saved.");
      this.onReset();
    },

    onReset() {
      this.getView().setModel(new sap.ui.model.json.JSONModel({
        selectedMaterial: "",
        quantity: "0",
        selectedLocation: ""
      }));
    },

    onNavBack() {
      this.getOwnerComponent().getRouter().navTo("Main");
    }
  });
});
