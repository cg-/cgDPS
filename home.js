Articles = new Meteor.Collection("articles");

Meteor.methods({
  "insertTestFiles":function(){
    Articles.insert({
      name: "TestFile"
    })
  },
  "removeTestFiles":function(){
    Articles.remove({name: "TestFile"});
  }
})
