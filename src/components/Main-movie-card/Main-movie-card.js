import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'antd';
import moment from 'moment';

import Stars from '../Rate/rate';

import './Main-movie-card.css';
import icon from './notFound.png';

export default class MovieCard extends React.Component {
  state = {
    rating: 5,
  };

  roundUp = (n) => {
    let str = n.toString();

    if (str.length > 3) {
      return str.slice(0, 3);
    }

    return str;
  };

  strCut = (str) => {
    if (str.length > 120) {
      str = str.slice(0, 120);
      return str + '...';
    }
    return str;
  };

  imgFound = (url) => {
    if (url) {
      return `https://image.tmdb.org/t/p/w500${url}`;
    } else {
      return icon;
    }
  };

  starChange = (newRating) => {
    console.log(newRating);
    const { id, sessionId } = this.props;

    fetch(
      `https://api.themoviedb.org/3/movie/${id}/rating?api_key=0a44232b798d90acdd1f2c52450cbb8d&guest_session_id=${sessionId}`,
      {
        method: 'POST',
        body: JSON.stringify({ value: newRating }),
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          console.log(response);
          return response.json();
        }
        throw new Error('Failed to update rating');
      })
      .then((data) => {
        console.log(data);
        this.setState({ rating: data.value });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  setDate(date) {
    if (date) {
      const format = moment(date).format('MMMM D, YYYY');
      return format;
    } else return 'Release date unknown';
  }

  setGenre(genreArr, genreId) {
    const genresBtn = genreId.map((id) => {
      const genreNewArr = [];

      genreArr.forEach((genre) => {
        if (id === genre.id) {
          genreNewArr.push(genre.name);
        }
      });

      return <li key={id}>{genreNewArr}</li>;
    });
    if (genreId.length === 0) {
      return <li key={1}>Genre not found</li>;
    }
    return genresBtn;
  }

  render() {
    const { title, rating, date, overview, img, identificator, sessionId, newRating, genresId, genres } = this.props;
    const stars = this.roundUp(rating);
    const content = this.strCut(overview);
    let color = '';

    if (stars <= 3) {
      color = '#E90000';
    } else if (stars > 3 && stars <= 5) {
      color = '#E97E00';
    } else if (stars > 5 && stars <= 7) {
      color = '#E9D100';
    } else {
      color = '#66E900';
    }

    return (
      <div className="movie">
        <Image src={this.imgFound(img)} className="img" />
        <div className="movie-info">
          <div className="info">
            <div className="movie-rating">
              <h1 className="movie-title">{title}</h1>
              <div className="rating" style={{ border: `1px solid ${color}` }}>
                <span className="rating-count">{stars}</span>
              </div>
            </div>
            <span className="movie--create-date">{this.setDate(date)}</span>
            <ul className="genres">{this.setGenre(genres, genresId)}</ul>
            <p>{content}</p>
          </div>
          <Stars
            id={identificator}
            sessionId={sessionId}
            newRating={newRating}
            starChange={this.starChange}
            rating={() => this.getStarRating(this.state.rating, identificator)}
          />
        </div>
      </div>
    );
  }
}

MovieCard.defaultProps = {
  title: 'Movie Title',
  rating: 5,
  date: 'no date',
  overview: 'This should have been text',
  img: '',
  identificator: 1,
};

MovieCard.propTypes = {
  title: PropTypes.string,
  rating: PropTypes.number,
  date: PropTypes.string,
  overview: PropTypes.string,
  img: PropTypes.string,
  identificator: PropTypes.number,
};
