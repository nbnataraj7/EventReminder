Ext.define('EventReminder.controller.People', {
    extend: 'Ext.app.Controller',
    //A Controller for adding People from the Contacts
    config: {
        refs: {
            people: 'people',
            peopleList: 'people #PeopleList',
            newEventList: 'newEvent #peopleList'
        },
        control: {
            people: {
                addPersonCommand: 'onAddPersonCommand'
            }
        }
    },
    //Adding people to the list in the New Event View List
    onAddPersonCommand: function(){
        console.log("Adding selected person");
        var selected = this.getPeopleList().getSelection();
        console.log(selected);
        this.getNewEventList().setData(selected);
        this.getPeople().hide();
    }
});