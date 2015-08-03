Ext.define('EventReminder.controller.Past', {
extend: 'Ext.app.Controller',
config: {
refs: {
past: 'past',
main: 'main'
},
control: {
past: {
backCommand: 'onBack'
}
}
},
onBack: function(){
console.log("Returned to Main");
Ext.Viewport.animateActiveItem(this.getMain(), {type: 'slide', direction: 'right'});
}
});