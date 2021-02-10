sap.ui.define([
	"./BaseController",
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox"
], function (BaseController, 
			Controller,
			MessageBox) {
	"use strict";

	return BaseController.extend("com.test.FUI5.controller.Master", {
		onInit: function () {
			this.MainMRef = this.getModel('MainMRef');
			this.MainMRef.setSizeLimit('5000');
			this.orders = this.getModel('OrdersMRef');
			this.orders.setSizeLimit('5000');
			this.orders.getData().EOrders = [];
			
			this.MainMRef.getData().oa = {};
			this.MainMRef.getData().Employee = {};
			this.oa = this.MainMRef.getData().oa;
			this.employee = this.MainMRef.getData().Employee;
			this.oa.empId = '';
			this.oa.orderTblBusy = true;
			this.MainMRef.refresh();
			this.getOwnerComponent().getRouter().getRoute('master').attachPatternMatched(this._onRouteMatched, this);			
		},
		
		_onRouteMatched: function(e){
			console.log('master route match');
		},
		
		onUpdateFinished: function(e){
			console.log('list update finished');
			var that = this;
			this.orders.getData().EOrders = [];
			let aItems = this.byId('idEmployeeList');
			aItems.setSelectedItem(aItems.getItems()[0]);
			
			var bp = aItems.getItems()[0].getBindingContext('northwind').sPath; //Employees(1)
			let bpData = this.getView().getModel('northwind').getProperty(bp);
			this.oa.empId = bpData.EmployeeID;
			this.MainMRef.getData().Employee = {};
			this.MainMRef.getData().Employee = bpData;
			this.MainMRef.refresh();
			
			var aOrdersByEmp = bp + '/Orders';
			var WorkCenterPromise = $.Deferred();
			this.getView().getModel('northwind').read(aOrdersByEmp, {
				success: function(data, response){
					that.orders.getData().EOrders = data.results;
					that.orders.refresh();
					WorkCenterPromise.resolve();
					console.log('success');
				 },
				error: function(error){
					WorkCenterPromise.reject();	 
					that.oa.orderTblBusy = false;
					that.MainMRef.refresh();					
					MessageBox.error(error.response.body);
				}					
			},this);
			Promise.all(
				[
					WorkCenterPromise
				]
			).then($.proxy(this._setOrders, this));			
			console.log('bp ' + bp);
			
		},
		
		_setOrders: function(){
//			this.getRouter().navTo('detail', {employeeID: this.oa.empId});
			this.oa.orderTblBusy = false;
			this.MainMRef.refresh();
		},
		
		onListSelChg: function(e){
			var that = this;
			this.oa.orderTblBusy = true;
			this.MainMRef.refresh();
			this.orders.getData().EOrders = [];
			let aItems = this.byId('idEmployeeList');
			let bp = aItems.getSelectedContextPaths()[0];//Employee(2)
			let bpData = this.getView().getModel('northwind').getProperty(bp);
			this.oa.empId = bpData.EmployeeID;
			this.MainMRef.getData().Employee = {};
			this.MainMRef.getData().Employee = bpData;
			this.MainMRef.refresh();
			this.orders.refresh();
			this.MainMRef.refresh();
			var aOrdersByEmp = bp + '/Orders';
			var WorkCenterPromise = $.Deferred();
			this.getView().getModel('northwind').read(aOrdersByEmp, {
				success: function(data, response){
					that.orders.getData().EOrders = data.results;
					that.orders.refresh();
					WorkCenterPromise.resolve();
					console.log('success');
				 },
				error: function(error){
					WorkCenterPromise.reject();	 
					that.oa.orderTblBusy = false;
					that.MainMRef.refresh();					
					MessageBox.error(error.response.body);
				}					
			},this);
			Promise.all(
				[
					WorkCenterPromise
				]
			).then($.proxy(this._setOrders2, this));			
			console.log('bp ' + bp);
			console.log('test');
		},
		
		_setOrders2: function(){
//			this.getRouter().navTo('detail', {employeeID: this.oa.empId});
			this.oa.orderTblBusy = false;
			this.MainMRef.refresh();
		},
	});
});