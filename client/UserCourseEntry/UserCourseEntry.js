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
   degree_courses: function(){
     return DegreeReqs.find({});
   },
   concat: function(a, b){
     return a + ' ' + b;
   },
   isYear: function(year, courseNum){ //returns if the course number matches the year (e.g. 1411 matches 1)
     console.log(courseNum);
     return year.toString() == courseNum.toString().charAt(0);
  }
});

Template.UserCourseEntry.onCreated(function(){
    var self = this;
    self.autorun(function(){
         //self.subscribe("luCourses");
         self.subscribe("studentCourses");
         self.subscribe("degreeReqs");
    });
});
