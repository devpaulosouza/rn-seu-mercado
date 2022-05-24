import { useContext } from 'react';
import { Button, Alert } from 'react-native';
import { StyleSheet, FlatList } from 'react-native';

import { Text, View } from '../components/Themed';
import { GlobalContext } from '../context/globalContext';

export default function Cart() {
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

  const calculateTotal = () => {
    let total = 0

    if (productInCart) {
      total = productInCart.map(p => p.quantity * p.price).reduce((a,b)=> a + b, 0);
    }

    return total;
  }

  const finish = () => {
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrinho</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <FlatList
        style={styles.list}
        data={productInCart}
        renderItem={({ item }) => <View style={styles.itemContainer}>
            <Text key={item.id} style={styles.item}>{item.name}</Text>
            <Text key={`price-${item.id}`} style={styles.item}>{item.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</Text>
            <View style={styles.button} ><Button title="-" onPress={() => handleRemove(item.id)} /></View>
            <Text style={styles.quantity}>{ productInCart.filter(p => p.id == item.id).length ?productInCart.filter(p => p.id == item.id)[0].quantity : 0 }</Text>
            <View style={styles.button} ><Button title="+" onPress={() => handleAdd(item)} /></View>
          </View>
        }
      />
      <Text>Total: {calculateTotal().toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</Text>
      <Button title='Finalizar' onPress={finish}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
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
