import React, {Component} from 'react';
import {
  ScrollView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {connect} from 'react-redux';

export class News extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const renderItem = ({item}) => {
      return (
        <TouchableOpacity
          //key={item.id}
          style={{
            height: 100,
            backgroundColor: 'gray',
            flexDirection: 'row',
            padding: 10,
            marginBottom: 10,
            marginHorizontal: 15,
          }}>
          <View style={{flex: 3}}>
            <Image
              source={{uri: item.thumbnail}}
              style={{width: '100%', height: '100%', resizeMode: 'contain'}}
            />
          </View>
          <View
            style={{
              flex: 7,
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            <Text style={{color: 'black'}}>{item.name}</Text>
            <Text style={{color: 'black'}}>{item.price + ' VND '}</Text>
          </View>
        </TouchableOpacity>
      );
    };

    //alert(JSON.stringify(this.props.business));

    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <FlatList
          data={this.props.product}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  data: state.newsReducer.data,
  entertainment: state.newsReducer.entertainment,
  product: state.userReducer.goods,
});

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(News);
