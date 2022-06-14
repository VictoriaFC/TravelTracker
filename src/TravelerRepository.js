import Traveler from './Traveler';

class TravelerRepository {
	constructor(travelerData) {
		this.travelers = travelerData.map((travelerObj) => { return new Traveler(travelerObj) });
	}

	randomTraveler() {
		let randomId = Math.ceil(Math.random() * this.travelers.length);
		return this.travelers.find((traveler) => traveler.id === randomId)
	}
}

export default TravelerRepository;
