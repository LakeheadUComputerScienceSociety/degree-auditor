Meteor.methods({
  parseTranscript(data){
    //check(data, String);
    lines = data.split(/(?=[A-Z]{4,4}-[0-9]{4,4})/g);
    result = []
    for(i = 0; i < lines.length; i++){

      mark = -1
      check = parseInt(lines[i].split('\n')[1]);
      if (check <= 100 && check >= 0){
        mark = check
      }

      resultEntry = {"Department_Code": lines[i].substring(0,4),
                "Course_Number": lines[i].substring(5, 9),
                "Course_Mark": mark};
      result.push(resultEntry)
    }
    StudentCourses.insert({"Course": result});
  }
});
