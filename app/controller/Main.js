Ext.define('EventReminder.controller.Main',{
extend: 'Ext.app.Controller',
config: {
refs: {
main: 'main',
upcoming: 'upcoming',
newEvent: 'newEvent',
past: 'past'
},
control: {
    main: {
    upComingCommand: 'onUpComing',
    pastCommand: 'onPast',
    newEventCommand: 'onNew'
    }
}
},
launch: function(){
this.callParent();
console.log("Main controller");
},
onUpComing: function(){
        Ext.Viewport.animateActiveItem(this.getUpcoming(), {type: 'slide', direction: 'left'});
    },
onPast:function(){
        Ext.Viewport.animateActiveItem(this.getPast(), {type: 'slide', direction: 'left'});
    },
onNew: function(){
        Ext.Viewport.animateActiveItem(this.getNewEvent(), {type: 'slide', direction: 'left'});
}
});