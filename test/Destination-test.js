import chai from 'chai';
import Destination from '../src/Destination';
import  destinationData  from '../src/data/sampleData-destination';
const expect = chai.expect;

describe('Destination', function() {
    let newDestination;
    let newDestination1;
    this.beforeEach(() => {
        newDestination = new Destination(destinationData[0])
        newDestination1 = new Destination(destinationData[1])
    })
  it('should be a function', function() {
    expect(Destination).to.be.a('function');
  });
  it('should instanciate a new traveler', function() {
    expect(newDestination).to.instanceOf(Destination);
  });
});