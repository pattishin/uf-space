let PostCard = React.createClass({
  render: function() {
    return (
      <div className="postCard">
        <h3 className="postAuthor">
          {this.props.post.name}
        </h3>
        {this.props.post.hair_color}
      </div>
    );
  }
 });

let PostList = React.createClass({
  render: function() {
    if (!this.props.data) { return; }
    let post = this.props.data;
    let postNodes = (
        <PostCard post={post} key={post.id} />
    );

    return (
      <div className="postCardList">
        <h1> Post Card List </h1>
        {postNodes}
      </div>
    );
  }
});

let PostForm = React.createClass({
  getInitialState: function() {
    return { author: '', text: '' };
  },
  handleAuthorChange: function(e) {
    this.setState({
      author: '',
      text: ''
    });
  },
  handleTextChange: function(e) {
    this.setState({ text: e.target.value });
  },
  render: function() {
    return (
      <form className="postForm">
        <input type="text" placeholder="name" />
        <input type="text" placeholder="something ..." />
        <input type="submit" value="post" />
      </form>
    );
  }
});

let PostContainer = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    let self = this;
    this.loadCommentsFromServer()
    .then(function(res) {
      self.setState({data: res});
    });
  },
  loadCommentsFromServer: function() {
    let self = this;
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: self.props.url,
        dataType: 'json',
        cache: false,
        success: function(data) {
          resolve(data);
        },
        error: function(xhr, status, err) {
          reject(err);
        }
      });
    });
  },
  render: function() {
    return (
      <div className="postContainer">
        <PostList data={this.state.data}/>
        <PostForm />
      </div>
    );
  }
});

ReactDOM.render(
  <PostContainer url="http://swapi.co/api/people/5/"/>,
  document.getElementById('content')
);
