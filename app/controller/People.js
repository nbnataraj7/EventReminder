Ext.define('EventReminder.controller.People', {
    extend: 'Ext.app.Controller',
    requires: ['Ext.MessageBox', 'Ext.device.Contacts'],

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
            upcomingEventList: 'upcoming #peopleList',

        },
        control: {
            people: {
                closeCommand: 'onClose',
                addPersonCommand: 'onAddPersonCommand',
                searchPeopleCommand: 'onSearchPeople',
                searchContactCommand: 'onSearchContact'
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
        var eventId = Ext.Viewport.getActiveItem().down('#ID');

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


        //Check if a person exist with same name or contact
            var nameExist = personStore.findExact('name', this.getEnteredName().getValue())
            var contactExist = personStore.findExact('contact', this.getEnteredContact().getValue());
            if(nameExist!=-1){
                Ext.Msg.alert("Duplicate Contact Name");
                return;
            }
            if(contactExist!=-1){
                Ext.Msg.alert("Duplicate Contact Number");
                return;
            }

            //Validation for the person
            var errors = person.validate()
            if(person.name != "" && errors.isValid()){
                console.log("Adding the person");
                console.log(person);
                personStore.add(person);
                personStore.sync();
                var adhoc = Ext.getStore('EventPeople');
                adhoc.add(person);
                adhoc.sync();
                updateList.add(person.getData());
                Ext.Msg.alert("Person Added");
            }
            else{
               Ext.Msg.alert("None Added");
            }
        }
        else {
        //Person is Selected from the List
            var adhoc = Ext.getStore('EventPeople');
            var person = Ext.create('EventReminder.model.Person', {name: selected[0].getData().name, contact: selected[0].getData().contact});
            adhoc.add(person);
            adhoc.sync();
            Ext.Msg.alert("Selected Person Added");
        }

        //Hide the popup
        this.getPeople().hide();

        //Increase the height of the list to adjust items
        updateList.setHeight(updateList.getItemHeight()*Ext.getStore('EventPeople').getData().getCount());
    },

    //On click of the close button
    onClose: function(){
        this.getPeople().hide();
    },

    //on typing in the person name search field
    onSearchPeople: function(person){
        //call the search utility
        var util = Ext.create('EventReminder.utils.Utilities');
        util.filterPeople(person);
    },

    //on typing in the person contact search field
    onSearchContact: function(contact){
        //call the search utility
        var util = Ext.create('EventReminder.utils.Utilities');
        util.filterContact(contact);
    },


    //Add Contacts to person store
    launch: function(){
    //Logging all the contacts from the device
    //console.log(navigator.contacts);

    Ext.getStore('Person').load(function(records, operation, success){

        var onSuccess = function(item){
        for(var i=0; i<item.length; i++){
            var name = item[i].displayName;
            var contact = item[i].phoneNumbers[0]==NaN?"":item[i].phoneNumbers[0];
            var contactModel = Ext.create('EventReminder.model.Person', {
                name: name,
                contact: contact
            });
            Ext.getStore('Person').add(contactModel);
            }
            Ext.getStore('Person').sync();
            console.log("App contacts updated with phone contacts");

        };

        var onFailure = function(){
            console.log("Something went wrong while reading contacts!");
        };

        if(Ext.getStore('Person').getCount()==0)
            navigator.contacts.find([navigator.contacts.fieldType.displayName], onSuccess, onFailure);
    });
    }

});