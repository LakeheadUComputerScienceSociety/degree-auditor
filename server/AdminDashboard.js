Meteor.methods({
  parseUpload(data){
    console.log = function() {}
    check(data, Array);
    for (let i = 0; i < data.length; i++){
      let course = data[i],
          exists = false; //a boolean value to see if the data exists in the DB or not. At the moment, we'll assume it does not.
      if (!exists){
        LUCourses.insert(course);
      } else {
        console.warn('Rejected.item already exists.');
      }
    }
  }
});
