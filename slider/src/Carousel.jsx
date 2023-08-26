import React, { useEffect, useState } from 'react';
import { shortList, list, longList } from "./data";
import {FaQuoteRight} from 'react-icons/fa';
import {FiChevronLeft, FiChevronRight} from 'react-icons/fi';

const Carousel = () => {
    const [people, setPeople] = useState(list);
    const [CurrentPerson, setCurrentPerson ] = useState(0);

const prevSlide = () => {
    
    setCurrentPerson((oldPerson)=>{
        const result =(oldPerson - 1 + people.length) % people.length;
        return result;
    })
};
const nextSlide = () => {

    setCurrentPerson((oldPerson)=>{
        const result =(oldPerson + 1) % people.length;
        return result;
    })
};

useEffect(()=> {
   const sliderId = setInterval(()=> {
        nextSlide();
        }, 2000);
    return() => {
        clearInterval(sliderId);
    };
},[CurrentPerson]);

  return (
  <section className="slider-container">
    {people.map((person, personIndex)=>{
        const {id, image, name, title, quote} = person;
        return (
        <article className="slide" style={{transform:`translateX(${100 * (personIndex - CurrentPerson)}% )`, 
        opacity: personIndex === CurrentPerson ? 1 : 0,
        visibility: personIndex === CurrentPerson ? 'visible' : 'hidden',
        }}
         key={id}>
            <img src={image} alt={name} className='person-img'/>
            <h5 className="name">{name}</h5>
            <p className="title">{title}</p>
            <p className="text">{quote}</p>
            <FaQuoteRight className='icon' />
        </article>
        );
    } )}

    <button type='button' className='prev' onClick={prevSlide}>
        <FiChevronLeft />
    </button>

    <button type='button' className='next' onClick={nextSlide}>
        <FiChevronRight />
    </button>

  </section>
  );
};

export default Carousel