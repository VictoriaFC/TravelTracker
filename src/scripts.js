// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
import './css/styles.css';
import './images/turing-logo.png'
import './images/viaVictoria.jpg'
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
var loginButton = document.getElementById('loginButton');
var signOutButton = document.getElementById('signOutButton');
var loginMainPage = document.getElementById('loginPage');
var travelerMainPage = document.getElementById('travelerPage');

var allTripsButton = document.getElementById('allTripsButton');
var upcomingTripsButton = document.getElementById('upcomingTripsButton');
var presentTripsButton = document.getElementById('presentTripsButton');
var pastTripsButton = document.getElementById('pastTripsButton');
var pendingTripsButton = document.getElementById('pendingTripsButton');
var newTripSubmitButton = document.getElementById('newTripSubmitButton')

var allTripsData = document.getElementById('allTripsData')
var upcomingTripsData = document.getElementById('upcomingTripsData');
var presentTripsData = document.getElementById('presentTripsData');
var pastTripsData = document.getElementById('pastTripsData');
var pendingTripsData = document.getElementById('pendingTripsData');

window.addEventListener("load", () => {
	loadData([fetchAll('travelers'), fetchAll('trips'), fetchAll('destinations')])

	loginButton.addEventListener('click', showTravelerPage);
	signOutButton.addEventListener('click', showLoginPage);


	newTripSubmitButton.addEventListener('submit', postNewTrip);
	newTripSubmitButton.addEventListener('change', displayTripEstimate);
	allTripsButton.addEventListener('click', showAllTrips);
	upcomingTripsButton.addEventListener('click', showUpcomingTrips);
	pastTripsButton.addEventListener('click', showPastTrips);
	presentTripsButton.addEventListener('click', showPresentTrips);
	pendingTripsButton.addEventListener('click', showPendingTrips);
})

// function letUserLogin() {
// 	if (travelerRepo)
// }

// function letTravelerLogOut() {

// }

function showTravelerPage() {
	travelerMainPage.classList.remove('hidden')
	loginMainPage.classList.add('hidden')
}

function showLoginPage() {
	travelerMainPage.classList.add('hidden')
	loginMainPage.classList.remove('hidden')
}

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

const showAllTrips = () => {
	allTripsButton.classList.add('trip-button-selected');
	upcomingTripsButton.classList.remove('trip-button-selected');
	presentTripsButton.classList.remove('trip-button-selected');
	pastTripsButton.classList.remove('trip-button-selected');
	pendingTripsButton.classList.remove('trip-button-selected');
	allTripsData.classList.remove('hidden');
	upcomingTripsData.classList.add('hidden');
	presentTripsData.classList.add('hidden');
	pastTripsData.classList.add('hidden');
	pendingTripsData.classList.add('hidden');
}

const displayAllTrips = () => {
	allTripsData.innerHTML = generateHeaderRow();
	tripRepo.getAllTrips(traveler.id).forEach((trip) => {
		allTripsData.innerHTML += generateTripDomElement(trip);
	})
}

const showUpcomingTrips = () => {
	allTripsButton.classList.remove('trip-button-selected');
	upcomingTripsButton.classList.add('trip-button-selected');
	presentTripsButton.classList.remove('trip-button-selected');
	pastTripsButton.classList.remove('trip-button-selected');
	pendingTripsButton.classList.remove('trip-button-selected');
	upcomingTripsData.classList.remove('hidden');
	allTripsData.classList.add('hidden');
	presentTripsData.classList.add('hidden');
	pastTripsData.classList.add('hidden');
	pendingTripsData.classList.add('hidden');
}

const displayUpcomingTrips = () => {
	upcomingTripsData.innerHTML = generateHeaderRow();
	tripRepo.getUpcomingTrips(traveler.id).forEach((trip) => {
		upcomingTripsData.innerHTML += generateTripDomElement(trip);
	})	
}

const showPresentTrips = () => {
	allTripsButton.classList.remove('trip-button-selected');
	upcomingTripsButton.classList.remove('trip-button-selected');
	presentTripsButton.classList.add('trip-button-selected');
	pastTripsButton.classList.remove('trip-button-selected');
	pendingTripsButton.classList.remove('trip-button-selected');
	upcomingTripsData.classList.add('hidden');
	allTripsData.classList.add('hidden');
	presentTripsData.classList.remove('hidden');
	pastTripsData.classList.add('hidden');
	pendingTripsData.classList.add('hidden');
}

const displayPresentTrips = () => {
	presentTripsData.innerHTML = generateHeaderRow();
	tripRepo.getPresentTrips(traveler.id).forEach((trip) => {
		presentTripsData.innerHTML += generateTripDomElement(trip);
	})
}

const showPastTrips = () => {
	allTripsButton.classList.remove('trip-button-selected');
	upcomingTripsButton.classList.remove('trip-button-selected');
	presentTripsButton.classList.remove('trip-button-selected');
	pastTripsButton.classList.add('trip-button-selected');
	pendingTripsButton.classList.remove('trip-button-selected');
	upcomingTripsData.classList.add('hidden');
	allTripsData.classList.add('hidden');
	presentTripsData.classList.add('hidden');
	pastTripsData.classList.remove('hidden');
	pendingTripsData.classList.add('hidden');
}

const displayPastTrips = () => {
	pastTripsData.innerHTML = generateHeaderRow();
	tripRepo.getPastTrips(traveler.id).forEach((trip) => {
		pastTripsData.innerHTML += generateTripDomElement(trip);
	})
}

const showPendingTrips = () => {
	allTripsButton.classList.remove('trip-button-selected');
	upcomingTripsButton.classList.remove('trip-button-selected');
	presentTripsButton.classList.remove('trip-button-selected');
	pastTripsButton.classList.remove('trip-button-selected');
	pendingTripsButton.classList.add('trip-button-selected');
	upcomingTripsData.classList.add('hidden');
	allTripsData.classList.add('hidden');
	presentTripsData.classList.add('hidden');
	pastTripsData.classList.add('hidden');
	pendingTripsData.classList.remove('hidden');
}

const displayPendingTrips = () => {
	pendingTripsData.innerHTML = generateHeaderRow();
	tripRepo.getPendingTrips(traveler.id).forEach((trip) => {
		pendingTripsData.innerHTML += generateTripDomElement(trip);
	})
}

const generateTripDomElement = (trip) => {
  const destination = destinationRepo.findById(trip.destinationID)
  return `
    <li class="trip-row">
      <div class="img-attr"><img class= "trip-image" src="${destination.image.url}" alt="${destination.image.alt}"></div>
      <div class="trip-destination trip-attr">${destination.destination}</div>
      <div class="trip-date trip-attr">${trip.date.toLocaleDateString()}</div>
      <div class="trip-date trip-attr">${trip.getEndDate().toLocaleDateString()}</div>
      <div class="trip-travelers trip-attr">${trip.travelers} travelers</div>
    </li>
  `
}

const displayTotalSpentPerYear = () => {
	const now = new Date()
	const totalCost = tripRepo.calculateTotalTravelCostForYear(destinationRepo, traveler.id)
	const totalCostField = document.getElementById('totalSpentPerYear');
	totalCostField.innerText = `Total Spent on Travel in ${now.getFullYear()}: \n$${totalCost.toFixed(2)}`
}

function displayDestinationDropdown(destinations) {
	let destinationDropdown = document.getElementById('destinationDropdown');
	destinations.forEach(destination => {
			let newOption = new Option(destination.destination, destination.id)
			destinationDropdown.appendChild(newOption);
	});
}

function generateHeaderRow() {
	return `<li class="trip-row trip-row-header">
		<div class="img-attr"></div>
		<div class="trip-destination trip-attr">Location</div>
		<div class="trip-date trip-attr">Start Date</div>
		<div class="trip-date trip-attr">End Date</div>
		<div class="trip-travelers trip-attr">Travelers</div>
	</li>`
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

function displayTripEstimate() {
	var tripDate = document.getElementById('dateField').value;
	var splitDate = tripDate.split('-')
	var formattedDate = splitDate.join('/')
	var tripDuration = document.getElementById('durationField').value;
	var tripTravelers = document.getElementById('travelersField').value;
	var tripDestination = document.getElementById('destinationDropdown').value;
	var newId = tripRepo.findHightestTripId() + 1;
	var travelerId = traveler.id;
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
	console.log(newTripData)
	
	const checkItOut = Object.values(newTripData)
	if (checkItOut.includes('') || checkItOut.includes(NaN)) {
		return
	}

	const newTrip = new Trip(newTripData)
	const estimatedCost = newTrip.calculateCost(destinationRepo)
	tripEstimate.innerHTML = `Your Trip Estimate is: $${estimatedCost.toFixed(2)}`
}

function clearForm() {
	document.getElementById('dateField').value = '';
	document.getElementById('durationField').value = '';
	document.getElementById('travelersField').value = '';
	document.getElementById('destinationDropdown').selectedIndex = 0;
}