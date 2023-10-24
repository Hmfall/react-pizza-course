import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import React, { FC, useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Pagination from '../components/Pagination/Pagination';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/filter/slice';
import { selectFilter } from '../redux/filter/selectors';
import { fetchPizzas, SearchPizzaParams } from '../redux/pizza/slice';
import { selectPizzaData } from '../redux/pizza/selectors';
import { useAppDispatch } from '../redux/store';

const Home: FC = () => {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const isSearch = useRef(false);
   const isMounted = useRef(false);
   const { items, status } = useSelector(selectPizzaData);
   const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);

   const onChangeCategory = useCallback((index: number) => {
      dispatch(setCategoryId(index));
   }, []);

   const onChangePage = (page: number) => {
      dispatch(setCurrentPage(page));
   };

   const getPizzas = async () => {
      const sortBy = sort.sortProperty.replace('-', '');
      const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
      const category = categoryId > 0 ? `category=${categoryId}` : '';
      const search = searchValue ? `&search=${searchValue}` : '';

      dispatch(
         fetchPizzas({
            sortBy,
            order,
            category,
            search,
            currentPage: String(currentPage),
         }),
      );
      window.scrollTo(0, 0);
   };

   useEffect(() => {
      if (window.location.search) {
         const params = (qs.parse(window.location.search.substring(1)) as unknown) as SearchPizzaParams;
         const sort = sortList.find(obj => obj.sortProperty === params.sortBy);
         dispatch(setFilters({
            /*// @ts-ignore
                        ...params, sort,*/
            searchValue: params.search,
            categoryId: params.category ? Number(params.category) : 0,
            currentPage: Number(params.currentPage),
            sort: sort || sortList[0],
         }));
         isSearch.current = true;
      }
   }, []);

   useEffect(() => {
      if (!isSearch.current) {
         getPizzas();
      }
      isSearch.current = false;
   }, [categoryId, sort.sortProperty, searchValue, currentPage]);

   const pizzas = items
      .filter((obj: any) => (obj.title.toLowerCase().includes(searchValue.toLowerCase())) && true)
      .map((obj: any) => {
         return <PizzaBlock key={obj.id} {...obj}/>;
      });

   const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index}/>);

   return (
      <>
         <div className="content__top">
            <Categories
               onChangeCategory={onChangeCategory}
               value={categoryId}
            />
            <Sort value={sort}/>
         </div>
         <h2 className="content__title">Все пиццы</h2>
         {status === 'error' ? (
            <h2>Ошибка при запросе пицц</h2>
         ) : (
            <div className="content__items">
               {status === 'loading' ? skeletons : pizzas}
            </div>
         )
         }
         <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
      </>
   );
};

export default Home;