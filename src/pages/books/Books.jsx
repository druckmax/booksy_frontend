import { useContext, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Context } from '../../context/Context';
import SearchBar from '../../components/searchBar/SearchBar';
import './_Books.scss';

export default function Books() {
  const [genres, setGenres] = useState([]);
  const { hideUpdateDeleteBookForms } = useContext(Context);
  const [isActiveGenre, setIsActiveGenre] = useState()

  useEffect(() => {
    async function getGenres() {
      try {
        const response = await fetch(`${import.meta.env.VITE_GENRES}`);
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setGenres(data.data);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    getGenres();
  }, []);

  const sortedGenres = genres.sort((a, b) => a.genre.localeCompare(b.genre));

  const handleClick = (id) => {
    setIsActiveGenre(id)
    hideUpdateDeleteBookForms()
  }

  return (
    <>
      <div className='search-genres-container'>
        <SearchBar />

        <div className='books-genres-container'>
          {sortedGenres.map((genre) => {
            return (
              <h3 key={genre._id}>
                <Link
                  to={`/books/genre/${genre.genre.split(' ').join('_')}`}
                  state={genre.genre}
                  onClick={handleClick(genre._id)}
                  className={isActiveGenre === genre._id && "isGenreActive"}
                >
                  {genre.genre}
                </Link>
              </h3>
            );
          })}
        </div>
      </div>

      <Outlet />
    </>
  );
}
