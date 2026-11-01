import './style.css'
import Fundo from '../assets/fundo.png'
import Cart from '../assets/shoppingCart.svg'
import Modal from '../components/modal'
import { useEffect, useState } from 'react'
import Card from '../components/card'
import CardModal from '../components/cardModal'
import axiosInstance from '../helper/axiosInstance';
import CardHorizontal from '../components/cardHorizontal'
import Navegacao from '../components/navegacao'
import Filtros from '../components/filtros'
import { useSearchParams } from 'react-router-dom'
import { Link } from 'react-router-dom';


function Catalogo() {
  const [searchParams] = useSearchParams();
  const [openModal, setOpenModal] = useState(false)
  const [filmesList, setFilmesList] = useState([]);
  const [filmeSelecionado, setFilmeSelecionado] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1)
  const [genres, setGenres] = useState('')

  useEffect(() => {
    const queryPage = Number(searchParams.get('page') || 1);
    const queryGenres = searchParams.get('genres') || '';
    if (!isNaN(queryPage) && queryPage >= 1) {
      setPage(queryPage);
    }
    if (!isNaN(queryPage)) {
      setGenres(queryGenres);
    }
      console.log('URL Params -> page:', queryPage, '| genres:', queryGenres);
  }, [searchParams]);

  useEffect(() => {
    // console.log('Filtro genres:', genres) 
    axiosInstance
    .get(`/catalogo?page=${page}&genres=${genres}`)
      .then(res => {
        setFilmesList(res.data.results);
        setTotalPages(res.data.totalPages);
      })
      .catch(err => console.error('Erro ao buscar filmes:', err));
  }, [page, genres]);

  return (
    <main>
      <div className='containerCatalogo'>
        <div className='filtros'>
          <Filtros genres={genres} setGenres={setGenres}/>
        </div>
        <div className='navegacaoSuperior'>
          <Navegacao page={page} setPage={setPage} totalPages={totalPages} />
        </div>
        <section className='titulos'>
          <div className='legendaSecao'>
            <h1>Nossos Tíulos!</h1>
            <div id='divider'></div>
          </div>

          <div className='cardsHorizontais'>
            {filmesList.map((filme, index) => {
              if (index < 6) {
                return (
                  <CardHorizontal
                    key={index}
                    filme={filme}
                    onClick={() => {
                      setFilmeSelecionado(filme);
                      setOpenModal(true);
                    }}
                  />
                );
              }
            })}
          </div>
          <div className='cardsContainer'>
            <div className='cards'>

              {filmesList.map((filme, index) => {
                if (index >= 6) {
                  return (
                    <Card
                      key={index}
                      filme={filme}
                      onClick={() => {
                        setFilmeSelecionado(filme);
                        setOpenModal(true);
                      }}
                    />
                  );
                }
              })}

            </div>
          </div>
        </section>
        {openModal && (
          <Modal isOpen={openModal} setOpenModal={setOpenModal}>
            <CardModal filme={filmeSelecionado} setOpenModal={setOpenModal} />
          </Modal>
        )}
        <div className='navegacaoInferior'>
          <Navegacao page={page} setPage={setPage} totalPages={totalPages} />
        </div>
      </div >
    </main >
  )

}

export default Catalogo