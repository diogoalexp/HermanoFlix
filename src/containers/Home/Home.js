import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReactPlayer from 'react-player'

import classes from './Home.module.css';

import Button from '../../components/UI/Button/Button';
import Card from '../../components/Card/Card/Card';
import Modal from '../../components/UI/Modal/Modal';
import Input from '../../components/UI/Input/Input';
import search from '../../assets/images/search-icon.png';
import asc from '../../assets/images/asc.png';
import desc from '../../assets/images/desc.png';

import axios from '../../axios-local';

import catalog from '../../Source/catalog';

class Home extends Component {
    state = {
        item: [
            {   
                movies: "",//"http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
                folder: ''//'teste2'
            }          
        ],
        modal: false,
        loading: false,
        ascending: true,
        catalog: [],
        tmdb: {
            overview: "",
            vote_average: 0,
            genres: [],
            release_date: null,
            original_title: "",
            title: ""
        },
        Field: {
            pesquisa: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Pesquisar'
                },
                value: "",
                validation: {
                    required: false
                },
                valid: true,
                touched: false
            },
            ordem: {
                elementType: 'select',
                elementLabel: 'Ordem',
                elementConfig: {
                    options: [
                        {value: 0, displayValue: 'Novidades'},
                        {value: 1, displayValue: 'Ano'},
                        {value: 2, displayValue: 'Título'}
                    ]
                },
                value: 0,
                validation: {
                    required: false
                },
                valid: true
            }
        }
    }

    changeHandler = (f, key) => {
        this.setState( {item: { folder: f}, modal: true} );
        this.getTmdb(key);
        setTimeout(() => {
            this.setState( {item: { movies: "./movies/" + f + "/movie.mp4"}} );
          }, 3000);
    }

    modalClosed = () => {
        this.setState( {modal: false} );
    }

    componentDidMount() {
        let id = 0;
        let list = catalog.catalog.map(filme => (      
            {...filme, id: id++}
        ))  

        this.setState( {catalog: list} );
    }

    checkVisibility = (filme, counter) => {
        if (this.state.Field.pesquisa.value == "" || filme.folder.toUpperCase().includes(this.state.Field.pesquisa.value.toUpperCase())){
            counter.value = counter.value + 1;
            return true;
        }
        return false;
    }

    inputChangedHandler = (event) => {
        const field = {
            ...this.state.Field
        };
        field.pesquisa.value = event.target.value;
        this.setState({Field: field});
    }

    inputOrdemHandler = (event) => {
        const field = {
            ...this.state.Field
        };
        field.ordem.value = event.target.value;
        this.setState({Field: field});
    }

    orderingHandler = () => {
        this.setState({ascending: !this.state.ascending});
    }

    getTmdb = (tmdb) => {
        axios.get(tmdb +'?api_key=fab315859353736a9ceb15038771d35e&language=pt-BR')
            .then(res => {
                var data = res.data;
                let tmdb = {
                    overview: data.overview,
                    vote_average: data.vote_average,
                    genres: data.genres,
                    release_date: data.release_date,
                    original_title: data.original_title,
                    title: data.title
                };

                this.setState({loading: false, tmdb: tmdb});
            })
            .catch(err => {
                this.setState({loading: false});
            });        

    }

    
    sortByText = (a, b, ordem) => {
        let first = a.folder;
        let second = b.folder;

        if (ordem == 2){
            first = first.substring(7, first.length);
            second = second.substring(7, second.length);
        }

        const diff = first.toLowerCase().localeCompare(second.toLowerCase());

        if (this.state.ascending) {
            return diff;
        }
    
        return -1 * diff;
    }

    sortByNum = (a, b, ordem) => {
        let diff = 0;
        if (a.id < b.id)
            diff = -1;
        else if(a.id > b.id) 
            diff =  1

        if (this.state.ascending) {
            return diff;
        }
    
        return -1 * diff;
    }
    

    render () {
        let folder = this.state.item.folder;
        let movies = this.state.item.movies;

        const divStyle = {
            display: 'table',
            margin: '0 auto',
            border: '1px solid black'            
          };

        let pesquisa = <div>
                <Input     
                    value={this.state.Field.pesquisa.value}
                    elementType={this.state.Field.pesquisa.elementType}
                    elementConfig={this.state.Field.pesquisa.elementConfig}
                    changed={(event) => this.inputChangedHandler(event)} 
                ></Input>
                <div className={classes.Search}>
                        <img src={search} alt="Sem Foto" />
                </div>
            </div>

        let ordenar = <div>
                <Input     
                    value={this.state.Field.ordem.value}
                    elementType={this.state.Field.ordem.elementType}
                    elementConfig={this.state.Field.ordem.elementConfig}
                    changed={(event) => this.inputOrdemHandler(event)} 
                ></Input>
            </div>  
        
        let ordering = 
            <div className={classes.Sort}>
                <Button  btnType="Success" clicked={() => this.orderingHandler()}><img className={classes.Sort} alt="Sem Foto" src={this.state.ascending ? asc : desc}/></Button> 
            </div>           

        if(this.state.Field.ordem.value == 0)
            this.state.catalog.sort((a, b) => this.sortByNum(a, b, this.state.Field.ordem.value));
        else
        this.state.catalog.sort((a, b) => this.sortByText(a, b, this.state.Field.ordem.value));
        
        let counter = {value:0};
        let movieList = this.state.catalog.map(filme => (      
            this.checkVisibility(filme, counter) ?          
            <Card 
                key={filme.id}
                img={"./movies/" + filme.folder + "/poster.jpg"}
                nome={filme.folder} 
                descr={filme.folder}
                footer={null}
                clicked={() => this.changeHandler(filme.folder, filme.tmdb)}
                owner={filme.folder}
            /> : null
        ))  
        let realeaseDate = new Date(this.state.tmdb.release_date); 

        return (
            <div className={classes.movieList}>
                <div className={classes.FilterBlock}>
                    <div className={classes.FilterProcurar}>{pesquisa}</div>
                    <div className={classes.FilterProcurar}>{ordenar}</div>
                    <div className={classes.FilterProcurar}>{ordering}</div>
                    <p className={classes.Counter}>{counter.value} of {this.state.catalog.length} Results</p>
                </div>
                {movieList}
                <Modal show={this.state.modal} modalClosed={() => this.modalClosed()}>
                    <div className={classes.FilterBlock}>
                        <span className={classes.modalTitle}>Título: {this.state.tmdb.title}</span>                        
                        {this.state.tmdb.title != this.state.tmdb.original_title ? <span className={classes.modalTitleOriginal}>Título Original: {this.state.tmdb.original_title}</span> : null}
                    </div>
                    <br />
                    <div className={classes.playerWrapper}>
                        <ReactPlayer              
                        // playing
                        className={classes.reactPlayer}
                        controls              
                          width='680px'
                          height='360px'                        
                        style={divStyle}
                        config={{ file: {
                                tracks: [
                                    {kind: 'subtitles', src: 'http://localhost:8080/movies/' + folder + '/portugues.vtt', srcLang: 'pt-br', default: true },
                                    {kind: 'subtitles', src: 'http://localhost:8080/movies/' + folder + '/english.vtt', srcLang: 'en'},
                                    {kind: 'subtitles', src: 'http://localhost:8080/movies/' + folder + '/espanol.vtt', srcLang: 'es'},
                                    {kind: 'subtitles', src: 'http://localhost:8080/movies/' + folder + '/francais.vtt', srcLang: 'fr'},
                                    {kind: 'subtitles', src: 'http://localhost:8080/movies/' + folder + '/fp.vtt', srcLang: 'fp'}
                                ],
                                attributes: {
                                    controlsList: 'nodownload'
                                }
                            }}}
                        url = {movies}
                        />          
                    </div> 
                    <div>                        
                        <span className={classes.modalNote}>Nota: {this.state.tmdb.vote_average}</span>                        
                        <span className={classes.modalRelease}>Lançamento: {realeaseDate.toLocaleDateString()}</span>
                        <br /><br />                                   
                            {
                                this.state.tmdb.genres.map((gen, i) => (      
                                    (this.state.tmdb.genres.length === i + 1) ? <span key={gen.id} className={classes.modalGenre}>{gen.name}</span>
                                        : <span key={gen.id} className={classes.modalGenre}>{gen.name}&nbsp;&nbsp;&nbsp;&nbsp;/</span>
                                ))
                            }                        
                        <br /><br />   
                        <div className={classes.modalDivText}>
                            <p className={classes.modalText}>{this.state.tmdb.overview}</p>
                        </div>   
                        <br />
                    </div>  
                </Modal>         
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        // loading: state.auth.loading,
        // error: state.auth.error,
        // isAuthenticated: state.auth.token !== null,
        // buildingBurger: state.burgerBuilder.building,
        // authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // onAuth: ( email, password, isSignup ) => dispatch( actions.auth( email, password, isSignup ) ),
        // onSetAuthRedirectPath: () => dispatch( actions.setAuthRedirectPath( '/' ) )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Home );