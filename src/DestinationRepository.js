import Destination from './Destination';

class DestinationRepository {
    constructor(destinationData) {
			this.destinations = destinationData.map((destinationObj) => { return new Destination(destinationObj) });
    }
}

export default DestinationRepository;