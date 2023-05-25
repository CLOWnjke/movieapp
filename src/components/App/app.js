import React from 'react';
import { Tabs } from 'antd';

import ApiService from '../../services';
import Header from '../Header/header';
import Main from '../Main/main';
import PagePagination from '../Pagination/pagination';

import './app.css';

export default class App extends React.Component {
  state = {
    data: [],
    genres: [],
    loading: true,
    error: false,
    page: 1,
    searchValue: '',
    totalPages: 50,
    sessionId: '',
    tab: 1,
  };

  apiService = new ApiService();

  componentDidMount() {
    this.createSessionId();
    this.setGenresList();
    this.popularFilms(this.state.page);
  }

  componentDidUpdate(pervProps, prevState) {
    if (prevState.searchValue !== this.state.searchValue || prevState.page !== this.state.page) {
      let toFind = this.state.searchValue
        ? `https://api.themoviedb.org/3/search/movie?api_key=0a44232b798d90acdd1f2c52450cbb8d&query=${this.state.searchValue}&page=${this.state.page}`
        : `https://api.themoviedb.org/3/movie/popular?api_key=7d0349337e7da854b0da94f99185e198&language=en-US&page=${this.state.page}`;

      this.apiService
        .getResourece(toFind)
        .then((res) => {
          this.setState({
            data: res.results,
            loading: false,
            totalPages: res.total_pages,
          });
        })
        .catch(this.onError);
    }
  }

  componentDidCatch() {
    this.setState({ error: true });
  }

  updateMovies(query, page) {
    this.apiService
      .getResourece(
        `https://api.themoviedb.org/3/search/movie?api_key=0a44232b798d90acdd1f2c52450cbb8d&query=${query}&page=${page}`
      )
      .then((res) => {
        this.setState({
          data: res.results,
          loading: false,
          totalPages: res.total_pages,
        });
      })
      .catch(this.onError);
  }

  popularFilms(page) {
    this.apiService
      .getResourece(
        `https://api.themoviedb.org/3/movie/popular?api_key=7d0349337e7da854b0da94f99185e198&language=en-US&page=${page}`
      )
      .then((res) => {
        console.log(res);
        this.setState({
          data: res.results,
          loading: false,
          totalPages: res.total_pages,
        });
      })
      .catch(this.onError);
  }

  setGenresList() {
    this.apiService.getGenre().then((res) => {
      console.log(res);
      this.setState({
        genres: res,
      });
    });
  }

  createSessionId() {
    this.apiService
      .getGuestSession(
        'https://api.themoviedb.org/3/authentication/guest_session/new?api_key=0a44232b798d90acdd1f2c52450cbb8d'
      )
      .then((res) => {
        this.setState({ sessionId: res });
      });
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  onSearch = (e) => {
    this.setState({
      searchValue: e.target.value,
    });
  };

  changePage = (page) => {
    this.setState({
      page,
    });
  };

  tabChange(active) {
    console.log(active);
    this.setState({
      tab: active,
    });
  }

  onChangeTab(activeKey) {
    if (activeKey === '1') {
      console.log(this.state.sessionId);
      console.log('Tab 1', activeKey);
      if(this.state.searchValue) {
        return this.updateMovies(this.state.searchValue,this.state.page);
      }
      return this.popularFilms(this.state.page);
    }
    if (activeKey === '2') {
      this.setState({
        data: [],
      });
      this.apiService.getRatedMovies(this.state.sessionId).then((res) => {
        console.log(res);
        this.setState({
          data: res.results,
          loading: false,
        });
      });
    }
  }

  render() {
    const items = [
      {
        key: '1',
        label: 'Search',
        children: (
          <>
            <Header onSearch={this.onSearch} />
            <Main
              data={this.state.data}
              loading={this.state.loading}
              error={this.state.error}
              sessionId={this.state.sessionId}
              genres={this.state.genres}
            />
            <PagePagination changePage={this.changePage} totalPages={this.state.totalPages} page={this.state.page} />
          </>
        ),
      },
      {
        key: '2',
        label: 'Rated',
        children: (
          <>
            <Main
              data={this.state.data}
              loading={this.state.loading}
              error={this.state.error}
              sessionId={this.state.sessionId}
              genres={this.state.genres}
            />
          </>
        ),
      },
    ];

    return (
      <section className="movie-app">
        <Tabs items={items} onChange={(activeKey) => this.onChangeTab(activeKey)} />
      </section>
    );
  }
}
