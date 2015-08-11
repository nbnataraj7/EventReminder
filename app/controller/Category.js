Ext.define('EventReminder.controller.Category', {
    extend: 'Ext.app.Controller',
    requires: 'Ext.MessageBox',
    config: {
        refs: {
            category: 'category',
            main : 'main',
            categoryName: 'category #categoryName',
            categoryActivity: 'category #selectActivity',
            categoryPriority: 'category #priority',
            editEventCategory: 'editevent #selectEditCategory',
            newEventCategory: 'newEvent #selectCategory',
            editevent: 'editevent',
            newevent: 'newEvent'
        },
        control: {
            category: {
                backCommand: 'back',
                createCommand: 'create'
            }
        }
    },
    back: function(){
        //code for navigating to the main view
        Ext.Viewport.animateActiveItem(this.getMain(), {type: 'slide', direction: 'right'});
    },

    //Function for creating a new event
    create: function(){

        //Creating a new Category model
        var category = Ext.create('EventReminder.model.Category', {
            Category: this.getCategoryName().getValue(),
            Priority: this.getCategoryPriority().getValue(),
            Activity: this.getCategoryActivity().getValue()
        });

        //Validate the Category
        var errors = category.validate();

        if(!errors.isValid()){
           Ext.Msg.alert("Enter a valid Category Name");
        }
        else{

            //Getting the Options store
            var store = Ext.getStore('Category');
            store.add(category);
            store.sync();

            //Prepare Option Object
            var option = Ext.create('EventReminder.model.CategoryOptions', {
                text: this.getCategoryName().getValue(),
                value: this.getCategoryName().getValue()
            });

            var errors = option.validate();

            if(errors.isValid())
            {
                //Add the new category to options
                var categoryOptionsStore = Ext.getStore('CategoryOptions');
                categoryOptionsStore.add(option);
                categoryOptionsStore.sync();

               //Display success message
               Ext.Msg.alert('New Category Created');

               //Clear the fields
               this.getCategoryName().setValue("");
               this.getCategoryPriority().setValue(0);
               this.getCategoryActivity().getValue("");
            }
            else
            {
                Ext.Msg.alert('Category Already Exists');
            }
        }
    },

    launch: function(){
        if(Ext.getStore('CategoryOptions').getCount() != 0)
        {
            Ext.getStore('CategoryOptions').removeAll();
        }
        Ext.getStore('CategoryOptions').sync();
    }
    });