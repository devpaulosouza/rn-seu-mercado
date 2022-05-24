export const  authApi = {
  post: (username, password) => {
    if (username === 'cliente1' && password === '1234') {
      return {
        token: 1234,
        role: 'CUSTOMER',
        userName: 'Customer 1',
        userId: 2
      }
    }
    else if (username === 'cliente2' && password === '1234') {
      return {
        token: 1234,
        role: 'CUSTOMER',
        userName: 'Customer 2',
        userId: 3
      }
    }
    throw new Error('autenticação inválida')
  }
}
