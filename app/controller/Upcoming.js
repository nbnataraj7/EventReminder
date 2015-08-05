Ext.define('EventReminder.controller.Upcoming', {
extend: 'Ext.app.Controller',
config: {
refs: {
    upcoming: 'upcoming',
    main: 'main'
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
}
});