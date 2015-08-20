Ext.define('EventReminder.controller.Past', {
extend: 'Ext.app.Controller',
config: {
refs: {
    past: 'past',
    pastPeople: 'past #peopleList',
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
    searchField: 'past #search',
    pastList: 'past #pastEventList',
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
    editActivity: 'editevent activity',
    viewSwitcher: 'past #viewSwitcher'

},
control: {
    past: {
        backCommand: 'onBack',
        editEventCommand: 'onEditEvent',
        clearCommand: 'onClear',
        searchByPersonCommand: 'onSearch',
        showCommand: 'onShowCommand',
        toggleViewCommand: 'toggleView'
    }
}
},
onBack: function(){
console.log("Returned to Main");

//Clear the search field
this.getSearchField().setValue("");

Ext.Viewport.animateActiveItem(this.getMain(), {type: 'slide', direction: 'right'});
},
onEditEvent: function(record){

    //Give the Handler for device back button
    document.addEventListener("backbutton", Ext.bind(this.returnToPast, this), false);

    //Proceed with editing event
    var editEventScreen = this.getEditEvent();

    //Setting the Default values of the form fields
    //Saving data in a variable
    var data = record.getData();
    this.getEditRecurrence().setValue(data.Recur);
    this.getEditHidden().setValue(data.EventID);
    this.getEditCategory().setValue(data.category);
    this.getEditDate().setValue(new Date());
    this.getEditMessage().setValue(data.message);
    this.getEditEventPriority().setLabel(data.priority);
    //this.getEditActivity().setValue(data.activities);
    this.getEditTimeSelect().setValue(data.eventTime);
    this.getAlertTimeSelect().setValue(data.alertTime);


    //Adding people
    //Check Whether the event has people or not
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

    //Adjusting the ItemList height
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
     this.getEditPrev().setValue("Past");

     //Setting the Edit Event Screen to the viewport
     Ext.Viewport.animateActiveItem(editEventScreen, {type: 'slide', direction: 'left'});
},

//Clearing out all the past reminders
onClear: function(){
console.log("Clearing out");
var upcoming = Ext.getStore("Upcoming");
upcoming.each(function(item, index, length){
   upcoming.remove(item);
});
upcoming.sync();
//this.getPastPeople().refresh();
},

//Searching the list
onSearch: function(eventName){

var utils = Ext.create('EventReminder.utils.Utilities');

  //Refresh the filters
  var store = Ext.getStore('Upcoming');
  store.clearFilter();

  //Reapply the Past Filter
  utils.filterUpcomingEvents();

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
},

//Toggle the View of the Events
toggleView: function(){
    var eventStore = Ext.getStore("Upcoming");

    //Check the Button iconCls
    if(this.getViewSwitcher().getIconCls() == "calendar")
    {

        //Switch to the Monthly view

        //Change the button icon
        this.getViewSwitcher().setIconCls("time");

        //Create a grouper for the Monthly view
        var grouper = Ext.create("Ext.util.Grouper",{
            groupFn: function(record){
                var monthNames = [
                    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
                ];
                return monthNames[(new Date(record.get('date'))).getMonth()];
            }
        });

        //Apply this grouper to the store
        eventStore.setGrouper(grouper);
    }
    else
    {
        //Switch to some other category view

        //Change the button icon
        this.getViewSwitcher().setIconCls("calendar");

        //Switch to the Monthly view
            //Create a grouper for the Monthly view
            var grouper = Ext.create("Ext.util.Grouper",{
                groupFn: function(record){
                    return (new Date(record.get('date'))).toDateString();
                }
            });

            //Apply this grouper to the store
            eventStore.setGrouper(grouper);
    }
   },


   //Returning back to Past Events list view
   returnToPast: function(){
       Ext.Viewport.animateActiveItem(this.getReturnToPast(), {type: 'slide', direction: 'right'});
       document.removeEventListener("backbutton", Ext.bind(this.onBack, this), false);
   }
});