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

    loadStockDetails: function (materialCode) {
      const appModel = this.getOwnerComponent().getModel("appModel");
      const staticDataModel = this.getOwnerComponent().getModel("staticData");
      const stockData = appModel.getProperty("/stockData") || [];

      console.log("Stock Data Array:", stockData);

      // Find stock entry for the material
      const entry = stockData.find(item => item.material === materialCode);

      if (entry) {
        // Find location name by ID
        const locations = staticDataModel.getProperty("/storageLocations");
        const locationObj = locations.find(loc => loc.id === entry.location);
        const locationName = locationObj ? locationObj.name : entry.location;

        // Set formatted stock details with location name
        const details = `Material: ${entry.material}\nQuantity: ${entry.quantity}\nLocation: ${locationName}`;
        this.getView().getModel().setProperty("/stockDetails", details);
      } else {
        this.getView().getModel().setProperty("/stockDetails", `No stock record found for: ${materialCode}`);
      }
    },

    onMaterialSubmit: function(oEvent) {
      const materialCode = oEvent.getParameter("value");
      if (materialCode) {
        this.loadStockDetails(materialCode);
      }
    },

    onNavBack() {
      this.getOwnerComponent().getRouter().navTo("Main");
    }
  });
});
