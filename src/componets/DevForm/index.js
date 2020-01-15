import React, { useState, useEffect } from 'react';

import './styles.css';

const DevForm = props => {
    const [github_username, setGithubUsername] = useState('');
    const [techs, setTechs] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    const { submitHandler } = props

    const onSubmit = async (event) => {
        event.preventDefault();
        await submitHandler({ github_username, techs, latitude, longitude });
        setGithubUsername('');
        setTechs('');
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                //console.log(position)
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            },
            (err) => {
                console.log(err)
            },
            {
                timeout: 30000
            }
        )
    }, [])


    return (

        <form onSubmit={event => onSubmit(event)}>
            <div className="input-block">
                <label htmlFor='github_username'>Usuário do Github</label>
                <input name='github_username' id='github_username'
                    value={github_username} onChange={event => setGithubUsername(event.target.value)}
                    required />
            </div>

            <div className="input-block">
                <label htmlFor='techs'>Tecnologias</label>
                <input name='techs' id='techs'
                    value={techs} onChange={event => setTechs(event.target.value)}
                    required />
            </div>

            <div className='input-group'>

                <div className="input-block">
                    <label htmlFor='latitude'>Latitude</label>
                    <input type="number" name='latitude' id='latitude'
                        value={latitude} onChange={event => setLatitude(event.target.value)}
                        required />
                </div>

                <div className="input-block">
                    <label htmlFor='longitude'>Longitude</label>
                    <input type="number" name='longitude' id='longitude'
                        value={longitude} onChange={event => setLongitude(event.target.value)}
                        required />
                </div>


            </div>

            <button type="submit">Salvar</button>
        </form>

    );
}
export default DevForm;