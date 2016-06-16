Template.UserCourseEntry.onRendered(function(){
  dragula([document.querySelector('#left1'), document.querySelector('#right1'), document.querySelector('#right2') ,document.querySelector('#right3') ]);
});

Template.UserCourseEntry.helpers({
    lu_courses: function () {
       return LUCourses.find({});
   }
});


Template.UserCourseEntry.onCreated(function(){
    var self = this;
    self.autorun(function(){
         self.subscribe("luCourses");
    });
});
