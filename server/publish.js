Meteor.publish("luCourses", function(){
    return LUCourses.find({})
});

Meteor.publish("studentCourses", function(){
    return StudentCourses.find({})
});

Meteor.publish("degreeReqs", function(){
    return DegreeReqs.find({})
});
