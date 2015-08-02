Ext.define('EventReminder.controller.Past', {
extend: 'Ext.app.Controller',
config: {
refs: {
past: 'past'
},
control: {
past: {
backCommand: 'onBack'
}
}
},
onBack: function(){
console.log("Returned to Main");
var main = {
xtype: 'main'
}
Ext.Viewport.animateActiveItem(main, {type: 'slide', direction: 'right'});
}

});