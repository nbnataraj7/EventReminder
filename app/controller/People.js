Ext.define('EventReminder.controller.People', {
    extend: 'Ext.app.Controller',
    //A Controller for adding People from the Contacts
    config: {
        refs: {
            people: 'people',
            peopleList: 'people #PeopleList',
            newEvent: 'newEvent',
            editEvent: 'editevent',
            newEventList: 'newEvent #peopleList',
            enteredName: 'people #personName',
            upcomingEventList: 'upcoming #peopleList'
        },
        control: {
            people: {
                closeCommand: 'onClose',
                addPersonCommand: 'onAddPersonCommand'
            }
        }
    },
    //Adding people to the list in the New Event View List
    onAddPersonCommand: function(){

        //Adding the selected people to the respective view List
        console.log("Adding selected person");
        var selected = this.getPeopleList().getSelection();

        //Getting the list handle
        var updateList = Ext.Viewport.getActiveItem().down("#peopleList");
        console.log(Ext.Viewport.getActiveItem());
        console.log(updateList);

        //if the user doesn't select any
        //place a new name in the list
        //and with a dummy contact
        if(selected.length == 0){
            var person = {
                name: this.getEnteredName().getValue(),
            }
             updateList.setData(person);
        }
        else{
            updateList.setData(selected);
        }
      this.getPeople().hide();
    },
    onClose: function(){
        this.getPeople().hide();
    }
});