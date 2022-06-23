import { useState } from 'react';

import s from '../Searchbar/Searchbar.module.css';
// import s from '../Searchbar/Searchbar.module.css';
const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    if (search.trim() === '') {
      return;
    }
    onSubmit(search);

    setSearch('');
    reset();
  };

  const handleInput = e => {
    setSearch(e.currentTarget.value);
  };
  const reset = () => {
    setSearch('');
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={s.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleInput}
          value={search}
        />
      </form>
    </header>
  );
};
export default Searchbar;
