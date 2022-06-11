import chai from 'chai';
import Trip from '../src/Trip';
import  tripData  from '../src/data/sampleData-trip';
const expect = chai.expect;

describe('Trip', function() {
    let newTrip;
    let newTrip1;
    this.beforeEach(() => {
        newTrip = new Traveler(tripData[0])
        newTrip1 = new Traveler(tripData[1])
    })
  it('should be a function', function() {
    expect(Trip).to.be.a('function');
  });
  it('should instanciate a new traveler', function() {
    expect(newTrip).to.instanceOf(Trip);
  });
});