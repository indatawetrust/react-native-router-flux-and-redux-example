import React, { Component, PropTypes } from 'react';
import { ScrollView, View, Text, StatusBar, ListView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator'
import Api from '../api'

class PostComponent extends Component {
  static propTypes = {
    routes: PropTypes.object,
  };

  constructor (props) {
    super(props);

    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    const { dispatch } = this.props

    dispatch({
      type: 'GET_POST',
      payload: Api.get('/posts')
    })

  }

  componentWillMount () {



  }

  componentWillReceiveProps(n){

  }

  @autobind renderRow (item) {

    return (<View style={{
      padding: 10,
      borderBottomWidth: 1,
    }}>
      <Text style={{
        padding: 5,
        fontWeight: 'bold'
      }}>
        {item.title}
      </Text>
      <Text>
        {item.text}
      </Text>
    </View>)

  }

  @autobind onScroll(e) {
    var windowHeight = Dimensions.get('window').height,
      height = e.nativeEvent.contentSize.height,
      offset = e.nativeEvent.contentOffset.y;
    if (windowHeight + offset >= height) {
      if (this.props.total > 1) {
        this.nextPage()
      }
    }
  }

  @autobind nextPage() {

    const { dispatch } = this.props

    dispatch({
      type: 'NEXT_PAGE',
      payload: Api.get(`/posts?page=${++this.props.page}`)
    })

  }

  render () {
    return (
      <View style={{
        flex: 1,
      }}>
        <StatusBar hidden={true} />
        <ScrollView
          onScroll={this.onScroll}
          style={{
            flex: 1,
          }}
        >
          {
            this.props.isFetching
            ?
            <Text>
            loading..
            </Text>
            :
            <ListView
              dataSource={this.ds.cloneWithRows(this.props.posts)}
              renderRow={this.renderRow}
              renderFooter={() => (<View style={{
                padding: 50,
                alignItems: 'center',
              }}>
                {
                  this.props.nextPageFetching
                  ?
                  <Text>
                    loading..
                  </Text>:null
                }
              </View>)}
            />
          }
        </ScrollView>
      </View>
    );
  }
}

export default connect((state) => ({
  posts: state.post.posts,
  total: state.post.total,
  page: state.post.page,
  isFetching: state.post.isFetching,
  nextPageFetching: state.post.nextPageFetching,
}))(PostComponent);
