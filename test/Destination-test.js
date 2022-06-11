import chai from 'chai';
import Destination from '../src/Destination';
import  destinationData  from '../src/data/sampleData-destination';
const expect = chai.expect;

describe('Destination', function() {
    let newDestination;
    let newDestination2;
    let destinationData;
    let destinationData2;

    beforeEach(() => {
      destinationData = {
        "id": 1,
        "destination": "Lima, Peru",
        "estimatedLodgingCostPerDay": 70,
        "estimatedFlightCostPerPerson": 400,
        "image": "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
        "alt": "overview of city buildings with a clear sky"
      }
      destinationData2 = {
        "id": 2,
        "destination": "Stockholm, Sweden",
        "estimatedLodgingCostPerDay": 100,
        "estimatedFlightCostPerPerson": 780,
        "image": "https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        "alt": "city with boats on the water during the day time"}
      newDestination = new Destination(destinationData)
      newDestination2 = new Destination(destinationData2)
    })
  it('should be a function', function() {
    expect(Destination).to.be.a('function');
  });
  it('should instanciate a new traveler', function() {
    expect(newDestination).to.instanceOf(Destination);
  });
  it('should have an id', function () {
    expect(newDestination.id).to.equal(1);
    expect(newDestination2.id).to.equal(2);
  })
  it('should have a destination', function () {
    expect(newDestination.destination).to.equal('Lima, Peru');
    expect(newDestination2.destination).to.equal('Stockholm, Sweden');
  })
  it('should have an estimated lodging cost per day', function () {
    expect(newDestination.estimatedLodgingCostPerDay).to.equal(70);
    expect(newDestination2.estimatedLodgingCostPerDay).to.equal(100);
  })
  it('should have an estimated flight cost per person', function () {
    expect(newDestination.estimatedFlightCostPerPerson).to.equal(400);
    expect(newDestination2.estimatedFlightCostPerPerson).to.equal(780);
  })
  it('should have a destination image', function () {
    expect(newDestination.image.url).to.equal('https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80')
    expect(newDestination.image.alt).to.equal('overview of city buildings with a clear sky')
    expect(newDestination2.image.url).to.equal('https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80')
    expect(newDestination2.image.alt).to.equal('city with boats on the water during the day time')
  })
});