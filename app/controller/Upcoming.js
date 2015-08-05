Ext.define('EventReminder.controller.Upcoming', {
extend: 'Ext.app.Controller',
config: {
refs: {
    upcoming: 'upcoming',
    main: 'main',
    editEvent: 'editevent'
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

onEditEvent: function(record){
    //console.log("Record : ");
    //console.log(record);
    var editEventScreen = this.getEditEvent();
    Ext.Viewport.animateActiveItem(editEventScreen, {type: 'slide', direction: 'left'});
}
});