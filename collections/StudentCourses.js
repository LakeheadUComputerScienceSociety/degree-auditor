StudentCourses = new Mongo.Collection('StudentCourses');

StudentCourses.allow({
    insert: function(userId, doc){
        return !!userId;
    },
    update: function(userId, doc){
        return !!userId;
    }
});

CourseSchema = new SimpleSchema({
    Department_Code:{
      type: String,
      label:"Department Code"
    },
    Course_number:{
      type: Number,
      label:"Course Number"
    },
    Course_mark:{
      type: Number,
      label:"Course Credit"
    }
});

StudentCoursesSchema = new SimpleSchema({
    owner:{
        type: String,
        label: "Owner",
        autoValue: function(){
            return this.userId
        },
        autoform:{
            type:"hidden"
        }
    },
    createdAt:{
        type: Date,
        label: "Created At",
        autoValue: function(){
          return new Date()
        },
        autoform:{
            type:"hidden"
        }
  },
    Course:{
        type: [CourseSchema],
        label:"Course"
    }
});

StudentCourses.attachSchema(StudentCoursesSchema);
