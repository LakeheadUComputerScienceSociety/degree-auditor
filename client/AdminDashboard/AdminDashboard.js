Template.AdminDashboard.onCreated(function(){
    var self = this;
    self.autorun(function(){
         self.subscribe("luCourses");
    });

    //variable flag to see if a CSV file is currently being uploaded or not. Obviously initialized to false.
    Template.instance().uploading = new ReactiveVar(false);

});

Template.AdminDashboard.helpers({
    lu_courses: function () { //Grabs all courses in LUCourses to display in a table
       return LUCourses.find({});
   },

    tableSettings : function () { //Contains all settings for the course table.
        return {
            fields: [
                { key: 'Department_Code', label: 'Dept.', headerClass: 'col-md-1'},
                { key: 'Course_Number', label: 'Number', headerClass: 'col-md-1' },
                { key: 'Course_Credits', label: 'Credits', headerClass: 'col-md-1'},
                { key: 'Course_Prerequisits', label: 'Prerequisits', headerClass: 'col-md-1'},
                { key: 'Course_Name', label: 'Name', headerClass: 'col-md-1' },
                { key: 'Course_Description', label: 'Description' },
                { key: 'edit', label: 'Edit', fn: function () { return new Spacebars.SafeString('<button type="button" class="editbtn">Edit</button>') } },
                { key: 'delete', label: 'Delete', fn: function () { return new Spacebars.SafeString('<button type="button" class="deletebtn">Delete</button>') } }
            ]
      };
    },
    uploading() {
      return Template.instance().uploading.get();
    }
});

Template.AdminDashboard.events({

    'click .reactive-table tbody tr': function (event) {
    event.preventDefault();
    var course = this;
    // checks if the actual clicked element has the class `delete`
    if (event.target.className == "deletebtn") {
      LUCourses.remove(course._id)
    }
  },

  'change [name="uploadCSV"]' (event, template){
    //Handle conversion to JSON and upload:
    template.uploading.set(true);

    Papa.parse(event.target.files[0], { //only handles one file at a time.
      header:true,
      complete( results, file ) {
        //Handle upload:
        console.log(results.data);
        Meteor.call('parseUpload', results.data, (error, response) => {
          if (error) {
            //Handle error:
            console.log(error.reason);
            template.uploading.set(false);
          } else {
            //Handle success:
            template.uploading.set(false);
            Bert.alert('Upload complete!', 'success', 'growl-top-right');
          }
        });
      }
    });
  }
});
