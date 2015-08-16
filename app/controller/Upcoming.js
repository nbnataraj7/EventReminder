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
    editPrev : 'editevent #prev',
    editRecurrence: 'editevent #recurrence',
    searchField: 'upcoming #search'
},
control: {
    upcoming: {
    backCommand: 'onBack',
    editEventCommand: 'onEditEvent',
    searchByPersonCommand: 'onSearch'
}
}
},
onBack: function(){

    //Clear the search field
    this.getSearchField().setValue("");

    Ext.Viewport.animateActiveItem(this.getMain(), {type: 'slide', direction: 'right'});
},

//Open a view for editing the Event
//Also set the values of the fields
onEditEvent: function(record){

    //Setting the Default values of the form fields
    //Saving data in a variable
    var data = record.getData();
    this.getEditRecurrence().setValue(data.Recur);
    this.getEditHidden().setValue(data.EventID);
    this.getEditCategory().setValue(data.category);
    this.getEditDate().setValue(new Date(data.date));
    this.getEditMessage().setValue(data.message);
    this.getEditEventPriority().setLabel(data.priority);
    this.getEditActivity().setValue(data.activities);
    this.getEditTimeSelect().setValue(data.eventTime);
    this.getAlertTimeSelect().setValue(data.alertTime);


    //Adding people
    ///Checking if the event has any people or not
    var regex = new RegExp('none');
    if(!regex.test(data.people))
    {
        var all = data.people.split(', ');
        var personStore = Ext.getStore('Person');
        var adhocpeople = Ext.getStore('EventPeople');
        for(var i=0; i< all.length; i++){
            var person = all[i];
            var index = personStore.findExact('name', person);
            var record = personStore.getAt(index);
            adhocpeople.add(record);
            adhocpeople.sync();
        }
    }

    //Adjusting the Height
    this.getEditList().setHeight(this.getEditList().getItemHeight()*Ext.getStore('EventPeople').getData().getCount());


    //Setting the value of previous screen
     this.getEditPrev().setValue("Upcoming");

     //Setting the Edit Event Screen to the viewport
     Ext.Viewport.animateActiveItem(this.getEditEvent(), {type: 'slide', direction: 'left'});
},


//Searching the list
onSearch: function(person){
  var utils = Ext.create('EventReminder.utils.Utilities');
  utils.filterEventsByPeople(person);
}
});