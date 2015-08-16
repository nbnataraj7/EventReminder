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

        //Create an Activity model
        selected = selected[0];
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