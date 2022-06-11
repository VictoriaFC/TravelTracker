// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

import {getData} from './apiCalls';

console.log('This is the JavaScript entry file - your code begins here.');


// ****** fetch GET ******
function loadData() {
	Promise.all([getData('travelers'), getData('trips'), getData('destinations')])
} 