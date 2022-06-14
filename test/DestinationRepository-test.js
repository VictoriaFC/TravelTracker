import { expect } from 'chai';
import DestinationRepository from '../src/DestinationRepository';
import Destination from '../src/Destination';
import  destinationData  from '../src/data/sampleData-destination';

describe('Destination Repository', () => {
	let destinationRepo;
  beforeEach(() => {
    destinationRepo = new DestinationRepository(destinationData);
  });

  it('should be a function', function () {
    expect(DestinationRepository).to.be.a('function');
  });

	it('should have trips', function () {
		expect(destinationRepo.destinations[0]).is.instanceOf(Destination);
	});
});