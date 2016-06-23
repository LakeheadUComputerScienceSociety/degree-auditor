Accounts.onLogin(function(){
  if (!Meteor.userId()){
    FlowRouter.go('/');
  }
});

FlowRouter.triggers.enter([function(context,redirect){
    if(!Meteor.userId()){
        FlowRouter.go('/')
    }
}]);

FlowRouter.route('/', {
    name: 'welcome',
    action(){
        if(Meteor.userId()){
            FlowRouter.go('/main')
        }
        BlazeLayout.render('Welcome');
    }
});

FlowRouter.route('/DegreeCreator', {
  name: "DegreeCreator",
  action(){
    BlazeLayout.render('Main', {main: 'DegreeCreator'});
  }
});

FlowRouter.route('/UserCourseEntry', {
  name:"UserCourseEntry",
  action(){
    BlazeLayout.render('Main', {main: 'UserCourseEntry'});
  }
});

FlowRouter.route('/AdminDashboard', {
    name: 'AdminDashboard',
    action(){
        BlazeLayout.render('Main', {main: 'AdminDashboard'});
    }
});
