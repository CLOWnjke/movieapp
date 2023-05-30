import React from 'react';
import PropTypes from 'prop-types';

import LoaderSpin from '../Spin/Spin';
import MovieCard from '../Main-movie-card/Main-movie-card';
import { ErrorIndicator, EmptyIndicator } from '../Indicators/errorIndicator';
import OfflineIndicator from '../Offline/offline';

function Main({ data, loading, error, sessionId, genres, online }) {
  const elements = data.map((item) => (
    <MovieCard
      key={item.id}
      title={item.title}
      rating={item.vote_average}
      newRating={item.rating}
      date={item.release_date}
      overview={item.overview}
      img={item.poster_path}
      identificator={item.id}
      sessionId={sessionId}
      id={item.id}
      genresId={item.genre_ids}
      genres={genres}
    />
  ));



  return (
    <section className="movies">
      {online ? <>
        {elements}
        {loading ? <LoaderSpin /> : null}
        {error ? <ErrorIndicator /> : null}
        {elements.length === 0 && !loading ? <EmptyIndicator /> : null}
      </> : <OfflineIndicator />}
    </section>
  );
}

Main.defaultProps = {
  date: [],
  loading: true,
  error: false,
  sessionId: '',
};

Main.propTypes = {
  date: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  error: PropTypes.bool,
  sessionId: PropTypes.string,
};

export default Main;
