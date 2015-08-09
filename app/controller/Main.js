Ext.define('EventReminder.controller.Main',{
extend: 'Ext.app.Controller',
config: {
refs: {
main: 'main',
upcoming: 'upcoming',
newEvent: 'newEvent',
past: 'past',
maindnd: 'main #dndmode'
},
control: {
    main: {
    upComingCommand: 'onUpComing',
    pastCommand: 'onPast',
    newEventCommand: 'onNew',
    dndcommand: 'ondnd'
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
},
ondnd: function(newvalue){
    console.log(newvalue);
    if(newvalue == 1)
        this.getMaindnd().setLabel("DND MODE ON");
    else
        this.getMaindnd().setLabel("DND MODE OFF");
}
});