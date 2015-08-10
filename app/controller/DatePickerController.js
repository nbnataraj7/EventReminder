Ext.define('EventReminder.controller.DatePickerController', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            newEventDate: 'newEvent #selectDate',
            editEventDate: 'editevent #selectDate'
        }
    },

    //Load the Values of all the Data pickers once this Controller is launched
    launch: function(){
        console.log("Installing Proper Date Picker");
        this.getNewEventDate().setYearFrom(2015);
        this.getNewEventDate().setYearTo(2030);
        this.getEditEventDate().setYearFrom(2015);
        this.getEditEventDate().setYearTo(2030);
    }
});