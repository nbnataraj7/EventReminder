Ext.define('EventReminder.controller.People', {
    extend: 'Ext.app.Controller',
    requires: 'Ext.MessageBox',
    //A Controller for adding People from the Contacts
    config: {
        refs: {
            people: 'people',
            peopleList: 'people #PeopleList',
            newEvent: 'newEvent',
            editEvent: 'editevent',
            newEventList: 'newEvent #peopleList',
            enteredName: 'people #personName',
            enteredContact: 'people #personContact',
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
            var person = Ext.create('EventReminder.model.Person', {
                name: this.getEnteredName().getValue(),
                contact: this.getEnteredContact().getValue()
            });
            var personStore = Ext.getStore("Person");

            //Validation for the person
            var errors = person.validate()
            if(person.name != "" && errors.isValid()){
                console.log("Adding the person");
                personStore.add(person);
                personStore.sync();
                updateList.add(person.getData());
                Ext.Msg.alert("Person Added");
            }
            else{
               Ext.Msg.alert("None Added");
            }
        }
        else {
        //Person is Selected from the List
            updateList.setData(selected);
            this.getPeopleList().deselectAll();
            Ext.Msg.alert("Selected Person Added");
        }

        //Hide the popup
        this.getPeople().hide();
    },
    onClose: function(){
        this.getPeople().hide();
    }
});