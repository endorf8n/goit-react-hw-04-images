import { useState } from 'react';
import PropTypes from 'prop-types';
import { BsSearch } from 'react-icons/bs';
import {
  SearchButton,
  SearchForm,
  SearchInput,
  SearchbarHeader,
} from './searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChangeValue = ({ target }) => {
    setInputValue(target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit(inputValue);

    setInputValue('');
  };

  return (
    <SearchbarHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <BsSearch size={25} />
        </SearchButton>

        <SearchInput
          value={inputValue}
          onChange={handleChangeValue}
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchbarHeader>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
