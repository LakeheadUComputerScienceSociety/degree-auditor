Template.DegreeCreator.onCreated(function(){
    var self = this;
    self.autorun(function(){
         self.subscribe("degreeReqs");
         self.subscribe('luCourses');
    });
});

Template.DegreeCreator.helpers({
    Degree_Requirements: function () {
       return DegreeReqs.find({});
   }
});

Template.DegreeCreator.events({

});
