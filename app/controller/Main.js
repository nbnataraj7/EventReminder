Ext.define('EventReminder.controller.Main',{
extend: 'Ext.app.Controller',
config: {
refs: {
main: 'main'
},
control: {
    main: {
    upComingCommand: 'onUpComing',
    pastCommand: 'onPast',
    newEventCommand: 'onNew'
    }
}
},
onUpComing: function(){
        var upcoming = Ext.create('EventReminder.view.Upcoming');
        Ext.Viewport.animateActiveItem(upcoming, {type: 'slide', direction: 'left'});
    },
onPast:function(){
        var past = Ext.create('EventReminder.view.Past');
        Ext.Viewport.animateActiveItem(past, {type: 'slide', direction: 'left'});
    },
onNew: function(){
        var newEvent = Ext.create('EventReminder.view.NewEvent');
        Ext.Viewport.animateActiveItem(newEvent, {type: 'slide', direction: 'left'});
}
});