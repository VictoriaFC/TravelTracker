import chai from 'chai';
import DestinationRepository from '../src/Destination';
import Trip from '../src/Trip';

const expect = chai.expect;

describe('Trip', function() {
  let newTrip;
  let newTrip2;
	let destinationRepo;
  let tripData;
  let tripData2;
	let destinationData;
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
		destinationData = [ 
		{
			"id": 49,
			"destination": "Castries, St Lucia",
			"estimatedLodgingCostPerDay": 650,
			"estimatedFlightCostPerPerson": 90,
			"image": "https://images.unsplash.com/photo-1524478075552-c2763ea171b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80",
			"alt": "aerial photography of rocky mountain under cloudy sky"
		}, 
		{
			"id": 25,
			"destination": "New York, New York",
			"estimatedLodgingCostPerDay": 175,
			"estimatedFlightCostPerPerson": 200,
			"image": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
			"alt": "people crossing the street during the day surrounded by tall buildings and advertisements"
	}
	]
    newTrip = new Trip(tripData)
    newTrip2 = new Trip(tripData2)
		destinationRepo = new DestinationRepository(destinationData)
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
    expect(newTrip.date.toLocaleDateString()).to.equal("9/16/2022");
    expect(newTrip2.date.toLocaleDateString()).to.equal("10/4/2022");
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

	it('should be able to get a trip end date', function () {
		expect(newTrip.getEndDate(tripData).toLocaleDateString()).to.equal('9/24/2022');
		expect(newTrip2.getEndDate(tripData2).toLocaleDateString()).to.equal('10/22/2022');
	})
});