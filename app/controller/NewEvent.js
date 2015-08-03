Ext.define('EventReminder.controller.NewEvent', {
extend: 'Ext.app.Controller',
config: {
refs: {
newevent : 'newEvent'
},
control: {
newevent: {
backCommand: 'onBack'
}
}
},
onBack: function(){
var main = {
xtype: 'main'
};
Ext.Viewport.animateActiveItem(main, {type: 'slide', direction: 'right'});
}
});