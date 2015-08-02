Ext.define('EventReminder.controller.Main',{
extend: 'Ext.app.Controller',
config: {
refs: {
main: 'main'
},
control: {
    main: {
    upComingCommand: 'onUpComing'
    }
}
},
onUpComing: function(){
    console.log("Upcoming Events Command Received");
    var upcoming = {
    xtype: 'upcoming'
    };
    Ext.Viewport.animateActiveItem(upcoming, {type: 'slide', direction: 'left'});
    console.log("Upcoming Events");
    }
});