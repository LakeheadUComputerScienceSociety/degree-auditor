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
