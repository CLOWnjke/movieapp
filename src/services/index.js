export default class ApiService {
  async getResourece(url) {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url} , received ${res.status}`);
    }

    return await res.json();
  }

  async getGuestSession(url) {
    const res = await fetch(url);
    const _sessionGuest = await res.json();

    return _sessionGuest.guest_session_id;
  }

  async getRatedMovies(sessionId) {
    const response = await fetch(
      `https://api.themoviedb.org/3/guest_session/${sessionId}/rated/movies?api_key=0a44232b798d90acdd1f2c52450cbb8d&language=en-US&sort_by=created_at.asc`
    );
    const res = await response.json();

    return res;
  }

  async getGenre() {
    const response = await fetch(
      'https://api.themoviedb.org/3/genre/movie/list?api_key=0a44232b798d90acdd1f2c52450cbb8d&language=en-US'
    );
    const res = await response.json();
    return res.genres;
  }

  rateMovie(value, id, sessionId) {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer 0a44232b798d90acdd1f2c52450cbb8d',
      },
      body: value,
    };

    const response = fetch(
      `https://api.themoviedb.org/3/movie/${id}/rating?api_key=0a44232b798d90acdd1f2c52450cbb8d&guest_session_id=${sessionId}`,
      options
    )
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));

    // const response =  fetch(`https://api.themoviedb.org/3/movie/${id}/rating?api_key=0a44232b798d90acdd1f2c52450cbb8d&guest_session_id=${sessionId}`,options);
    // console.log('Все отправилось ой ой', response)
    return response;
  }
}
