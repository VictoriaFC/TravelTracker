import { expect } from 'chai';
import TripRepository from '../src/TripRepository';
import Trip from '../src/Trip'; 
import  tripData  from '../src/data/sampleData-trip';

describe('Trip Repository', () => {
	let newTrip;
  beforeEach(() => {
    newTrip = new TripRepository(tripData);
  });
  it('should be a function', function () {
    expect(TripRepository).to.be.a('function');
  });
	it('should have trips', function () {
		expect(newTrip.trips[0]).is.instanceOf(Trip);
	});
});