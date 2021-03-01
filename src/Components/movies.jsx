import React, { Component } from 'react';
import {getMovies}from '../Services/fakeMovieService.js';
import {getGenres}from '../Services/fakeGenreService.js';
import Pagination from './Common/pagination';
import ListGroup from './Common/listGroup';
import {paginate} from '../util/Paginate';
import MoviesTable from '../Components/moviesTable';
import _ from 'lodash';
class Movies extends Component {
    state = {  
        movies:[],
        genres:[],
        pageSize:4,
        sortColumn:{path:'title',order:'asc'}
    }
    componentDidMount(){
        const genres=[{_id:" ", name:'All Genre'},...getGenres()]
        this.setState({movies:getMovies(), genres});
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
    handlePageChange=page=>{
       this.setState({currentPage:page});
    }
    handleGenreSelect=genre=>{
        this.setState({selectedGenre:genre,currentPage:1});

    }
    handleSort=path=>{
        const sortColumn={...this.state.sortColumn};
        if(sortColumn.path===path){
            sortColumn.order=(sortColumn.order==='asc')?'desc':'asc';
        }
        else{
            sortColumn.path=path;
            sortColumn.order='asc';

        }
        this.setState({sortColumn});
    }

    
    render() { 
        const{length:count}=this.state.movies;
        const{movies:allmovies,currentPage,pageSize,selectedGenre,sortColumn}=this.state;
        if(count===0)
            return<nav className="navbar navbar-light bg-light m-2">There is no movies in the list</nav>;
            const filtered=selectedGenre && selectedGenre._id 
            ? allmovies.filter(m=>m.genre._id===selectedGenre._id)
            :allmovies;
            const sorted=_.orderBy(filtered,[sortColumn.path],[sortColumn.order]);
            const movies= paginate(sorted,currentPage,pageSize);
        return ( 
    <div className="row">
        <div className="col-2 m-2">
            <ListGroup items={this.state.genres} 
            onItemSelected={this.handleGenreSelect}
            selectedItem={this.state.selectedGenre}
            
            />
        </div>
        <div className="col">
        <p>Showing {filtered.length} of movies</p>
        <MoviesTable movies={movies} 
        onLike={this.handleLiked} 
        onDelete={this.handleDelete}
        onSort={this.handleSort}/>
            
<Pagination 
    itemsCount={filtered.length} 
    pageSize={pageSize}
    onPage={(page)=>this.handlePageChange(page)}/>
        
        </div>
        <div className="col-3"></div>
            
    </div>    
        
        );
    }
}
 
export default Movies;