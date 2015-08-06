Ext.define('EventReminder.controller.Upcoming', {
extend: 'Ext.app.Controller',
config: {
refs: {
    upcoming: 'upcoming',
    main: 'main',
    editEvent: 'editevent',
    editTimeSelect: 'editevent #eventTimeSelect',
    alertTimeSelect: 'editevent #alertTimeSelect',
    editEventPriority: 'editevent #priority',
    editCategory: 'editevent #selectCategory',
    editDate: 'editevent #selectDate',
    editList: 'editevent #peopleList',
    editMessage: 'editevent #message',
    editActivity: 'editevent #activity',
    editHidden: 'editevent #hiddenField'

},
control: {
    upcoming: {
    backCommand: 'onBack',
    editEventCommand: 'onEditEvent'
}
}
},
onBack: function(){
    Ext.Viewport.animateActiveItem(this.getMain(), {type: 'slide', direction: 'right'});
},

//Open a view for editing the Event
//Also set the values of the fields
onEditEvent: function(record){
     var editEventScreen = this.getEditEvent();

    //Setting the Default values of the form fields
    //Saving data in a variable
    var data = record.getData();
    //console.log("Data: ");
    //console.log(data);

    //Hidden field value (to be used as an identifier)
    console.log(data.EventID);

    this.getEditHidden().setValue(data.EventID);
    this.getEditCategory().setValue(data.category);
    this.getEditDate().setValue(new Date(data.date));
    this.getEditMessage().setValue(data.message);
    this.getEditEventPriority().setLabel(data.priority);
    this.getEditActivity().setValue(data.activities);
    this.getEditTimeSelect().setValue(data.alertTime);
    this.getAlertTimeSelect().setValue(data.eventTime);
    var people = {
        name: data.people
    };
    //remove garbage from the list
    if(this.getEditList().getData() != null)
      this.getEditList().removeAll(true, true);
    this.getEditList().setData(people);

     //Setting the Edit Event Screen to the viewport
     Ext.Viewport.animateActiveItem(editEventScreen, {type: 'slide', direction: 'left'});
}
});