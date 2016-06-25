Template.UserCourseEntry.onRendered(function(){
  dragula([document.querySelector('#left1'), document.querySelector('#right1'), document.querySelector('#right2') ,document.querySelector('#right3') ]);
});

Template.UserCourseEntry.helpers({
    lu_courses: function () {
       return LUCourses.find({});
   },
   student_courses: function(){
     return StudentCourses.find({});
   },
   concat: function(a, b){
     return a + ' ' + b;
   }
});

Template.UserCourseEntry.onCreated(function(){
    var self = this;
    self.autorun(function(){
         self.subscribe("luCourses");
         self.subscribe("studentCourses");
    });
});
