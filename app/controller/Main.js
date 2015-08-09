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

//Thing to be executed once this controller launches
launch: function(){
this.callParent();
console.log("Main controller");
},

//Function for opening Upcoming events view
onUpComing: function(){
        Ext.Viewport.animateActiveItem(this.getUpcoming(), {type: 'slide', direction: 'left'});
    },

//Function for opening Past events view
onPast:function(){
        Ext.Viewport.animateActiveItem(this.getPast(), {type: 'slide', direction: 'left'});
    },

//Function for opening a view for New Event Creation
onNew: function(){
        Ext.Viewport.animateActiveItem(this.getNewEvent(), {type: 'slide', direction: 'left'});
},

//Function to switch the DND mode
ondnd: function(newvalue){
    console.log(newvalue);
    if(newvalue == 1)
        this.getMaindnd().setLabel("DND MODE ON");
    else
        this.getMaindnd().setLabel("DND MODE OFF");
}
});