import React, { useState } from "react";
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import axios from 'axios';
import cookies, { get } from 'js-cookie';
import { sendLocation, obtainCars } from "../actions";


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
      latitude: 4.5555,
      longitude: 4.5555

    });
  };

 


  const handleSubmit = event => {

    const carList = cars.filter(car => car.idUser === cookies.get('id'));

    

    
    event.preventDefault();
    carList.forEach(element => {
      props.sendLocation(1,1,element.id);

    });
    console.log(carList);
    
    
    
  }



  return (
    <>

      <form className="login__container--form" onSubmit={handleSubmit}>
        
        <button className="button" type="submit"> Set Online </button>
        <div dangerouslySetInnerHTML={{ __html: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8144967.483425871!2d-78.90713160284628!3d4.587758640826626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e15a43aae1594a3%3A0x9a0d9a04eff2a340!2sColombia!5e0!3m2!1ses!2sco!4v1602784407189!5m2!1ses!2sco" width="100%" height="700" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>' }} />

      </form>

    </>



  );
}

const mapDispatchToProps = {
  sendLocation,
  obtainCars
};

const mapStateToProps = state => {
  return {
    cars: state.cars
  };
};

Home.propTypes = {
  sendLocation: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

