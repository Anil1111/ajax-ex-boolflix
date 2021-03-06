// 9870f35e71374469c3af0707aac57353 -API key-
// https://api.themoviedb.org/3/search/movie?api_key=9870f35e71374469c3af0707aac57353&query=fight club&language=it-IT -chiamata completa-

// Milestone 1:
// Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il  bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
// Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato:
// Titolo
// Titolo Originale
// Lingua
// Voto
$(document).ready(function () {
  $('.btn').click(function () {
    var query = $('.input').val();
    resetSearch();
    getMovies(query);

  });
  function getMovies(string) {
      var url = 'https://api.themoviedb.org/3/search/movie';
      var api = '9870f35e71374469c3af0707aac57353';
      var urlSerie = 'https://api.themoviedb.org/3/search/tv';

      $.ajax(
      {
        url : url,
        method: 'GET',
        data : {
          api_key: api,
          query: string,
          language : 'it-IT'
        },
        success : function (data) {
          $('.results').removeClass('active');
          $('.results').addClass('active');

          var films = data.results;
          if (data.total_results > 0) {
          printFilm(films);
          }
          else {
          // alert('Spiacente, non ci sono risultati.  Riprova');
          messageNotFound();
          };

        },
        error: function (request, state, errors) {
          console.log('Errore' + errors);
        }
      }
      );
      $.ajax(
      {
        url : urlSerie,
        method: 'GET',
        data : {
          api_key: api,
          query: string,
          language : 'it-IT'
        },
        success : function (data) {
          $('.results').removeClass('active');
          $('.results').addClass('active');

          var films = data.results;
          if (data.total_results > 0) {
          printSerieTv(films);
          }
          else {
          // alert('Spiacente, non ci sono risultati.  Riprova');
          messageNotFound();

          };

        },
        error: function (request, state, errors) {
          console.log('Errore' + errors);
        }
      }
      );
  }
  function resetSearch() {
    $('.cover-films').html('');
    $('.cover-serie').html('');
    $('.input').val('');
  }


  function printFilm(films) {

    var source = $('#film-template').html();
    var template = Handlebars.compile(source);
    for (var i = 0; i < films.length; i++) {
       var film = films[i];
       var voto = film.vote_average;
       var flag = film.original_language;
       var context = {
         title : film.title,
         original_title : film.original_title,
         original_language : 'img/' + flag + '.png',
         vote_average : printStars(voto),
         poster_path : film.poster_path
       }
       var html = template(context);
       $('.cover-films').append(html);
    }
  }
  function printSerieTv(serie) {

    var source = $('#serie-template').html();
    var template = Handlebars.compile(source);
    for (var i = 0; i < serie.length; i++) {
       var serie = serie[i];
       var voto = serie.vote_average;
       var flag = serie.original_language;
       var context = {
         name : serie.name,
         original_name : serie.original_name,
         original_language : 'img/' + flag + '.png',
         vote_average : printStars(voto),
         poster_path : serie.poster_path
       }
       var html = template(context);
       $('.cover-serie').append(html);
    }
  }
    function printStars(vote) {
      var vote = Math.round(vote / 2);
      var stars = '';
      for (var i = 1; i <= 5 ; i++) {
        if (i <= vote) {
          var simpleStar = '<i class="fas fa-star"></i>';
        } else {
          var simpleStar = '<i class="far fa-star"></i>';
        }
        stars += simpleStar;
      }
      return stars
    }
    function messageNotFound() {
      var source = $('#noresults-template').html();
      var template = Handlebars.compile(source);
      var html = template();
      $('.cover-films').append(html);
    }


});
