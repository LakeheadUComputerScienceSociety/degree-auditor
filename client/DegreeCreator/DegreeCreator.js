Template.DegreeCreator.onCreated(function(){
    var self = this;
    self.autorun(function(){
         console.log('here');
         self.subscribe("degreeReqs");
    });
});

Template.DegreeCreator.helpers({
    Degree_Requirements: function () {
       return DegreeReqs.find({});
   }
});

Template.DegreeCreator.events({

});
