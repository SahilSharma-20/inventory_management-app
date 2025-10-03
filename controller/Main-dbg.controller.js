sap.ui.define([
  "sap/ui/core/mvc/Controller"
], function (Controller) {
  "use strict";

  return Controller.extend("inv.mgm.inventorymanagement.controller.Main", {
    onNavInbound: function () {
      this.getOwnerComponent().getRouter().navTo("Inbound");
    },
    onNavOutbound: function () {
      this.getOwnerComponent().getRouter().navTo("Outbound");
    },
    onNavStockLookup: function () {
      this.getOwnerComponent().getRouter().navTo("StockLookup");
    }
  });
});
