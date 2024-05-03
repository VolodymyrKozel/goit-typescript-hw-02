import React, { FormEvent, HtmlHTMLAttributes} from 'react';
import css from './SearchBar.module.css';
import toast, { Toaster } from 'react-hot-toast';

type SearchBarProps = {
  onSearch: (q: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const handleSubmit = (evt: FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    const form = evt.target as HTMLFormElement;
    const q = (form.elements.namedItem('query') as HTMLInputElement).value;
    // Якщо текстове поле порожнє, виводимо повідомлення
    // і припиняємо виконання функції.
    if (q.trim() === '') {
      toast.error('Please enter search term!');
      return;
    }
    onSearch(q);
    form.reset();
  };
  return (
    <header className={css.header}>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="query"
        />
        <button className={css.btn} type="submit">
          Search
          <svg className="icon" width="16" height="16">
            <use href="/icons.svg#icon-search"></use>
          </svg>
        </button>
      </form>
      <Toaster position="top-right" reverseOrder={false} />
    </header>
  );
}
export default SearchBar;
