import chai from 'chai';
import Trip from '../src/Trip';
const expect = chai.expect;

describe('Trip', function() {
  let newTrip;
  let newTrip2;
  let tripData;
  let tripData2;
  beforeEach(() => {
    tripData = {
      "id": 1,
      "userID": 44,
      "destinationID": 49,
      "travelers": 1,
      "date": "2022/09/16",
      "duration": 8,
      "status": "approved",
      "suggestedActivities":[]
    }
    tripData2 = {
      "id": 2,
      "userID": 35,
      "destinationID": 25,
      "travelers": 5,
      "date":"2022/10/04", 
      "duration": 18,
      "status": "approved",
      "suggestedActivities":[]
    }
    newTrip = new Trip(tripData)
    newTrip2 = new Trip(tripData2)
  })
  it('should be a function', function () {
    expect(Trip).to.be.a('function');
  });
  it('should instanciate a new traveler', function () {
    expect(newTrip).to.instanceOf(Trip);
  });
  it('should have an id', function () {
    expect(newTrip.id).to.equal(1);
    expect(newTrip2.id).to.equal(2);
  })
  it('should have a user ID', function () {
    expect(newTrip.userID).to.equal(44);
    expect(newTrip2.userID).to.equal(35);
  })
  it('should have a destination ID', function () {
    expect(newTrip.destinationID).to.equal(49);
    expect(newTrip2.destinationID).to.equal(25);
  })
  it('should have number of travelers', function () {
    expect(newTrip.travelers).to.equal(1);
    expect(newTrip2.travelers).to.equal(5);
  })
  it('should have a travel date', function () {
    expect(newTrip.date).to.equal("2022/09/16");
    expect(newTrip2.date).to.equal("2022/10/04");
  })
  it('should have a travel duration', function () {
    expect(newTrip.duration).to.equal(8);
    expect(newTrip2.duration).to.equal(18);
  })
  it('should have a status', function () {
    expect(newTrip.status).to.equal('approved');
    expect(newTrip2.status).to.equal('approved');
  })
  it('should have suggested activities', function () {
    expect(newTrip.suggestedActivities).to.deep.equal([]);
    expect(newTrip2.suggestedActivities).to.deep.equal([]);
  })
});