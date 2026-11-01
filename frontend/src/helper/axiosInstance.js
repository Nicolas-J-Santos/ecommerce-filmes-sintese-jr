import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    // headers: {''}
})

export const adicionarAoCarrinho = async (filme) => {
  try {
    const id = filme._id || filme.id;
    await axiosInstance.post(`/carrinho/${id}`);
    alert(`"${filme.title}" adicionado ao carrinho!`);
  } catch (error) {
    console.error('Erro ao adicionar ao carrinho:', error);
    alert('Erro ao adicionar ao carrinho.');
  }
};

export default axiosInstance