Ext.define('EventReminder.controller.NewEvent', {
extend: 'Ext.app.Controller',
config: {
refs: {
    newevent : 'newEvent',
    main: 'main'
},
control: {
    newevent: {
    backCommand: 'onBack',
    addPeopleCommand: 'onAddPeople'
}
}
},
onBack: function(){
    Ext.Viewport.animateActiveItem(this.getMain(), {type: 'slide', direction: 'right'});
},
onAddPeople: function(){
    var peoplePopup = Ext.create('EventReminder.view.People');
    peoplePopup.show();
}
});