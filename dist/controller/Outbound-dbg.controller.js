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
        outboundQuantity: 0,
        selectedOutboundLocation: ""
      }));
    },

    onScanOutboundMaterial() {
      BarcodeScanner.scan(
        (mResult) => {
          if (!mResult.cancelled) {
            this.getView().getModel().setProperty("/selectedOutboundMaterial", mResult.text);
            MessageToast.show("Scanned: " + mResult.text);
          }
        },
        (Error) => {
          MessageToast.show("Scanning failed: " + Error);
        }
      );
    },

    onSubmitOutbound() {
      const oModel = this.getView().getModel();
      const material = oModel.getProperty("/selectedOutboundMaterial");
      const qty = oModel.getProperty("/outboundQuantity");
      const loc = oModel.getProperty("/selectedOutboundLocation");

      if (!material || qty <= 0 || !loc) {
        MessageToast.show("Please fill all fields.");
        return;
      }

      // TODO: Submit outbound material to backend/service
      MessageToast.show(`Outbound Confirmed: ${material} qty: ${qty} loc: ${loc}`);

      this.onResetOutbound();
    },

    onResetOutbound() {
      this.getView().getModel().setData({
        selectedOutboundMaterial: "",
        outboundQuantity: 0,
        selectedOutboundLocation: ""
      });
    }
  });
});
