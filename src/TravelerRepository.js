import Traveler from './Traveler';

class TravelerRepository {
	constructor(travelerData) {
		this.travelers = travelerData.map((travelerObj) => { return new Traveler(travelerObj) });
	}

	randomTraveler() {
		let randomId = Math.floor(Math.random() * this.travelers.length);
		this.travelers.find((traveler) => traveler.id === randomId)
	}
}

export default TravelerRepository;
