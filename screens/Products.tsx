import { useContext } from 'react';
import { StyleSheet, FlatList, Button } from 'react-native';

import { Text, View, } from '../components/Themed';
import { GlobalContext } from '../context/globalContext';
import { RootTabScreenProps } from '../types';

const products = [
  { id: 1, price: 29.99, name: 'Arroz' },
  { id: 2, price: 17.99, name: 'Feijão' },
  { id: 3, price: 12.99, name: 'Óleo' },
  { id: 4, price: 24.99, name: 'Azeite de oliva' },
  { id: 5, price: 12.99,name: 'Vinagre' },
  { id: 6, price: 18.99, name: 'Açúcar' },
  { id: 7, price: 5.99, name: 'Milho para pipoca' },
  { id: 8, price: 7.99, name: 'Farinha de trigo' },
  { id: 9, price: 6.99, name: 'Fermento em pó' },
  { id: 10, price: 12.00, name: 'Aveia' }
]

export default function Products({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [ productInCart=[], setProductInCart ] = useContext(GlobalContext).productsInCart;


  const handleRemove = (productId) => {
    const ps = productInCart.map(p => {
      if(p.id === productId) {
        return { ...p, quantity: p.quantity -1 }
      } else {
        return p;
      }
    }).filter(p => p.quantity > 0);

    setProductInCart(ps);

  }
  const handleAdd = (product) => {
    const { id: productId } = product;

    console.log(productInCart.filter(p => p.id == product.id))

    const p = productInCart.filter(p => p.id === productId);

    if (p.length) {
      const pc = productInCart.map(p =>{
        if (p.id === productId) {
          return {
            ...p,
            quantity: p.quantity + 1
          }
        } else {
          return p;
        }
      });

      setProductInCart(pc);
    } else {
      setProductInCart([...productInCart, { ...product, quantity: 1 }]);
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Produtos</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <FlatList
        style={styles.list}
        data={products}
        renderItem={({ item }) => <View style={styles.itemContainer}>
            <Text key={item.id} style={styles.item}>{item.name}</Text>
            <Text key={`price-${item.id}`} style={styles.item}>{item.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</Text>
            <View style={styles.button} ><Button title="-" onPress={() => handleRemove(item.id)} /></View>
            <Text style={styles.quantity}>{ productInCart.filter(p => p.id == item.id).length ?productInCart.filter(p => p.id == item.id)[0].quantity : 0 }</Text>
            <View style={styles.button} ><Button title="+" onPress={() => handleAdd(item)} /></View>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  list: {
    width: '100%'
  },
  item: {
    width: '100%',
    textAlign: 'left',
    padding: 8,
    paddingLeft: 32,
    paddingRight: 32
  },
  button: {
    width: 50,
    height: 50,
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingRight: 32
  },
  quantity: {
    margin: 8,
    width: 32
  }
});
