import react     from 'react';
import Slide from './Slide';

const heading = {
    marginTop :"40px",
    textAlign:"center",
    color : "#8a165f",
    marginBottom : "40px"
}

const Explore = () => {
    return (

        <div>
        <h1 my-2 style= {heading}>OUR CLUBS</h1>
        <Slide /> 
        </div>
    )
};

export default Explore;