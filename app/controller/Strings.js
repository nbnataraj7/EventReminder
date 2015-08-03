Ext.define('EventReminder.controller.Strings', {
extend: 'Ext.app.Controller',
config: {
refs: {
main: 'main',
upcoming: 'upcoming',
past: 'past',
newReminder: 'newEvent',
mainTitle: 'main #title',
mainUpcoming: 'main #upcoming',
mainPast: 'main #past',
mainDnd: 'main #dndmode',
mainNew: 'main #new'
},
control: {
main: {
initMainCommand: 'onInitMain'
}
}
},
launch: function(){
this.callParent();
console.log("Setting the Strings");
var strings = Ext.create('EventReminder.utils.StringEN');
this.getMainUpcoming().setText(strings.upcoming);
this.getMainPast().setText(strings.past);
this.getMainNew().setText(strings.newReminder);
this.getMainDnd().setLabel(strings.dnd);
},
onInitMain: function(){
}
});