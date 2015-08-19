Ext.define('EventReminder.controller.Activity', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            activity: 'activity',
            selectedList: 'activity #ActivityList'
        },
        control: {
            activity: {
                closeCommand: 'onClose',
                addCommand: 'onAdd'
            }
        }
    },

    onClose: function(){
        this.getActivity().hide();
    },

    //Adding the Selected Activity to the Activity list in the Event
    onAdd: function(){

        //Getting the handle of the temporary store
        var store = Ext.getStore('Activity');

        //Getting the selected item from the list
        var selected = this.getSelectedList().getSelection();
        selected = selected[0];

        //Check if the selected activity is already added
        var isAdded = false;
        store.each(function(item, index, length){
            if(item.get('text') == selected.get('text'))
            {
                Ext.Msg.alert("Activity already added");
                isAdded = true;
                return;
            }
        });
        if(isAdded)
            return;

        //Check if the activity added can be carried out for the contacts involved
        var peopleInvolved = Ext.getStore("EventPeople");

        //If there are no people involved in the activity
        if(peopleInvolved.getCount() == 0){
            Ext.Msg.alert("No person added");
            return;
         }

        //Check if this activity can be carried out for each person
        //Flag for Eligibility of activity
        var isEligible = true;
        peopleInvolved.each(function(item, index, length){

            //If the Activity added is Email, all the people involved should have an email id
            if(selected.get('value') == "Email" && item.get('email')=="")
            {
                Ext.Msg.alert("Add Email for "+item.get('name'));
                isEligible = false;
                return;
            }
            else if((selected.get('value') == "Call" || selected.get('value') == "Text") && item.get('contact')==""){
                Ext.Msg.alert("<div>Add Phone Number </div><div>for "+item.get('name')+"</div>");
                isEligible = false;
                return;
            }
        });
        if(!isEligible)
            return;

        //Create an Activity model
        var text = selected.get('text');
        var value = selected.get('value');
        var activity = Ext.create('EventReminder.model.Activity', {
            text: text,
            value: value
        });

        //Add this selection to the store
        store.add(selected);
        store.sync();

        //Remove the selection
        this.getSelectedList().deselectAll();
    }
});