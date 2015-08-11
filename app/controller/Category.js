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
            },
            editevent: {
                setCategoryOptionsCommand: 'setEditCategories'
            },
            newevent: {
                setCategoryOptionsCommand: 'setNewCategories'
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
            var store = Ext.getStore('Category');
            store.add(category);
            store.sync();

            var options = new Array();
            options = this.getEditEventCategory().getOptions();
            var option = {text: this.getCategoryName().getValue(), value: this.getCategoryName().getValue()};
            options.push(option);

            //Add the new category to options
            this.getNewEventCategory().setOptions(options);
            this.getEditEventCategory().setOptions(options);

           //Display success message
           Ext.Msg.alert('New Category Created');

           //Clear the fields
           this.getCategoryName().setValue("");
           this.getCategoryPriority().setValue(0);
           this.getCategoryActivity().getValue("");
        }
    },

    //Set the Categories of Edit View
    setEditCategories: function(){
    },

    //Set the category options of NewEvent View
    setNewCategories: function(){
    }
    });