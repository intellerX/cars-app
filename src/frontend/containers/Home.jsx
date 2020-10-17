import React, { useState } from "react";
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import axios from 'axios';
import cookies, { get } from 'js-cookie';
import { sendLocation } from "../actions";


// import Header from '../components/Header';

import '../assets/styles/Home.scss';

const Home = ({props,cars}) => {
  

  const [form, setValues] = useState({

    latitude: '',
    longitude: '',
  });

  const update = () => {
    setValues({
      ...form,
      latitude: 0,
      longitude: 0

    });
  };

  const send = (latitude, longitude,id) => {
    const bodyParameters = {
      lat: latitude,
      lng: longitude
    };
  
    const config = {
      headers: {
        Authorization: `Bearer ${cookies.get('token')}`,
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
      }  
    };
  
    axios.put(`https://cars-api.vercel.app/api/cars/${id}`, bodyParameters, config)
      
  }

 
  function success(pos) {
    const crd = pos.coords;
  
    console.log('Your current position is:');
    console.log(`Latitude : ${  crd.latitude}`);
    console.log(`Longitude: ${  crd.longitude}`);
    console.log(`More or less ${  crd.accuracy  } meters.`);

    setValues({
      ...form,
      latitude: crd.latitude,
      longitude: crd.longitude

    });
  };
  
  function error(err) {
    console.warn(`ERROR(${  err.code  }): ${  err.message}`);
  };

  const handleSubmit = event => {

    const carList = cars.filter(car => car.idUser === cookies.get('id'));    

    navigator.geolocation.getCurrentPosition(success, error);
    
    event.preventDefault();
    
    carList.forEach(element => {
      send(form.latitude, form.longitude,element._id);

    });

    
    console.log(carList);   
    
    console.log(form.latitude , form.longitude);
    
    
  }



  return (
    <>

      <form className="login__container--form" onSubmit={handleSubmit}>
        
        <button className="button" type="submit"> Set Online </button>
        <div dangerouslySetInnerHTML={{ __html: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8144967.483425871!2d-78.90713160284628!3d4.587758640826626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e15a43aae1594a3%3A0x9a0d9a04eff2a340!2sColombia!5e0!3m2!1ses!2sco!4v1602784407189!5m2!1ses!2sco" width="100%" height="600" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>' }} />

      </form>

    </>



  );
}

const mapDispatchToProps = {
  sendLocation,
};

const mapStateToProps = state => {
  return {
    cars: state.cars
  };
};

Home.propTypes = {
  sendLocation: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

