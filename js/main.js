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
      .parent().find('.movie__title--front').css('z-index', '-2')
  })

  $(document).on('mouseout', '.movie__img', function () {
    $(this).css('opacity', '100%')
    $('.movie__title--front').css('z-index', '1')
  })

  $(document).on('click', '.movie__img', function () {
    $('.window').removeClass('hide')
  })

  //functions

  async function getMovie() {
    let query = $('.search__field').val()

    $('body').addClass('loading')

    if (query !== '') {
      $('.movie').remove()

      $.ajax({
        url: `${API_URL}/search/movie`,
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
            $(`.${movie.id}`).click(() => {
              getReviews(movie.id)
              $('.reviews')
                .append(`<h1 class="movie__title">${movie.title}</h1>`)
            })
          })
        }
        $('body').removeClass('loading')
      })
    }

  }

  function drawMovie(movie) {
    let movieDOM = `<div class="movie ${movie.id}">
                      <img class="movie__roll" src="images/roll.png" alt="roll">
                      <img class="movie__img" src="${IMG_URL + movie.poster_path}" alt="movie-img">
                      <div class="movie__review"
                      <h2 class="movie__title">${movie.title}</h2>
                      <div class="movie__info">
                        <h3><b>Release date: </b>${movie.release_date}</h3>
                        <h3><b>Rating: </b>${movie.vote_average}</h3>
                        <p class="movie__synopsis">${movie.overview}...</p>
                      </div>
                      </div>
                      <h2 class="movie__title movie__title--front">${movie.title}</h2>
                    </div>`
    return movieDOM
  }

  function drawReview(movie) {
    if (movie.results.length !== 0)
      movie.results.forEach(item => {
        $('.reviews').append(`
      <h1 class="reviews__title">${item.author}</h1>
      <p class="reviews__text">${item.content}</p>
      `)

      })
    else {
      $('.reviews').html('')
      $('.window').addClass('hide')
      console.log('Hey-hey-hey, man! No reviews, I said. No means not a single. Go away. Try later. Much later')
    }
    console.log(movie)
  }

  $(".window__close").click(() => {
    $('.window').addClass('hide')
    $('.reviews').html('')
  })

  function getReviews(id) {
    $.ajax({
      url: `${API_URL}/movie/${id}/reviews?api_key=${API_KEY}`,
      type: 'GET',
      dataType: 'json',
      data: {
        api_key: API_KEY
      }
    }).then((res) => drawReview(res))
  }
})