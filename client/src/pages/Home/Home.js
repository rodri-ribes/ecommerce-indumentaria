import React, { useEffect, useState } from 'react'
import style from './Home.module.scss'

//------ Imports

import { useDispatch } from 'react-redux'

//------ Components

import CardProduct from '../../components/CardProduct/CardProduct'
import Spinner from '../../components/Spinner/Spinner.js'
//------ functions

import FilterPanel from '../../components/FilterPanel/FilterPanel'
import { filterTerm2 } from '../../components/Dashboard/functions/filters'


//------ react icons

import { BiRightArrowAlt, BiDownArrowAlt } from 'react-icons/bi'
import CarouselHome from '../../components/CarouselHome/CarouselHome'
import { useNavigate } from 'react-router-dom'
import { Pagination } from 'swiper'


const Home = ({ dress, userState }) => {

  let dispatch = useDispatch();
  let navigate = useNavigate();

  // ------ logica del filtrado y paginado

  const [inputsFilter, setInputsFilter] = useState({
    minPrice: "",
    maxPrice: "",
    brand: "",
    category: "Selecciona Categoria",
    talle: "",
    oferta: "",
    showTalles: []
  })

  const [filtrado, setFiltrado] = useState([])
  const [pagina, setPagina] = useState(1)

  useEffect(() => {
    setFiltrado(dress)
  }, [dress])

  const porPagina = 10;

  const ceil = filtrado.length / porPagina;

  const maximo = Math.ceil(ceil)

  // ------ state para ocultar filter

  const [showFilter, setShowFilter] = useState(false)

  return (
    <div className={style.container}>
  {
      filtrado?.length > 0 ?
      <>
      <CarouselHome products={dress} userState={userState} dispatch={dispatch} navigate={navigate} />

      <div className={style.container__filterAndProducts}>
        {
          <div className={style.container__filterAndProducts__panel} style={showFilter ? { width: "20%" } : { width: "10%" }}>
            <button onClick={() => setShowFilter(!showFilter)}>{showFilter ? <>Ocultar Filtros <BiDownArrowAlt /> </> : <>Abrir Filtros <BiRightArrowAlt /></>}</button>
            {
              showFilter &&
              <FilterPanel inputsFilter={inputsFilter} setInputsFilter={setInputsFilter} />
            }
          </div>
        }
        
          
           
              <div className={style.container__filterAndProducts__cards} style={showFilter ? { width: "80%" } : { width: "90%" }}>
                {filtrado && filtrado?.filter(filterTerm2(inputsFilter))?.slice(
                  (pagina - 1) * porPagina,
                  (pagina - 1) * porPagina + porPagina
                ).map(p =>
                  <CardProduct
                    id_edit={p.id_edit}
                    title={p.title}
                    id={p._id}
                    image={p.image}
                    price={p.price}
                    discount={p.discount}
                    oferta={p.oferta}
                    key={p._id}
                  />
                )}
              </div>
              {
                filtrado?.filter(filterTerm2(inputsFilter))?.length > 10 &&
                <div className={style.container__pagination}>
                  <Pagination
                    pagina={pagina}
                    setPagina={setPagina}
                    maximo={maximo}
                  />
                </div>
              }
        </div>
      </>
           :
            <Spinner />
    
  }
    </div>
  )
}

export default Home;
