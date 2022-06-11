import chai from 'chai';
import Traveler from '../src/Traveler';
import  travelerData  from '../src/data/sampleData-traveler';
const expect = chai.expect;

describe('Traveler', function() {
    let newTraveler;
    let newTraveler1;
    this.beforeEach(() => {
        newTraveler = new Traveler(travelerData[0])
        newTraveler1 = new Traveler(travelerData[1])
    })
  it('should be a function', function() {
    expect(Traveler).to.be.a('function');
  });
  it('should instanciate a new traveler', function() {
    expect(newTraveler).to.instanceOf(Traveler);
  });
});


