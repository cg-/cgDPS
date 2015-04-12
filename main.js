Meteor.methods({
  "insertTestFiles":function(){
    Articles.insert({
      name: "TestFile"
    })
  },
  "removeTestFiles":function(){
    Articles.remove({name: "TestFile"});
  },
  "clear":function(){
    Files.remove({});
    Articles.remove({});
  }
})
