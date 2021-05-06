//seguindo gabarito Trybe;
import React from 'react';
import './DogImage.css'

class DogImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dog: '',
      name: '',
      dogs: [],
    };

    this.fetchData = this.fetchData.bind(this);
    this.saveDogs = this.saveDogs.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  componentDidMount() {
    if(localStorage.nameDog) {
      const storage = JSON.parse(localStorage.nameDog);
      const lastDog = storage[storage.length - 1].message;
      this.setState({
        dogs: storage,
        dog: {message: lastDog }
      })
    } else {
      this.fetchData();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.dog.message.includes('terrier')) {
      return false;
    }
    return true;
  }
s
  componentDidUpdate(_, prevState) {
    const { dog } = this.state
    const { message } = dog
    if(prevState.dog !== dog ) {
      localStorage.setItem('url', message);
      const raça = message.split('/')[4]
      alert(raça);
    }
  }

  fetchData() {
    fetch('https://dog.ceo/api/breeds/image/random')
      .then((response) => response.json())
      .then((result) => this.setState({ dog: result }));
  }
  
  saveDogs() {
    const { dog:{ message }, name, dogs } = this.state;
    const dogData = { message, name };
    const newArr = [...dogs, dogData];
    this.setState({dogs: [newArr]})
    this.setState({name: ''});
    // converte valores em javascript para uma String  JSON
    localStorage.setItem('nameDog', JSON.stringify(newArr));

  }
  
  handleInput(event) {
    this.setState({
      name: event.target.value
    })
  }

  render() {
    const { dog, name } = this.state;
    const { message, status } = dog;
    if (dog === '') return 'loading ...';
    return (
      <div>
        <h1>Cães fofinhos</h1>
        <br />
        <br />
        <img src={ message } alt={ status } />
        <br />
        <br />
        
        <br />
        <input 
        type="text"
        value={ name }
        onChange={(event) => this.handleInput(event)}
        placeholder='Qual o nome do seu cão?'
        />
        <br/>
        <br/>
        <button type="button" onClick={ this.fetchData }>Outro Cão</button>
        <button type="button" onClick={ this.saveDogs }>Salvar</button>
      </div>
    );
  }
}

export default DogImage;
