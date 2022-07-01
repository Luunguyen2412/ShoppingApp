import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Button,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLOURS, Items} from '../databases/Database';
import {useSelector, useDispatch} from 'react-redux';
import {getCategories} from '../redux/actions';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';

const Home = ({navigation}) => {
  const [products, setProducts] = useState([]);
  const {categories} = useSelector(state => state.userReducer);
  const [dropdown, setDropdown] = useState([]);
  const [selected, setSelected] = useState([]);
  const [isFocus, setIsFocus] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDataFromFB();
      dispatch(getCategories());
    });
    return unsubscribe;
  }, [navigation]);

  const renderLabel = () => {
    if (dropdown || isFocus) {
      return (
        <Text style={(styles.label, isFocus && {color: 'blue'})}>
          Dropdown label
        </Text>
      );
    }
  };

  const _renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={{color: 'black'}}>{item.label}</Text>
      </View>
    );
  };

  const _renderItemSelected = item => {
    return (
      <View style={styles.item}>
        <Text style={{color: 'black', alignSelf: 'flex-start'}}>
          {item.name}
        </Text>
      </View>
    );
  };

  const getDataFromFB = () => {
    let productList = [];
    for (let index = 0; index < Items.length; index++) {
      productList.push(Items[index]);
    }
    setProducts(productList);
  };

  // create a UI of Product card
  const ProductCard = ({data}) => {
    return (
      <TouchableOpacity
        style={{width: '48%', marginVertical: 14}}
        onPress={() =>
          navigation.navigate('ProductInfo', {ProductID: data.id})
        }>
        <View
          style={{
            width: '100%',
            borderRadius: 10,
            height: 100,
            backgroundColor: COLOURS.backgroundMedium,
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={data.productImage}
            style={{width: '80%', height: '80%', resizeMode: 'contain'}}
          />
        </View>
        <View>
          <Text
            style={{
              fontSize: 12,
              color: COLOURS.black,
              fontWeight: '600',
              marginBottom: 2,
            }}>
            {data.productName}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: COLOURS.backgroundDark,
              fontWeight: '500',
              marginBottom: 2,
              justifyContent: 'center',
            }}>
            {data.productPrice}.00$
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={COLOURS.white} barStyle="dark-content" />
      <ScrollView>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 16,
          }}>
          <TouchableOpacity>
            <Entypo
              name="shopping-bag"
              style={{
                fontSize: 18,
                color: COLOURS.backgroundMedium,
                padding: 12,
                borderRadius: 10,
                backgroundColor: COLOURS.backgroundDark,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('MyCart')}>
            <MaterialCommunityIcons
              name="cart"
              style={{
                fontSize: 18,
                color: COLOURS.backgroundMedium,
                padding: 12,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: COLOURS.backgroundDark,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={{padding: 16}}>
          <Text
            style={{
              fontSize: 26,
              color: COLOURS.black,
              fontWeight: '500',
              marginBottom: 10,
            }}>
            MWG Shop & Services
          </Text>
          <View>
            <FlatList
              contentContainerStyle={{
                alignSelf: 'flex-start',
                justifyContent: 'space-between',
                alignContent: 'space-between',
              }}
              numColumns={2}
              data={categories}
              renderItem={({item}) => (
                <Text
                  style={{
                    fontSize: 14,
                    color: COLOURS.black,
                    fontWeight: '400',
                    letterSpacing: 1,
                  }}>
                  {item.name}
                </Text>
              )}
              keyExtractor={(item, index) => index.toString()}></FlatList>
          </View>

          <ScrollView horizontal={true} style={{height: '10%'}}>
            {categories.map(item => {
              return (
                <TouchableOpacity key={item.id}>
                  <View style={{flexDirection: 'column', padding: 10}}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: COLOURS.blue,
                        fontWeight: '400',
                        letterSpacing: 1,
                        padding: 10,
                      }}>
                      {item.name}
                    </Text>
                    <View
                      style={{
                        width: '100%',
                        borderRadius: 10,
                        height: '50%',
                        backgroundColor: COLOURS.backgroundMedium,
                        position: 'relative',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image
                        source={item.image}
                        style={{
                          width: '80%',
                          height: '80%',
                          resizeMode: 'contain',
                        }}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <Text
            style={{
              fontSize: 14,
              color: COLOURS.black,
              fontWeight: '400',
              letterSpacing: 1,
              marginTop: 10,
            }}>
            Audi Shop on SONY central park.
            {'\n'}This shop offers both Products and Services.
          </Text>
          {renderLabel()}
          <Dropdown
            style={(styles.dropdown, isFocus && {borderColor: 'blue'})}
            data={dataDropdown}
            placeholder="select item"
            labelField="label"
            valueField="value"
            label="Dropdown"
            onFocus={() => setIsFocus(true)}
            onChange={item => {
              setDropdown(item.label);
              setIsFocus(false);
              console.log('selecetd', item);
            }}
            search
            searchPlaceholder="Search..."
            placeholderStyle={{color: 'gray'}}
            inputSearchStyle={{color: 'black'}}
            value={dropdown}
            renderItem={item => _renderItem(item)}
            textError="Error"
            selectedTextStyle={{color: 'black'}}
          />

          <MultiSelect
            style={styles.dropdown}
            selectedStyle={styles.containerDropdown}
            ContainerStyle={{color: 'black'}}
            data={categories}
            labelField="name"
            valueField="id"
            label="Multi Select"
            placeholder="Multiple item"
            placeholderStyle={{color: 'gray'}}
            search
            searchPlaceholder="Seacrh multiple..."
            value={selected}
            onChange={item => {
              setSelected(item);
              console.log('selected', item);
            }}
            renderItem={item => _renderItemSelected(item)}
          />
        </View>
        <View style={{padding: 16}}>
          <View
            style={{
              padding: 16,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: 18,
                color: COLOURS.black,
                fontWeight: '500',
                letterSpacing: 1,
              }}>
              Products
            </Text>
            <TouchableOpacity>
              <Text style={{color: COLOURS.blue}}>SEE ALL</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
            }}>
            {products.map(data => {
              return <ProductCard data={data} key={data.id} />;
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const dataDropdown = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
  {label: 'Item 4', value: '4'},
  {label: 'Item 5', value: '5'},
  {label: 'Item 6', value: '6'},
  {label: 'Item 7', value: '7'},
  {label: 'Item 8', value: '8'},
];

const styles = StyleSheet.create({
  text: {color: '#000'},
  dropdown: {
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 0.5,
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'gray',
    color: 'gray',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  icon: {
    marginRight: 5,
    width: 18,
    height: 18,
  },
  containerDropdown: {
    borderRadius: 10,
  },
  item: {
    paddingVertical: 15,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Home;
