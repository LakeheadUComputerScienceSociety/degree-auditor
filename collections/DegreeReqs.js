DegreeReqs = new Mongo.Collection('degreeReqs');

DegreeReqs.allow({
    insert: function(userId, doc){
        return !!userId;
    },
    update: function(userId, doc){
        return !!userId;
    },
    remove: function(userId, doc){
        return !!userId;
    }
});

DegreeCourseSchema = new SimpleSchema({ //Contains course info. (e.g. COMP-1411)
    Department_Code:{
      type: String,
      label:"Department Code"
    },
    Course_number:{
      type: Number,
      label:"Course Number"
    }
});

CourseGroupSchema = new SimpleSchema({ //Contains info related to groups of courses
    Group_Courses:{ //List of all the courses in the group.
      type: [DegreeCourseSchema],
      label: "Courses"
    },
    Number_Required:{ //The number of courses that are required from this group.
      type: Number,
      label: "Number of Courses Required"
    }
});

DegreeReqsSchema = new SimpleSchema({
  Degree_Name:{ //Name of specific degree (e.g. Honours Bachelors of Computer Science vs. Bachelors of Computer Science)
    type: String,
    label: "Degree Name"
  },
  Degree_Credits:{ //Credits required to complete a degree (e.g. 30)
    type: Number,
    decimal: true,
    label:"Course Credit"
  },
  Degree_Requirements:{ //any absolute course a student must take (e.g. COMP 1411 - Computer Programming I)
    type: [DegreeCourseSchema],
    label:"Degree Courses"
  },
  Degree_Grouping: { //any situation where the student has a CHOICE of classes to take (e.g. Take 2 of the following 3 courses)
    type: [CourseGroupSchema],
    label: "Course Groupings"
  }
});

DegreeReqs.attachSchema(DegreeReqsSchema);
