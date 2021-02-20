import React, { Component } from 'react';
import {getMovies}from '../Services/fakeMovieService.js';
import Like from './Common/like';
class Movies extends Component {
    state = {  
        movies:getMovies()
    }
    handleDelete=(movie)=>{
        const movies = this.state.movies.filter(m=>m._id!==movie._id);
        this.setState({movies:movies});
    }
    handleLiked=(movie)=>{
        const movies=[...this.state.movies];
        const index=movies.indexOf(movie);
        movies[index]={...movies[index]};
        movies[index].liked=!movies[index].liked;
        this.setState({movies});

    }

    
    render() { 
        const{length:count}=this.state.movies;
        if(count===0)
            return<nav className="navbar navbar-light bg-light m-2">There is no movies in the list</nav>;

        return ( 
        <div>
            <nav className="navbar navbar-light bg-light m-2">Showing {count} of movies</nav>
            <table className="table m-5">
        <thead>
    <tr>
      <th scope="col">Title</th>
      <th scope="col">Genre</th>
      <th scope="col">Stock</th>
      <th scope="col">Rate</th>
      <th scope="col"></th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
      {this.state.movies.map(movie =><tr key={movie._id}>
      <td>{movie.title}</td>
      <td>{movie.genre.name}</td>
      <td>{movie.numberInStock}</td>
      <td>{movie.dailyRentalRate}</td>
      <td><Like liked={movie.liked} onTogleLiked={()=>this.handleLiked(movie)}/></td>
      <td><button onClick={()=>this.handleDelete(movie)} className="btn btn-danger btn-sm" >Delete</button></td>
    </tr>)}
    
    
  </tbody>
</table>
        </div>    
        
        );
    }
}
 
export default Movies;