import React, { ChangeEvent, MouseEvent, useCallback, useRef, useState } from 'react';
import classes from './Search.module.scss';
import { setSearchValue } from '../../redux/filter/slice';
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';

const Search = () => {
   const dispatch = useDispatch();
   const [value, setValue] = useState('');
   const inputRef = useRef<HTMLInputElement>(null);

   const onClickClear = (event: MouseEvent<SVGSVGElement>) => {
      console.log(event);
      dispatch(setSearchValue(''));
      setValue('');
      /*inputRef.current && inputRef.current.focus();*/
      inputRef.current?.focus();
   };

   const updateSearchValue = useCallback(
      debounce((str: string) => {
         dispatch(setSearchValue(str));
      }, 500), []);

   const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
      updateSearchValue(event.target.value);
   };

   return (
      <div className={classes.form}>
         <input
            ref={inputRef}
            className={classes.root}
            placeholder="Поиск пиццы..."
            value={value}
            onChange={onChangeInput}
         />
         {value && (<svg
               onClick={onClickClear}
               className={classes.clearIcon}
               viewBox="0 0 20 20"
               xmlns="http://www.w3.org/2000/svg">
               <path
                  d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/>
            </svg>
         )}
      </div>);
};

export default Search;