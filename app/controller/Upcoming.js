Ext.define('EventReminder.controller.Upcoming', {
extend: 'Ext.app.Controller',
config: {
refs: {
upcoming: 'upcoming'
},
control: {
upcoming: {
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