// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
import './css/styles.css';
import './images/turing-logo.png'
import './images/viaVictoria.png'
import TravelerRepository from './TravelerRepository';
import TripRepository from './TripRepository';
import DestinationRepository from './DestinationRepository';
import {fetchAll} from './apiCalls';

console.log('This is the JavaScript entry file - your code begins here.');

// ****** global variables ******
let traveler;
let travelerRepo;
let tripRepo;
let destinationRepo;

// ****** fetch GET ******
function loadData(fetchRequests) {
	Promise.all(fetchRequests)
	.then(data => {
		travelerRepo = new TravelerRepository(data[0].travelers);
		traveler = travelerRepo.randomTraveler()
		tripRepo = new TripRepository(data[1].trips);
		destinationRepo = new DestinationRepository(data[2].destinations);
		displayTravelerDataOnDOM();
	})
} 

loadData([fetchAll('travelers'), fetchAll('trips'), fetchAll('destinations')]);

// ****** querySelectors ******
var allTripsButton = document.getElementById('allTrips');
var upcomingTripsButton = document.getElementById('upcomingTrips');
var presentTripsButton = document.getElementById('presentTrips');
var pastTripsButton = document.getElementById('pastTrips');
var pendingTripsButton = document.getElementById('pendingTrips');
var allTripsData = document.getElementById('allTripsData');
var upcomingTripsData = document.getElementById('upcomingTripsData');
var presentTripsData = document.getElementById('presentTripsData');
var pastTripsData = document.getElementById('pastTripsData');
var pendingTripsData = document.getElementById('pendingTripData');

// ****** event listener ******




const displayTravelerDataOnDOM = () => {
var allTripsData = document.getElementById('allTripsData');
tripRepo.trips.forEach((trip) => {
	allTripsData.innerHTML += generateTripDomElement(trip);
})
}

const generateTripDomElement = (trip) => {
  const destination = destinationRepo.findById(trip.destinationID)
	console.log(destination)
  return `
    <li class="trip-row">
      <img class= "trip-image trip-attr" src="${destination.image.url}" alt="${destination.image.alt}">
      <div class="trip-destination trip-attr">${destination.destination}</div>
      <div class="trip-date trip-attr">${trip.date.toLocaleDateString()}</div>
      <div class="trip-travelers trip-attr">${trip.travelers} travelers</div>
    </li>
  `
}