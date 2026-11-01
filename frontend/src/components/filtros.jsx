import './styleFiltros.css';
import { useSearchParams } from 'react-router-dom' 

function Filtros() {

    const [searchParams, setSearchParams] = useSearchParams();

    const genres = searchParams.get('genres') || '';

    const handleGenreChange = (newGenre) => {
        setSearchParams({ page: 1 ,genres: newGenre});
    };

    return (
        <div className='containerFiltros'>
            <button id='action' onClick={() => handleGenreChange('action')}>Action</button>
            <button id='adventure' onClick={() => handleGenreChange('adventure')}>Adventure</button>
            <button id='animation' onClick={() => handleGenreChange('animation')}>Animation</button>
            <button id='comedy' onClick={() => handleGenreChange('comedy')}>Comedy</button>
            <button id='drama' onClick={() => handleGenreChange('drama')}>Drama</button>
            <button id='fantasy' onClick={() => handleGenreChange('fantasy')}>Fantasy</button>
            <button id='horror' onClick={() => handleGenreChange('horror')}>Horror</button>
            <button id='music' onClick={() => handleGenreChange('music')}>Music</button>
            <button id='mystery' onClick={() => handleGenreChange('mystery')}>Mystery</button>
            <button id='romance' onClick={() => handleGenreChange('romanece')}>Romance</button>
            <button id='thriller' onClick={() => handleGenreChange('thriller')}>Thriller</button>
        </div>
    )
}

export default Filtros