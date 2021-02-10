sap.ui.define([
	'sap/ui/core/mvc/Controller',
	'sap/ui/core/routing/History'
], function (Controller, History) {
	"use strict";
	return Controller.extend("com.test.FUI5.controller.BaseController", {

		_oView: function () {
			return this.getView();
		},

		getEventBus: function () {
			return this.getOwnerComponent().getEventBus();
		},

		getRouter: function () {
			return this.getOwnerComponent().getRouter();
		},

		getModel: function (oModel) {
			return this.getView().getModel(oModel) || this.getOwnerComponent().getModel(oModel);
		},

		setModel: function (oModel, mRef) {
			return this.getOwnerComponent().setModel(oModel, mRef);
		},

		getResourceBundle: function () {
			return this.getOwnerComponent().getMetadata().getManifestEntry('sap.app').dataSources;
		},

		navBack: function (sRoute, mData) {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				this.getModel('otherAttrMRef').setProperty('/saMode', 'ShowHideMode');
				history.go(-1);
			} else {
				var bReplace = true;
				this.getRouter().navTo(sRoute, mData, bReplace);
			}
		},

	});
});