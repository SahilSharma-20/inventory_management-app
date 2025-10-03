sap.ui.define([
  "sap/ui/core/UIComponent",
  "sap/ui/Device",
  "inv/mgm/inventorymanagement/model/models"
], function (UIComponent, Device, models) {
  "use strict";

  return UIComponent.extend("inv.mgm.inventorymanagement.Component", {
    metadata: {
      manifest: "json",
      interfaces: ["sap.ui.core.IAsyncContentCreation"]
    },

    init: function () {
      UIComponent.prototype.init.apply(this, arguments);

      // Set device model
      this.setModel(models.createDeviceModel(), "device");

      // Add custom models
      this.setModel(models.createAppModel(), "appModel");
      this.setModel(models.createStaticDataModel(), "staticData");

      // Initialize the router
      this.getRouter().initialize();
    }
  });
});
