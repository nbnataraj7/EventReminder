Ext.define('EventReminder.controller.Strings', {
extend: 'Ext.app.Controller',
config: {
refs: {
main: 'main',
upcoming: 'upcoming',
past: 'past',
newEvent: 'newEvent',
newReminder: 'newEvent',
mainTitle: 'main #title',
mainUpcoming: 'main #upcoming',
mainPast: 'main #past',
mainDnd: 'main #dndmode',
mainNew: 'main #new',
upcomingTitle: 'upcoming #title',
upcomingBack: 'upcoming #back',
pastTitle: 'past #title',
pastBack: 'past #back',
newEventTitle: 'newEvent #title',
newEventBack: 'newEvent #back'
}
},
launch: function(){
this.callParent();
console.log("Setting the Strings");
var strings = Ext.create('EventReminder.utils.StringEN');
this.getMainUpcoming().setText(strings.upcoming);
this.getMainPast().setText(strings.past);
this.getMainNew().setText(strings.newEvent);
this.getMainDnd().setLabel(strings.dnd);
this.getUpcomingTitle().setTitle(strings.upcoming);
this.getUpcomingBack().setText(strings.back);
this.getPastTitle().setTitle(strings.past);
this.getPastBack().setText(strings.back);
this.getNewEventTitle().setTitle(strings.newEvent);
this.getNewEventBack().setText(strings.back);
}
});