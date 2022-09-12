import { useEffect, useContext } from 'react'
import alanBtn from '@alan-ai/alan-sdk-web';
import { ColorModeContext } from './utils/ToggleColorsMode'
import { fetchToken } from './utils';
import { searchMovie, selectGenreOrCategory } from '../features/currentGenreOrCategory';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const useAlan = () => {

  const dispatch = useDispatch()
  const history = useHistory()

  const { setMode } = useContext(ColorModeContext)

  useEffect(() => {
    alanBtn({
      key: 'b4ee9b43e41a0e9de6b8cbbc6d1363bd2e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: ({ command, mode, genres, genreOrCategory, query }) => {
        switch (command) {
          case "changeMood":
            (mode === 'dark') ? setMode('dark') : setMode('light')
            break;
          case "login":
            fetchToken()
            break;
          case "logout":
            localStorage.clear()
            window.location.href = '/'
            break;
          case "chooseGenre":
            const foundGenre = genres.find((g) => g.name.toLowerCase() === genreOrCategory.toLowerCase())
            if (foundGenre) {
              history.push('/')
              dispatch(selectGenreOrCategory(foundGenre.id))
            }
            else {
              const category = genreOrCategory.startsWith('top') ? 'top_rated' : genreOrCategory
              history.push('/')
              dispatch(selectGenreOrCategory(category))
            }
            break;
          case "search":
            console.log(query)
            dispatch(searchMovie(query))
            break;
          default:
            break;
        }
      }
    });
  });
}

export default useAlan