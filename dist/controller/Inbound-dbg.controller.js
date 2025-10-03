sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast",
  "sap/ndc/BarcodeScanner"
], function (Controller, MessageToast, BarcodeScanner) {
  "use strict";

  return Controller.extend("inv.mgm.inventorymanagement.controller.Inbound", {
    onInit() {
      // Set model for inbound data
      this.getView().setModel(new sap.ui.model.json.JSONModel({
        selectedMaterial: "",
        quantity: 0,
        selectedLocation: ""
      }));
    },

    onScanMaterial() {
      BarcodeScanner.scan(
        (mResult) => {
          if (!mResult.cancelled) {
            this.getView().getModel().setProperty("/selectedMaterial", mResult.text);
            MessageToast.show("Scanned: " + mResult.text);
          }
        },
        (Error) => {
          MessageToast.show("Scanning failed: " + Error);
        }
      );
    },

    onSubmit() {
      const oModel = this.getView().getModel();
      const material = oModel.getProperty("/selectedMaterial");
      const qty = oModel.getProperty("/quantity");
      const loc = oModel.getProperty("/selectedLocation");

      if (!material || qty <= 0 || !loc) {
        MessageToast.show("Please fill all fields.");
        return;
      }

      // TODO: Submit inbound material to backend/service
      MessageToast.show(`Inbound Confirmed: ${material} qty: ${qty} loc: ${loc}`);

      this.onReset();
    },

    onReset() {
      this.getView().getModel().setData({
        selectedMaterial: "",
        quantity: 0,
        selectedLocation: ""
      });
    }
  });
});
