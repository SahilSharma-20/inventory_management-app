sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast",
  "sap/ndc/BarcodeScanner"
], function (Controller, MessageToast, BarcodeScanner) {
  "use strict";

  return Controller.extend("inv.mgm.inventorymanagement.controller.StockLookup", {
    onInit() {
      this.getView().setModel(new sap.ui.model.json.JSONModel({
        stockLookupMaterial: "",
        stockDetails: ""
      }));
    },

    onScanStockLookup() {
      BarcodeScanner.scan(
        (mResult) => {
          if (!mResult.cancelled) {
            this.getView().getModel().setProperty("/stockLookupMaterial", mResult.text);
            this.loadStockDetails(mResult.text);
          }
        },
        (Error) => {
          MessageToast.show("Scanning failed: " + Error);
        }
      );
    },

    loadStockDetails(materialCode) {
      // Mock stock details for demo
      const details = `Stock details for material ${materialCode}:\n
        On-hand: 500 units\n
        Batch: B12345\n
        Location: Warehouse 1`;

      this.getView().getModel().setProperty("/stockDetails", details);
    }
  });
});
