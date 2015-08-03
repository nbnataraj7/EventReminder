Ext.define('EventReminder.controller.NewEvent', {
extend: 'Ext.app.Controller',
config: {
refs: {
newevent : 'newEvent',
main: 'main'
},
control: {
newevent: {
backCommand: 'onBack'
}
}
},
onBack: function(){
Ext.Viewport.animateActiveItem(this.getMain(), {type: 'slide', direction: 'right'});
}
});