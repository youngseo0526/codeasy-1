FlowRouter.template('/ex_posting/:_id', 'ex_posting');


Template.ex_posting.onRendered(function() {
  $('#editor').summernote({
    popover: {},
    minHeight: 200,
    maximumImageFileSize: 1048576*10
  });
});

Template.ex_posting.helpers({
  post: function() {
    var _id = FlowRouter.getParam('_id');
    if (_id !== 'newPosting') {
      return DB_POSTS.findOne({_id: _id});
    } else {
      return {}
    }
  }
});

Template.ex_posting.events({
  'click #btn-save': function() {
    var name = $('#inp-name').val();
    var title = $('#inp-title').val();
    var html = $('#editor').summernote('code');

    if(!title) {
      return alert('제목은 반드시 입력 해 주세요.');
    }
    var _id = FlowRouter.getParam('_id');
    if( _id === 'newPosting') {
      DB_POSTS.insert({
        createdAt: new Date(),
        name: name,
        title: title,
        content: html,
        readCount: 0
      })
    } else {
      var post = DB_POSTS.findOne({_id: _id});
      post.name = name;
      post.title = title;
      post.content = html;
      DB_POSTS.update({_id: _id}, post);
    }

    alert('저장하였습니다.');
    $('#inp-name').val('');
    $('#inp-title').val('');
    $('#editor').summernote('reset');
    window.history.back();
  },
})