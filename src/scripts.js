// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
import './css/styles.css';
import './images/turing-logo.png'
import './images/viaVictoria.png'
import TravelerRepository from './TravelerRepository';
import TripRepository from './TripRepository';
import DestinationRepository from './DestinationRepository';
import { fetchAll, postData } from './apiCalls';
import Trip from './Trip';

console.log('This is the JavaScript entry file - your code begins here.');

// ****** global variables ******
let traveler;
let travelerRepo;
let tripRepo;
let destinationRepo;

// ****** querySelectors ******
var allTripsButton = document.getElementById('allTripsButton');
var upcomingTripsButton = document.getElementById('upcomingTripsButton');
var presentTripsButton = document.getElementById('presentTripsButton');
var pastTripsButton = document.getElementById('pastTripsButton');
var pendingTripsButton = document.getElementById('pendingTripsButton');
var allTripsData = document.getElementById('allTripsData')
var upcomingTripsData = document.getElementById('upcomingTripsData');
var presentTripsData = document.getElementById('presentTripsData');
var pastTripsData = document.getElementById('pastTripsData');
var pendingTripsData = document.getElementById('pendingTripsData');
var newTripSubmitButton = document.getElementById('newTripSubmitButton')

// ****** fetch GET ******
function loadData(fetchRequests, loadTraveler = true) {
	Promise.all(fetchRequests)
	.then(data => {
		travelerRepo = new TravelerRepository(data[0].travelers);
		if (loadTraveler) {
			traveler = travelerRepo.randomTraveler()
		}
		tripRepo = new TripRepository(data[1].trips);
		destinationRepo = new DestinationRepository(data[2].destinations);
		displayAllTrips();
		displayUpcomingTrips();
		displayPresentTrips();
		displayPastTrips();
		displayPendingTrips();
		displayTotalSpentPerYear();
		displayDestinationDropdown(destinationRepo.destinations);
	})
} 

loadData([fetchAll('travelers'), fetchAll('trips'), fetchAll('destinations')]);

newTripSubmitButton.addEventListener('submit', postNewTrip)


const showAllTrips = () => {
	allTripsData.classList.remove('hidden');
	upcomingTripsData.classList.add('hidden');
	presentTripsData.classList.add('hidden');
	pastTripsData.classList.add('hidden');
	pendingTripsData.classList.add('hidden');
}

allTripsButton.addEventListener('click', showAllTrips);

const displayAllTrips = () => {
	allTripsData.innerHTML = "";
	tripRepo.getAllTrips(traveler.id).forEach((trip) => {
		allTripsData.innerHTML += generateTripDomElement(trip);
	})
}

const showUpcomingTrips = () => {
	upcomingTripsData.classList.remove('hidden');
	allTripsData.classList.add('hidden');
	presentTripsData.classList.add('hidden');
	pastTripsData.classList.add('hidden');
	pendingTripsData.classList.add('hidden');
}

upcomingTripsButton.addEventListener('click', showUpcomingTrips);

const displayUpcomingTrips = () => {
	upcomingTripsData.innerHTML = "";
	tripRepo.getUpcomingTrips(traveler.id).forEach((trip) => {
		upcomingTripsData.innerHTML += generateTripDomElement(trip);
	})	
}

const showPresentTrips = () => {
	upcomingTripsData.classList.add('hidden');
	allTripsData.classList.add('hidden');
	presentTripsData.classList.remove('hidden');
	pastTripsData.classList.add('hidden');
	pendingTripsData.classList.add('hidden');
}

presentTripsButton.addEventListener('click', showPresentTrips);

const displayPresentTrips = () => {
	presentTripsData.innerHTML = "";
	tripRepo.getPresentTrips(traveler.id).forEach((trip) => {
		presentTripsData.innerHTML += generateTripDomElement(trip);
	})
}

const showPastTrips = () => {
	upcomingTripsData.classList.add('hidden');
	allTripsData.classList.add('hidden');
	presentTripsData.classList.add('hidden');
	pastTripsData.classList.remove('hidden');
	pendingTripsData.classList.add('hidden');
}

pastTripsButton.addEventListener('click', showPastTrips);

const displayPastTrips = () => {
	pastTripsData.innerHTML = "";
	tripRepo.getPastTrips(traveler.id).forEach((trip) => {
		pastTripsData.innerHTML += generateTripDomElement(trip);
	})
}

const showPendingTrips = () => {
	upcomingTripsData.classList.add('hidden');
	allTripsData.classList.add('hidden');
	presentTripsData.classList.add('hidden');
	pastTripsData.classList.add('hidden');
	pendingTripsData.classList.remove('hidden');
}

pendingTripsButton.addEventListener('click', showPendingTrips);

const displayPendingTrips = () => {
	pendingTripsData.innerHTML = "";
	tripRepo.getPendingTrips(traveler.id).forEach((trip) => {
		pendingTripsData.innerHTML += generateTripDomElement(trip);
	})
}

const generateTripDomElement = (trip) => {
  const destination = destinationRepo.findById(trip.destinationID)
  return `
    <li class="trip-row">
      <img class= "trip-image trip-attr" src="${destination.image.url}" alt="${destination.image.alt}">
      <div class="trip-destination trip-attr">${destination.destination}</div>
      <div class="trip-date trip-attr">${trip.date.toLocaleDateString()}</div>
      <div class="trip-travelers trip-attr">${trip.travelers} travelers</div>
    </li>
  `
}

const displayTotalSpentPerYear = () => {
	const now = new Date()
	const totalCost = tripRepo.calculateTotalTravelCostForYear(destinationRepo, traveler.id)
	const totalCostField = document.getElementById('totalSpentPerYear');
	totalCostField.innerText = `Total Spent on Travel in ${now.getFullYear()}: $${totalCost}`
}

function displayDestinationDropdown(destinations) {
	let destinationDropdown = document.getElementById('destinationDropdown');
	destinations.forEach(destination => {
			let newOption = new Option(destination.destination, destination.id)
			destinationDropdown.appendChild(newOption);
	});
}

function postNewTrip(e) {
	e.preventDefault();
	var tripDate = document.getElementById('dateField').value;
	var splitDate = tripDate.split('-')
	var formattedDate = splitDate.join('/')
	var tripDuration = document.getElementById('durationField').value;
	var tripTravelers = document.getElementById('travelersField').value;
	var tripDestination = document.getElementById('destinationDropdown').value;
	var newId = tripRepo.findHightestTripId() + 1;
	var travelerId = traveler.id;
	clearForm();
	const newTripData = {
		id: newId,
		userID: travelerId,
		destinationID: parseInt(tripDestination),
		travelers: parseInt(tripTravelers),
		date: formattedDate,
		duration: tripDuration,
		status: 'pending',
		suggestedActivities: []
	};

	postData('http://localhost:3001/api/v1/trips', newTripData).then(json => {
		loadData([fetchAll('travelers'), fetchAll('trips'), fetchAll('destinations')], false);
	})
}

function clearForm() {
	document.getElementById('dateField').value = '';
	document.getElementById('durationField').value = '';
	document.getElementById('travelersField').value = '';
	document.getElementById('destinationDropdown').value = '';
}