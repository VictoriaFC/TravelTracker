import Destination from './Destination';

class DestinationRepository {
	constructor(destinationData) {
		this.destinations = destinationData.map((destinationObj) => { return new Destination(destinationObj) });
	}

	findById(id) {
		return this.destinations.find((destination) => {
			return destination.id === id;
		})
	}
}

export default DestinationRepository;