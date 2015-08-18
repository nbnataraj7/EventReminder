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
    searchField: 'upcoming #search',
    event: 'event',
    eventCategory: 'event #EventCategory',
    eventTime: 'event #EventTime',
    eventMessage: 'event #EventMessage',
    eventPriority: 'event #EventPriority',
    activity: 'event #Activity',
    alertTime: 'event #AlertTime',
    eventDate: 'event #date',
    recurrence: 'event #Recurrence',
    people: 'event #People',
    editActivity: 'editevent activity'
},
control: {
    upcoming: {
    backCommand: 'onBack',
    editEventCommand: 'onEditEvent',
    searchByPersonCommand: 'onSearch',
    showCommand: 'onShowCommand'
}
}
},
onBack: function(){

    //Clear the search field
    this.getSearchField().setValue("");

    //Clear the activity
     var activityStore = Ext.getStore('Activity');
     activityStore.removeAll();
     activityStore.sync();

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
    //this.getEditActivity().setValue(data.activities);
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

    //Adding the activities
    var allActivities = data.activities.split(", ");
    var activityStore = Ext.getStore('Activity');
    for(var i=0; i<allActivities.length; i++){
        var activityModel = Ext.create('EventReminder.model.Activity', {
            text: allActivities[i],
            value: allActivities[i]
        });
        activityStore.add(activityModel);
        activityStore.sync();
    }


    //Setting the value of previous screen
     this.getEditPrev().setValue("Upcoming");

     //Setting the Edit Event Screen to the viewport
     Ext.Viewport.animateActiveItem(this.getEditEvent(), {type: 'slide', direction: 'left'});
},


//Searching the list
onSearch: function(eventName){

  var utils = Ext.create('EventReminder.utils.Utilities');

  //Refresh the filters
  var store = Ext.getStore('Upcoming');
  store.clearFilter();

  //Reapply the Past Filter
  utils.filterPastEvents();

  //Apply the Category Filter
  utils.filterEventsByCategory(eventName);
},

//Show the event in the event popup
onShowCommand: function(record){

    this.getEventCategory().setHtml(record.get('category'));
    this.getEventTime().setHtml("Event Starts at: "+record.get('eventTime'));
    this.getAlertTime().setHtml("Alert is set at: "+record.get('alertTime'));
    this.getEventMessage().setHtml("Message: "+record.get('message'));
    this.getEventPriority().setHtml(record.get('priority')+" Priority");
    this.getActivity().setHtml("Follow up with "+record.get('activities'));
    this.getEventDate().setTitle("Dated : "+(new Date(record.get('date'))).toDateString());

    //Adding the people
    this.getPeople().setHtml("With : "+record.get('people'));


    //Calculating recurrence
    var recurrence = record.get('Recur')=="none"?"Recurrence Not Set":record.get('Recur');
    console.log(recurrence);
    if(recurrence != 'Recurrence Not Set'){
        var recurrenceStore = Ext.getStore('Recurrence');
        var index = recurrenceStore.findExact('RecurrenceId', parseInt(recurrence));
        console.log(index);
        var RecurRecord = recurrenceStore.getAt(index);

        var type = RecurRecord.get('Type');
        var interval;
        if(type == 'Daily'){
            type = "Days"
        }
        else if(type == 'Weekly'){
            type = "Weeks"
        }
        else{
            type = "Months"
        }

        recurrence = "Repeat every "+RecurRecord.get('Interval')+" "+type+" "+RecurRecord.get('Count')+" times";
    }

    this.getRecurrence().setHtml(recurrence);

    // Show the event with some animation
    this.getEvent().show({type: 'flip'});
}
});