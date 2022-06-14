import './css/styles.css';
import './images/turing-logo.png'
import './images/viaVictoria.jpg'
import Traveler from './Traveler';
import TripRepository from './TripRepository';
import DestinationRepository from './DestinationRepository';
import { fetchAll, fetchOne, postData } from './apiCalls';
import Trip from './Trip';

// ****** global variables ******
let traveler;
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

var allTripsData = document.getElementById('allTripsData');
var upcomingTripsData = document.getElementById('upcomingTripsData');
var presentTripsData = document.getElementById('presentTripsData');
var pastTripsData = document.getElementById('pastTripsData');
var pendingTripsData = document.getElementById('pendingTripsData');
var tripEstimate = document.getElementById('tripEstimate');


// ****** page load event listener ******
window.addEventListener("load", () => {
	loginButton.addEventListener("click", attemptLogin)
	signOutButton.addEventListener("click", logout)
	newTripSubmitButton.addEventListener('submit', postNewTrip);
	newTripSubmitButton.addEventListener('change', displayTripEstimate);
	allTripsButton.addEventListener('click', showAllTrips);
	upcomingTripsButton.addEventListener('click', showUpcomingTrips);
	pastTripsButton.addEventListener('click', showPastTrips);
	presentTripsButton.addEventListener('click', showPresentTrips);
	pendingTripsButton.addEventListener('click', showPendingTrips);
})

function attemptLogin(event) {
	event.preventDefault()
	const username = document.getElementById("uname").value;
	const pass = document.getElementById("psw").value;
	const splitUsername =  username.split('traveler')
	const userId = parseInt(splitUsername[1])
	const validInputs = userId !== NaN && pass === "travel" && splitUsername[0] === ""

	if (!validInputs) {
		alert("Invalid username/password")
		return
	}

	fetchOne('travelers', userId).then((travelerData) => {
		if (travelerData) {
			traveler = new Traveler(travelerData)
			loadData([fetchAll('trips'), fetchAll('destinations')])
			showTravelerPage()
			document.getElementById("uname").value = "";
			document.getElementById("psw").value = "";
		} else {
			alert("Invalid username/password")
		}
	})
}

function showTravelerPage() {
	travelerMainPage.classList.remove('hidden')
	loginMainPage.classList.add('hidden')
}

function logout() {
	travelerMainPage.classList.add('hidden')
	loginMainPage.classList.remove('hidden')
	traveler = undefined 
	tripRepo = undefined
	destinationRepo = undefined
}

// ****** fetch GET ******
function loadData(fetchRequests) {
	Promise.all(fetchRequests)
	.then(data => {
		tripRepo = new TripRepository(data[0].trips);
		destinationRepo = new DestinationRepository(data[1].destinations);
		showAllTrips()
		displayAllTrips();
		displayUpcomingTrips();
		displayPresentTrips();
		displayPastTrips();
		displayPendingTrips();
		displayTotalSpentPerYear();
		displayDestinationDropdown();
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
	const dollarUSLocale = Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD'
	})
	const totalCost = tripRepo.calculateTotalTravelCostForYear(destinationRepo, traveler.id)
	const totalCostField = document.getElementById('totalSpentPerYear');
	totalCostField.innerText = `Total Spent on Travel in ${now.getFullYear()}: \n${dollarUSLocale.format(totalCost)}`
}

function displayDestinationDropdown() {
	let destinationDropdown = document.getElementById('destinationDropdown');
	destinationRepo.destinations.forEach(destination => {
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
		duration: parseInt(tripDuration),
		status: 'pending',
		suggestedActivities: []
	};

	postData('http://localhost:3001/api/v1/trips', newTripData).then(json => {
		loadData([fetchAll('trips'), fetchAll('destinations')]);
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
	
	const newTripValues = Object.values(newTripData)
	if (newTripValues.includes('') || newTripValues.includes(NaN)) {
		return
	}

	const newTrip = new Trip(newTripData)
	const dollarUSLocale = Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD'
	})
	const estimatedCost = newTrip.calculateCost(destinationRepo)
	tripEstimate.innerHTML = `Your Trip Estimate is: ${dollarUSLocale.format(estimatedCost)}`
}

function clearForm() {
	document.getElementById('dateField').value = '';
	document.getElementById('durationField').value = '';
	document.getElementById('travelersField').value = '';
	document.getElementById('destinationDropdown').selectedIndex = 0;
	tripEstimate.innerHTML = "";
}