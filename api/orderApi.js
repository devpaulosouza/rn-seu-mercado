const PAGE_SIZE = 5;

export const orderApi = {
  post: (order) => {

    const orders = JSON.parse(window.localStorage.getItem('orders')) || [];
    const userId = window.localStorage.getItem('userId');
    const userName = window.localStorage.getItem('userName');

    let id = orders?.length ? orders.map(item => item.id).reduce((o, v) => o > v ? o : v ) : 0;    

    id = id ? id + 1 : 1;

    const newOrder = {
      id , 
      userId, 
      userName, 
      number: id, 
      total: (order?.products || []).map(item =>  parseFloat(item?.price) * parseInt(item?.quantity)).reduce((acc, curr) =>acc + curr, 0),
      ...order
    }

    window.localStorage.setItem('orders', JSON.stringify([newOrder, ...orders]))
  },
  getAll: ({page, userId}) => {
    let orders = JSON.parse(window.localStorage.getItem('orders')) || [];

    orders = orders.filter(o => o.userId == userId)

    return {
      content: orders.slice(page * PAGE_SIZE, (page*PAGE_SIZE) + PAGE_SIZE), 
      totalPages: Math.ceil(orders.length / PAGE_SIZE)
    };
  },
  get: (id) => {
    let orders = JSON.parse(window.localStorage.getItem('orders')) || [];

    return orders.find(o => o.id === id)
  }
}
