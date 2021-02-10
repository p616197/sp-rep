sap.ui.define([
	"./BaseController",
	"sap/ui/core/mvc/Controller"
], function (
		BaseController,
		Controller) {
	"use strict";

	return BaseController.extend("com.test.FUI5.controller.Detail", {
		onInit: function () {
			this.getOwnerComponent().getRouter().getRoute('detail').attachPatternMatched(this._onRouteMatched, this);
		
		},
		
		_onRouteMatched: function(e){
			console.log('Detail route match');	
		},
		
	});
});