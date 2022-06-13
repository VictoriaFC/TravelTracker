import Traveler from './Traveler';

class TravelerRepository {
	constructor(travelerData) {
		this.travelers = travelerData.map((travelerObj) => { return new Traveler(travelerObj) });
	}

	randomTraveler() {
		let randomId = Math.ceil(Math.random() * this.travelers.length);
		return this.travelers.find((traveler) => traveler.id === randomId)
	}

	findById() {
		// username is traveler + Number
		// password is traveler
	}
}

export default TravelerRepository;
