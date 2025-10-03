sap.ui.define([
  "sap/ui/model/json/JSONModel",
  "sap/ui/Device"
], function (JSONModel, Device) {
  "use strict";

  return {
    createDeviceModel: function () {
      var oModel = new JSONModel(Device);
      oModel.setDefaultBindingMode("OneWay");
      return oModel;
    },

    // 🔧 This fixes your error
    createAppModel: function () {
      var oAppModel = new JSONModel({
        selectedRole: "",
        selectedMaterial: "",
        selectedLocation: "",
        quantity: "",
        transactions: []
      });
      oAppModel.setDefaultBindingMode("TwoWay");
      return oAppModel;
    },

    createStaticDataModel: function () {
      var oStaticDataModel = new JSONModel();
      oStaticDataModel.loadData("model/staticData.json");
      return oStaticDataModel;
    }
  };
});
