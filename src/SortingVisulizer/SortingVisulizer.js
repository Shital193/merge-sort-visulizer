import './SortingVisulizer.css';
import React from 'react';
import { getMergeSortAnimations } from '../sortingAlgorithms/SortingAlgoritms';

const ANIMATION_SPEED_MS = 5;
const NUMBER_OF_ARRAY_BARS = 100;
const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';
export default class SortingVisulizer extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            array : [],
        };
    }

    componentDidMount(){
        this.resetArray();
    }

    resetArray(){
        const array = [];
        for(let i = 0; i < NUMBER_OF_ARRAY_BARS; i++){
            array.push(randomIntFromInterval(5, 450));
        }

        this.setState({array})
    }

    mergeSort(){
        const animations = getMergeSortAnimations(this.state.array);
        for(let i = 0; i < animations.length; i++){
            const arrayBars = document.getElementsByClassName('array-bar');
           
            const isColorChange = i % 3 !== 2;
            
            if(isColorChange){ 
                const [barOneIdx,barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR
                setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS);
            }else{
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    render(){
        const {array}  = this.state;

        return ( 
            <div className='array-container'>
                <div className='nav-bar'>
                    <button className="generatenew" onClick={() => this.resetArray()}>Generate new Array</button>
                    <button className="merge" onClick={() => this.mergeSort()}>Meger Sort</button>
                </div>

                <div className='array-bar-out'>
                    {array.map((value,idx) => (
                        <div 
                        className='array-bar' 
                        key = {idx}
                        style ={{height: `${value}px`}}>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}


function randomIntFromInterval(min, max) { 
  return Math.floor(Math.random() * (max - min + 1) + min);
}
