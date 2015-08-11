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
    editCategory: 'editevent #selectEditCategory',
    editDate: 'editevent #selectDate',
    editList: 'editevent #peopleList',
    editMessage: 'editevent #message',
    editActivity: 'editevent #activity',
    editHidden: 'editevent #hiddenField',
    editPrev : 'editevent #prev'
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

    //Setting the Default values of the form fields
    //Saving data in a variable
    var data = record.getData();

    this.getEditHidden().setValue(data.EventID);
    this.getEditCategory().setValue(data.category);
    this.getEditDate().setValue(new Date(data.date));
    this.getEditMessage().setValue(data.message);
    this.getEditEventPriority().setLabel(data.priority);
    this.getEditActivity().setValue(data.activities);
    this.getEditTimeSelect().setValue(data.eventTime);
    this.getAlertTimeSelect().setValue(data.alertTime);


    //Adding people
    //Adding people
    var people = Ext.create('EventReminder.model.Person', {
        name: data.people,
        contact: data.contact
    });
    Ext.getStore('EventPeople').add(people);
    Ext.getStore('EventPeople').sync();
    this.getEditList().setHeight(this.getEditList().getItemHeight()*Ext.getStore('EventPeople').getData().getCount());


    //Setting the value of previous screen
     this.getEditPrev().setValue("Upcoming");

     //Setting the Edit Event Screen to the viewport
     Ext.Viewport.animateActiveItem(this.getEditEvent(), {type: 'slide', direction: 'left'});
}
});