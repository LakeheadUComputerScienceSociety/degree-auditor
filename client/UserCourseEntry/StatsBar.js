Template.StatsBar.events({
    'click #submitTranscript': function (event) {
    event.preventDefault();
    Meteor.call('parseTranscript', document.getElementById('transcriptText').value, (error, response) => {
      if (error) {
        //Handle error:
        console.log(error.reason);
      } else {
        //Handle success:
      }
    });
  }
});

Template.StatsBar.helpers({
    GPA: function(){
     courses = StudentCourses.find();
     totalMarks = 0;
     totalCourses = 0;
     courses.forEach(function(course){
          for (var i in course.Course){
            mark = parseInt(course.Course[i].Course_Mark);
            if (mark != -1){ //-1 means course not completed
              totalMarks += mark
              totalCourses++;
            }
          }
     });
      return (totalMarks/totalCourses).toFixed(2); //return to 2 decimal points.
   }
});

/*
Template.UserCourseEntry.onCreated(function(){
    var self = this;
    self.autorun(function(){
         self.subscribe("luCourses");
         self.subscribe("studentCourses");
    });
});*/
