'use strict'

const API_KEY = '29bb47b7552ec502eb87cebfbc77f766';
const API_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2';

$(document).ready(function () {

  //events
  $('.search__btn').click(() => {
    getMovie()
  })

  $('.search__field').keypress(e => {
    if (e.keyCode === 13)
      getMovie()
  })

  $(document).on('mouseover', '.movie__img', function () {
    $(this).css('opacity', '0%')
  })

  $(document).on('mouseout', '.movie__img', function () {
    $(this).css('opacity', '100%')
  })

  $(document).on('click', '.movie__img', function () {
    openModal()
  })

  //functions

  function openModal() {
    $('.modal-window').remove()
    $('.movies').append(getReviews(movie.id))
    $('.modal-window')
      .css('position', 'fixed')
      .css('z-index', '99')
      .css('top', '50vh')
      .css('left', '50%')
      .css('width', '300px')
      .css('height', '300px')
      .css('background-color', '#000')
    $(document).on('click', '.reviews__close', function () {
      closeModal()
    })
  }

  function closeModal() {
    $('.modal-window').remove()
  }


  function getMovie() {
    let query = $('.search__field').val()

    $('body').addClass('loading')

    if (query !== '') {
      $('.movie').remove()


      $.ajax({
        url: `${API_URL} /search/movie`,
        type: 'GET',
        dataType: 'json',
        data: {
          api_key: API_KEY,
          query: query
        }
      }).then((res) => {
        if (res.results.length === 0)
          alert('No movies found')
        else {
          res.results.forEach((movie) => {
            if (movie.poster_path != null)
              $('.movies').append(drawMovie(movie))
          })
        }
        $('body').removeClass('loading')
      })
    }

  }

  function drawMovie(movie) {
    let movieDOM = `< div class="movie" >
    <img class="movie__roll" src="../images/roll.png" alt="roll">
      <img class="movie__img" src="${IMG_URL + movie.poster_path}" alt="movie-img">
        <div class="movie__review"
                      <h2 class="movie__title">${movie.title}</h2>
      <div class="movie__info">
        <h3><b>Release date: </b>${movie.release_date}</h3>
        <h3><b>Rating: </b>${movie.vote_average}</h3>
        <p class="movie__synopsis">${movie.overview}...</p>
      </div>
                      </div>
                    </ > `
    return movieDOM
  }

  function getReviews(id) {
    $.ajax({
      url: `${API_URL} /movie/${id} `,
      type: 'GET',
      dataType: 'json',
      data: {
        api_key: API_KEY
      }
    }).then((res) => {
      if (res.results.length === 0)
        alert('No reviews found')
      else {
        res.results.forEach((movie) => {
          if (movie.poster_path != null)
            $('.modal-window').append(drawMovie(movie))
        })
      }
      $('body').removeClass('loading')
    })
  }
})