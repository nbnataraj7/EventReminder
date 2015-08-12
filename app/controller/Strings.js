Ext.define('EventReminder.controller.Strings', {
extend: 'Ext.app.Controller',
config: {

//All the item references from across views
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
mainCategory: 'main #addCategory',
upcomingTitle: 'upcoming #title',
upcomingBack: 'upcoming #back',
pastTitle: 'past #title',
pastBack: 'past #back',
newEventTitle: 'newEvent #title',
newEventBack: 'newEvent #back',
newEventAddPeople: 'newEvent #addPeople',
newEventSelectCategory: 'newEvent #selectCategory',
newEventSelectDate: 'newEvent #selectDate',
newEventChooseOne: 'newEvent #chooseOne',
editEvent: 'editevent',
editeventTitle: 'editevent #title',
editeventBack: 'editevent #back',
editeventSaveChanges: 'editevent #save',
categoryTitle: 'category #newCategory',
categoryBack: 'category #back'
}
},
launch: function(){
this.callParent();

//console.log("Setting the Strings");
//Creating an instance of Strings file of a particular language
var strings = Ext.create('EventReminder.utils.StringEN');

//Setting the strings from the String utilities
this.getMainUpcoming().setText(strings.upcoming);
this.getMainPast().setText(strings.past);
this.getMainNew().setText(strings.newEvent);
this.getMainDnd().setLabel(strings.dnd);
this.getNewEventSelectCategory().setLabel(strings.selectCategory);
this.getNewEventSelectDate().setLabel(strings.selectDate);
this.getMainCategory().setText(strings.addCategory);
}
});