const MovieDb = require('moviedb-promise');
const moviedb = new MovieDb('b7b850242f71c77b3d2ca0877c842707');

function movies(app){

    app.get('/', (req, res) => {
        var logoUrl;
        moviedb.configuration().then((respons)=>{
//            console.log(respons.images.base_url, respons.images.logo_sizes[1]);
            logoUrl = respons.images.base_url+respons.images.logo_sizes[2];
//            console.log(logourl);
        }).catch(console.error);
        moviedb.miscNowPlayingMovies().then((response) =>{
            console.log(logoUrl);
//          I was tring to pass logoUrl (base url) to the template and then concatenate
//          but I can't figure out how to concatenate to string in handlebars conveniently
            res.render('movies-index', { movies: response.results});
        }).catch(console.error);
    })

    app.get('/movies/:id', (req,res) => {
//        console.log(req.params.id);
        moviedb.movieInfo(req.params.id).then((response)=>{
//            console.log(response);
            res.render('movies-show',{movie: response});
        }).catch(console.error);
    })

}
module.exports = movies;
