import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Spinner from './componets/Spinner/Spinner';
import DevItem from './componets/DevItem';
import './Global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';
import DevForm from './componets/DevForm';


const App = props => {
  const [isLoading, setIsLoading] = useState(true);
  const [devs, setDevs] = useState([]);


  useEffect(() => {
    setIsLoading(true);
    axios.get('http://localhost:3333/devs')
      .then(response => {
        //console.log(response)
        setDevs(response.data)
        setIsLoading(false)
      })
      .catch(err => {
        console.log(err)
        setIsLoading(false)
      })

  }, [])



  const submitHandler =(data) => {
   

    axios.post('http://localhost:3333/devs',data)
      .then(response => {
        // console.log(response)
        setDevs([...devs, response.data])

      })
      .catch(err => {
        console.log(err)
      })

    
  }

  let devsList = (
    <Spinner />
  )

  if (!isLoading) {
    devsList = (
      <ul>
        {devs.map(dev => (

          <DevItem dev={dev} key={dev._id} />

        ))}

      </ul>
    )
  }


  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>

        <DevForm
          submitHandler={submitHandler}
        />

      </aside>
      <main>
        {devsList}
      </main>

    </div>
  );
}

export default App;
