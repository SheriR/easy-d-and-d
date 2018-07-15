import React, { Component } from 'react';
import 'tachyons';
import API from '../../utils/API';

class CharJumbo extends React.Component {
state = {
    characters: [],
  };

  componentDidMount = () => {
    let userName = JSON.parse((sessionStorage.getItem('userName')))
    this.loadCharacters();
  }

  loadThisCharacter = () => {
    API.getAllCharacters()
      .then(res =>
        this.setState({ characters: res.data })
      )
      .catch(err => console.log(err));
  };

    render() {
    let character_name = this.state.characters.character_name 

    return (
        <div id='charJumbo' className='jumbotron bg-dark text-white tc mb-0'>
            <h1 className='f1'>Welcome to the Game, {character_name} </h1>
            <p className='f3'>Bring your character to life</p>
        </div>
    )
}
}
export default CharJumbo;