Ext.define('EventReminder.controller.People', {
    extend: 'Ext.app.Controller',
    //A Controller for adding People from the Contacts
    config: {
        refs: {
            people: 'people',
            peopleList: 'people #PeopleList',
            newEventList: 'newEvent #peopleList',
            enteredName: 'people #personName'
        },
        control: {
            people: {
                addPersonCommand: 'onAddPersonCommand',
                removeContactCommand: 'onRemoveContact'
            }
        }
    },
    //Adding people to the list in the New Event View List
    onAddPersonCommand: function(){
        console.log("Adding selected person");
        var selected = this.getPeopleList().getSelection();
        console.log(selected);
        //if the user doesn't select any
        //place a new name in the list
        //and with a dummy contact
        if(selected.length == 0){
            var person = {
                name: this.getEnteredName().getValue(),
            }
             this.getNewEventList().setData(person);
        }
        else{
            this.getNewEventList().setData(selected);
        }
      this.getPeople().hide();
    },
    onRemoveContact:function(record){
       // console.log(record);
        this.getPeopleList().remove(record);
    }
});