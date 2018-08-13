import React, { Component } from 'react';

import axios from 'axios';

class Characters extends Component {

	constructor(props){
    	super(props);
      this.pageApi = 1
      this.pageApp = 1
      this.countPageApp = 0
      this.filtersInfo = ''
    	this.state = {
    		characters: [],
        info: [],
        nameSearch: '',
        filterName: '',
        filterStatus: '',
        filterGender: '',
        filterSpecies: '',
      	url: 'https://rickandmortyapi.com/api/character/'
    	}
  	}

  	componentDidMount(){
        this.UpdateArray()
  	}

    UpdateArray(){
      axios.get(this.state.url + '?page=' + this.pageApi + '&&name=' + this.state.filterName + '&&status=' + this.state.filterStatus + '&&gender=' + this.state.filterGender + '&&species=' + this.state.filterSpecies)
      .then(result => (this.setState({characters: result.data.results, info: result.data.info})))
      .catch(erro => (alert("Nenhum resultado encontrado")) (window.location.reload()))
      this.filterInfoMethod()
    }

    proxPageApp(){
      if(this.pageApp < (this.state.info.pages * 2)){
        this.setState({atualizar: "at1"})
        this.pageApp += 1

        this.countPageApp += 1
        if(this.countPageApp === 2){
            this.pageApi += 1
            this.UpdateArray()
            this.countPageApp = 0
        }
      }

    }

    antPageApp(){
      if(this.pageApp > 1){
        this.setState({atualizar: "at2"})
        this.pageApp -= 1

        this.countPageApp -= 1
        if(this.countPageApp < 0){
          this.pageApi -= 1
          this.UpdateArray()
          this.countPageApp = 1
        }
      }
    }

    filtersSearch() {
      this.UpdateArray();
    }

    clearFilter(){
      window.location.reload();
    }

    filterInfoMethod(){
      this.filtersInfo = ''
      if(this.state.filterName!='')
        this.filtersInfo = this.state.filterName
      if(this.state.filterStatus!='')
        this.filtersInfo = this.filtersInfo + ' | ' + this.state.filterStatus
      if(this.state.filterGender!='')
        this.filtersInfo = this.filtersInfo + ' | ' + this.state.filterGender
      if(this.state.filterSpecies!='')
        this.filtersInfo = this.filtersInfo + ' | ' + this.state.filterSpecies
      if(this.filtersInfo=='')
        this.filtersInfo = 'Nenhum'
    }

    retorno(){
      var cont = 0
      var ini = 1
      var limit
      if(this.countPageApp===0)
        limit = 10
      else if(this.countPageApp > 0){
        limit = 20
        ini = 11
      }
      return this.state.characters.filter(
            function(res){
              cont += 1
              return cont>=ini && cont<=limit
            }
          ).map((char, i) => <div key={i} class="col-md-15">
                                <div class="card">
                                  <img class="card-img-top" src={char.image}/>
                                  <div class="card-body text-left">
                                    <h5 class="card-title text-center">{char.name}</h5>
                                    <p class="card-text"> <b> Id: </b> {char.id} </p>
                                    <p class="card-text"> <b> Status: </b> {char.status} </p>
                                    <p class="card-text"> <b> Espécie: </b> {char.species} </p>
                                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target={"#modalId" + char.id}>Mais Informações</button>

                                    <div class="modal fade" id={"modalId" + char.id}>
                                      <div class="modal-dialog">
                                        <div class="modal-content">
                                          
                                          <div class="modal-header">
                                            <img class="modal-title" src={char.image}/>
                                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                                          </div>
                                          
                                          <div class="modal-body text-left">
                                            <h5> <b> {char.name} </b> </h5>
                                            <p> <b> Id: </b> {char.id} </p>
                                            <p> <b> Status: </b> {char.status} </p>
                                            <p> <b> Espécie: </b> {char.species} </p>
                                            <h5>Aparições (episódios)</h5>
                                              <ul class="list-group">
                                                  { char.episode.map((ep, k) => <li key={k} class="list-group-item"> { "Episódio " + ep.split("https://rickandmortyapi.com/api/episode/") } </li>) }
                                              </ul>
                                          </div>
                                          
                                          <div class="modal-footer">
                                            <button type="button" class="btn btn-danger" data-dismiss="modal">Fechar</button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>)
    }

	render(){
		return(
			<div class="container">
				<h2> Personagens </h2>
        <div class="mb-4 pb-2 border-bottom border-dark">
          <input onInput={(e) => this.setState({filterName: e.target.value})} type="text" name="nameS" placeholder="Nome do personagem"/>
          <select class="ml-2" onInput={(e) => this.setState({filterStatus: e.target.value})}>
            <option value="">Status</option>
            <option value="alive">Alive (Vivo)</option>
            <option value="dead">Dead (Morto)</option>
            <option value="unknown">Unknown (Desconhecido)</option>
          </select>
          <select onInput={(e) => this.setState({filterGender: e.target.value})} class="ml-2">
            <option value="">Gender (Gênero)</option>
            <option value="female">Female (Feminino)</option>
            <option value="male">Male (Masculino)</option>
            <option value="genderless">Genderless (Sem Gênero)</option>
            <option value="unknown">Unknown (Desconhecido)</option>
          </select>
          <select onInput={(e) => this.setState({filterSpecies: e.target.value})} class="ml-2">
            <option value="">Species (Espécie)</option>
            <option value="human">Human (Humano)</option>
            <option value="humanoid">Humanoid</option>
            <option value="alien">Alien (Alienígenas)</option>
          </select>
          <button class="btn-danger ml-2" onClick={this.clearFilter.bind(this)}>Limpar filtros</button>
          <button class="btn-primary ml-2 mt-2" onClick={this.filtersSearch.bind(this)}>Pesquisar</button>
        </div>
        <div class="row mb-5">
          {this.retorno()}
        </div>

        <div class="fixed-bottom row mt-2 pt-1 border-top border-dark bg-white">
          <div class="col-3">
            <button class="btn-primary" onClick={this.antPageApp.bind(this)}>Anterior</button>
          </div>
          <div class="col-6 text-center">
            <p> <b>Páginas: </b> {this.pageApp} / {this.state.info.pages * 2} | <b>Filtros: </b> {this.filtersInfo} </p>          
          </div>
          <div class="col-3">
            <button class="btn-primary" onClick={this.proxPageApp.bind(this)}>Proxima</button>
          </div>
        </div>
			</div>
		);
	}

}

export default Characters;