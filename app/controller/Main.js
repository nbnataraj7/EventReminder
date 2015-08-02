Ext.define('EventReminder.controller.Main',{
extend: 'Ext.app.Controller',
config: {
refs: {
main: 'main'
},
control: {
    main: {
    upComingCommand: 'onUpComing',
    pastCommand: 'onPast'
    }
}
},
onUpComing: function(){
        var upcoming = {
        xtype: 'upcoming'
        };
        Ext.Viewport.animateActiveItem(upcoming, {type: 'slide', direction: 'left'});
    },
onPast:function(){
        var past = {
        xtype: 'past'
        };
        Ext.Viewport.animateActiveItem(past, {type: 'slide', direction: 'left'});
    }
});