import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MovieRow from './MovieRow.js'
import $ from 'jquery'

class App extends Component {

  constructor (props){
    super(props)
    this.state = {}
    //console.log("This is my iinitializer")

    // const movies = [
    //   {id: 0, poster_src:"https://image.tmdb.org/t/p/w185_and_h278_bestv2/i2dF9UxOeb77CAJrOflj0RpqJRF.jpg", title: "Aquaman", overview: "Arthur Curry learns that he is the heir to the underwater kingdom of Atlantis, and must step forward to lead his people and be a hero to the world."},
    //   {id: 1, poster_src:"https://image.tmdb.org/t/p/w185_and_h278_bestv2/rGfGfgL2pEPCfhIvqHXieXFn7gp.jpg", title: "Bird Box", overview: "When a mysterious force decimates the world’s population, only one thing is certain: if you see it, you take your life. Facing the unknown, Malorie finds love, hope and a new beginning only for it to unravel. Now she must flee with her two children down a treacherous river to the one place left that may offer sanctuary. But to survive, they'll have to undertake the perilous two-day journey blindfolded."}
    // ]
    

    // var movieRows = []

    // movies.forEach((movie) => {
    //   console.log(movie.title)
    //   const movieRow = <MovieRow movie={movie}/>
    //    movieRows.push(movieRow)
    //   //movieRows.push(<p key={movie.id}>movie title: {movie.title}</p>)
    // })

    // this.state = {rows: movieRows}

    this.performSearch("men")
  }

  performSearch(searchTerm){
    console.log("Perform search usando moviedb")
    const urlString = "https://api.themoviedb.org/3/search/movie?api_key=1b5adf76a72a13bad99b8fc0c68cb085&query=" + searchTerm
    $.ajax({
      url: urlString,
      success: (searchResults) => {
        console.log("Fetched data successfully")
        //console.log(searchResults)
        const results = searchResults.results
        //console.log(results[0])

        var movieRows = []

        results.forEach((movie) => {
          movie.poster_path = "https://image.tmdb.org/t/p/w185" + movie.poster_path
          //console.log(movie.title)
          const movieRow = <MovieRow key={movie.id} movie={movie}/>
          movieRows.push(movieRow)
        })

        this.setState({rows: movieRows})
      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data")
      }
    })
  }

  searchChangedHandler(event){
    console.log(event.target.value)
    const searchTerm = event.target.value
    this.performSearch(searchTerm)
  }

  render() {
    return (
      <div>
        <table className="titleBar">
          <tbody>
            <tr>
              <td>
                <img alt="app icon" width="50" src="https://www.themoviedb.org/assets/1/v4/logos/primary-green-d70eebe18a5eb5b166d5c1ef0796715b8d1a2cbc698f96d311d62f894ae87085.svg"/>
              </td>
              <td width="8"/>
              <td>
                <h1>Buscador de películas</h1>
              </td>
            </tr>
          </tbody>
        </table>

        <input style={{
          fontSize: 24,
          display: 'block',
          width: "99%",
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 16
        }} onChange={this.searchChangedHandler.bind(this)} placeholder="Ingrese palabra clave"/>

        {this.state.rows}
      </div>
    );
  }
}

export default App;
