StudentCourses = new Mongo.Collection('studentCourses');

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
    Course_Number:{
      type: String,
      label:"Course Number"
    },
    Course_Mark:{
      type: String,
      label:"Course Mark",
      optional: true
    }
});

StudentCoursesSchema = new SimpleSchema({
    owner:{
        type: String,
        label: "Owner",
        autoValue: function(){
            console.log(this.userId)
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
          console.log(new Date())
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
