Meteor.publish("luCourses", function(){
    return LUCourses.find({})
});

Meteor.publish("studentCourses", function(){
    return StudentCourses.find({owner: this.userId})
});
