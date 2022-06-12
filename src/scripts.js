// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
import './css/styles.css';
import './images/turing-logo.png'
import './images/viaVictoria.png'
import {getData} from './apiCalls';

console.log('This is the JavaScript entry file - your code begins here.');


// ****** fetch GET ******
function loadData() {
	Promise.all([getData('travelers'), getData('trips'), getData('destinations')])
} 