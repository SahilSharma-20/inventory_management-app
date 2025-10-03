sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast",
  "sap/ndc/BarcodeScanner"
], function (Controller, MessageToast, BarcodeScanner) {
  "use strict";

  return Controller.extend("inv.mgm.inventorymanagement.controller.Outbound", {
    onInit() {
      this.getView().setModel(new sap.ui.model.json.JSONModel({
        selectedOutboundMaterial: "",
        outboundQuantity: "0",           // default quantity 0
        selectedOutboundLocation: ""
      }));
    },

    onScanOutboundMaterial() {
      BarcodeScanner.scan(
        (mResult) => {
          if (!mResult.cancelled) {
            this.getView().getModel().setProperty("/selectedOutboundMaterial", mResult.text);
          }
        },
        (Error) => {
          MessageToast.show("Scanning failed: " + Error);
        }
      );
    },

    onSubmitOutbound() {
      const oModel = this.getView().getModel();
      const data = oModel.getData();

      if (!data.selectedOutboundMaterial || !data.outboundQuantity || !data.selectedOutboundLocation) {
        MessageToast.show("Please fill all fields");
        return;
      }

      const appModel = this.getOwnerComponent().getModel("appModel");
      const stockData = appModel.getProperty("/stockData") || [];

      // Find the stock item matching both material and location
      const index = stockData.findIndex(item => 
        item.material === data.selectedOutboundMaterial && 
        item.location === data.selectedOutboundLocation
      );

      const requestedQty = parseInt(data.outboundQuantity, 10);

      if (index > -1) {
        if (stockData[index].quantity >= requestedQty) {
          stockData[index].quantity -= requestedQty;
          MessageToast.show("Outbound material processed.");
          if (stockData[index].quantity === 0) {
            // Optionally remove the stock entry if quantity is zero
            stockData.splice(index, 1);
          }
        } else {
          MessageToast.show("Not enough stock to process outbound.");
          return;
        }
      } else {
        MessageToast.show("Material not found in stock at selected location.");
        return;
      }

      appModel.setProperty("/stockData", stockData);
      this.onResetOutbound();
    },

    onResetOutbound() {
      this.getView().setModel(new sap.ui.model.json.JSONModel({
        selectedOutboundMaterial: "",
        outboundQuantity: "0",
        selectedOutboundLocation: ""
      }));
    },

    onNavBack() {
      this.getOwnerComponent().getRouter().navTo("Main");
    }
  });
});
