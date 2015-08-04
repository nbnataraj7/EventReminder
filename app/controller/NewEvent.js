Ext.define('EventReminder.controller.NewEvent', {
extend: 'Ext.app.Controller',
requires: 'Ext.LoadMask',
config: {
refs: {
    newevent : 'newEvent',
    main: 'main',
    newEventPriority: 'newEvent #priority'
},
control: {
    newevent: {
    backCommand: 'onBack',
    addPeopleCommand: 'onAddPeople',
    priorityChangeCommand: 'onPriorityChange',
    addEventCommand: 'onAddEvent'
}
}
},
//Back button handling
onBack: function(){
    Ext.Viewport.animateActiveItem(this.getMain(), {type: 'slide', direction: 'right'});
},
//Function for adding people to the event list
onAddPeople: function(){
    var peoplePopup = Ext.create('EventReminder.view.People');
    peoplePopup.show();
},
//Function for changing the priority of the event
onPriorityChange:function(newValue){
    //console.log(newValue);
    if(newValue < 35)
        this.getNewEventPriority().setLabel("Low");
    else if(newValue < 75)
        this.getNewEventPriority().setLabel("Medium");
    else
        this.getNewEventPriority().setLabel("High");
},
onAddEvent:function(){
console.log("Creating a new event");
Ext.Viewport.add({
    message: 'Creating a new Event',
    xtype: 'loadmask'
});
}
});