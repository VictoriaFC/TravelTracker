import chai from 'chai';
import Traveler from '../src/Traveler';
const expect = chai.expect;

describe('Traveler', function() {
    let newTraveler;
    let newTraveler2;
    let travelerData;
    let travelerData2;
    beforeEach(() => {
        travelerData = { "id": 1, "name": "Ham Leadbeater", "travelerType": "relaxer"}
        travelerData2 = {"id":2,"name":"Rachael Vaughten","travelerType":"thrill-seeker"}
        newTraveler = new Traveler(travelerData)
        newTraveler2 = new Traveler(travelerData2)
    })
  it('should be a function', function() {
    expect(Traveler).to.be.a('function');
  });
  it('should instantiate a new traveler', function() {
    expect(newTraveler).to.instanceOf(Traveler);
    expect(newTraveler2).to.instanceOf(Traveler);
  });
  it('should have an id', function() {
    expect(newTraveler.id).to.equal(1);
    expect(newTraveler2.id).to.equal(2);
  })
  it('should have a name', function() {
    expect(newTraveler.name).to.equal('Ham Leadbeater');
    expect(newTraveler2.name).to.equal('Rachael Vaughten');
  })
  it('should have a traveler type', function() {
    expect(newTraveler.travelerType).to.equal('relaxer');
    expect(newTraveler2.travelerType).to.equal('thrill-seeker');
  })
});


