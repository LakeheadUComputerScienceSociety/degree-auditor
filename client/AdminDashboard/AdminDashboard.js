Template.AdminDashboard.onCreated(function(){
    var self = this;
    self.autorun(function(){
         self.subscribe("luCourses");
    });
});

Template.AdminDashboard.helpers({
    lu_courses: function () {
       return LUCourses.find({});
   },

    tableSettings : function () {
        return {
            fields: [
                { key: 'Department_Code', label: 'Dept.', headerClass: 'col-md-1'},
                { key: 'Course_Number', label: 'Number', headerClass: 'col-md-1' },
                { key: 'Course_Credits', label: 'Credits', headerClass: 'col-md-1'},
                { key: 'Course_Prerequisits', label: 'Prerequisits', headerClass: 'col-md-3'},
                { key: 'Course_Name', label: 'Name', headerClass: 'col-md-3' },
                { key: 'Course_Description', label: 'Description' },
                { key: 'edit', label: 'Edit', fn: function () { return new Spacebars.SafeString('<button type="button" class="editbtn">Edit</button>') } },
                { key: 'delete', label: 'Delete', fn: function () { return new Spacebars.SafeString('<button type="button" class="deletebtn">Delete</button>') } }
            ]
      };
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
  }
});
