Ext.define('EventReminder.controller.Upcoming', {
extend: 'Ext.app.Controller',
config: {
refs: {
    upcoming: 'upcoming',
    main: 'main'
},
control: {
    upcoming: {
    backCommand: 'onBack'
}
}
},
onBack: function(){
Ext.Viewport.animateActiveItem(this.getMain(), {type: 'slide', direction: 'right'});
}
});