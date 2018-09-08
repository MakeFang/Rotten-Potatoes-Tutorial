const MovieDb = require('moviedb-promise');
const moviedb = new MovieDb('b7b850242f71c77b3d2ca0877c842707');
const Review = require('../model/review.js');

function movies(app){

    app.get('/', (req, res) => {
        var logoUrl;
        moviedb.configuration().then((respons)=>{
            //            console.log(respons.images.base_url, respons.images.logo_sizes[1]);
            logoUrl = respons.images.base_url+respons.images.logo_sizes[2];
            //            console.log(logourl);
        }).catch(console.error);
        moviedb.miscNowPlayingMovies().then((response) =>{
//            console.log(logoUrl);
            res.render('movies-index', { movies: response.results});
        }).catch(console.error);
    })

/*
    app.get('/movies/:id', (req,res) => {
    //        console.log(req.params.id);
        moviedb.movieInfo(req.params.id).then((response)=>{
    //            console.log(response);
            res.render('movies-show',{movie: response});
        }).catch(console.error);
    })
*/
    app.get('/movies/:id', (req, res) => {
        moviedb.movieInfo({ id: req.params.id }).then((movie) => {
            Review.find({movieId: req.params.id}).then((reviews) =>{
//                console.log(reviews);
                if (movie.video) {
                    moviedb.movieVideos({ id: req.params.id }).then(videos => {
                        movie.trailer_youtube_id = videos.results[0].key;
                        renderTemplate(movie, reviews);
                    })
                } else {
                    renderTemplate(movie, reviews);
                }

                function renderTemplate(movie, reviews)  {
                    res.render('movies-show', { movie: movie , reviews:reviews});
                }
            })
        }).catch(console.error)
    })

}
module.exports = movies;
