import { expect } from 'chai';
import TripRepository from '../src/TripRepository';
import DestinationRepository from '../src/Destination';
import Trip from '../src/Trip'; 
import  tripData  from '../src/data/sampleData-trip';

describe('Trip Repository', function() {
	let newTrip;
	let newDestination;
	let destinationData;
  beforeEach(() => {
		destinationData = [
			{
			"id":49,
			"destination":"Lima, Peru",
			"estimatedLodgingCostPerDay":70,
			"estimatedFlightCostPerPerson":400,
			"image":"https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
			"alt":"overview of city buildings with a clear sky"
			}
		]
    newTrip = new TripRepository(tripData);
		newDestination = new DestinationRepository(destinationData);
  });
  it('should be a function', function () {
    expect(TripRepository).to.be.a('function');
  });
	it('should have trips', function () {
		expect(newTrip.trips[0]).is.instanceOf(Trip);
	});
	it('should sort trip dates in ascending order', function () {
		const newDate = new Date(tripData[0].date)
		const newDate1 = new Date(tripData[1].date)
		const newDate2 = new Date(tripData[2].date)
		const newDate3 = new Date(tripData[3].date)
		const newDate4 = new Date(tripData[4].date)

		expect(newTrip.sortDatesAscending()).to.deep.equal([
			{"id":4,"userID":36,"destinationID":39,"travelers":6,"date":newDate3,"duration":4,"status":"approved","suggestedActivities":[]},
			{"id":5,"userID":44,"destinationID":29,"travelers":3,"date":newDate4,"duration":18,"status":"approved","suggestedActivities":[]},
			{"id":3,"userID":44,"destinationID":22,"travelers":4,"date":newDate2,"duration":17,"status":"approved","suggestedActivities":[]},
			{"id":1,"userID":44,"destinationID":49,"travelers":1,"date":newDate,"duration":8,"status":"approved","suggestedActivities":[]},
			{"id":2,"userID":44,"destinationID":25,"travelers":5,"date":newDate1,"duration":18,"status":"pending","suggestedActivities":[]}
		]);
	});
	it('should sort trip dates in descending order', function () {
		const newDate = new Date(tripData[0].date)
		const newDate1 = new Date(tripData[1].date)
		const newDate2 = new Date(tripData[2].date)
		const newDate3 = new Date(tripData[3].date)
		const newDate4 = new Date(tripData[4].date)

		expect(newTrip.sortDatesDescending()).to.deep.equal([
			{"id":2,"userID":44,"destinationID":25,"travelers":5,"date":newDate1,"duration":18,"status":"pending","suggestedActivities":[]},
			{"id":1,"userID":44,"destinationID":49,"travelers":1,"date":newDate,"duration":8,"status":"approved","suggestedActivities":[]},
			{"id":3,"userID":44,"destinationID":22,"travelers":4,"date":newDate2,"duration":17,"status":"approved","suggestedActivities":[]},
			{"id":5,"userID":44,"destinationID":29,"travelers":3,"date":newDate4,"duration":18,"status":"approved","suggestedActivities":[]},
			{"id":4,"userID":36,"destinationID":39,"travelers":6,"date":newDate3,"duration":4,"status":"approved","suggestedActivities":[]}
]);
	});
	it('should get all trips', function () {
		const newDate = new Date(tripData[0].date)
		const newDate1 = new Date(tripData[1].date)
		const newDate2 = new Date(tripData[2].date)
		const newDate4 = new Date(tripData[4].date)
		expect(newTrip.getAllTrips(tripData[0].userID)).to.deep.equal([
			{"id":2,"userID":44,"destinationID":25,"travelers":5,"date":newDate1,"duration":18,"status":"pending","suggestedActivities":[]},
			{"id":1,"userID":44,"destinationID":49,"travelers":1,"date":newDate,"duration":8,"status":"approved","suggestedActivities":[]},
			{"id":3,"userID":44,"destinationID":22,"travelers":4,"date":newDate2,"duration":17,"status":"approved","suggestedActivities":[]},
			{"id":5,"userID":44,"destinationID":29,"travelers":3,"date":newDate4,"duration":18,"status":"approved","suggestedActivities":[]}
		]);
	});
	it('should get upcoming trips', function () {
		const newDate = new Date(tripData[0].date)
		const newDate1 = new Date(tripData[1].date)
		expect(newTrip.getUpcomingTrips(tripData[0].userID)).to.deep.equal([
			{"id":1,"userID":44,"destinationID":49,"travelers":1,"date":newDate,"duration":8,"status":"approved","suggestedActivities":[]},
			{"id":2,"userID":44,"destinationID":25,"travelers":5,"date":newDate1,"duration":18,"status":"pending","suggestedActivities":[]}
		]);
	});
	it('should get present trips', function () {
		const newDate = new Date(tripData[0].date)
		const newDate1 = new Date(tripData[1].date)
		const newDate2 = new Date(tripData[2].date)
		const newDate3 = new Date(tripData[3].date)
		const newDate4 = new Date(tripData[4].date)
		expect(newTrip.getPresentTrips(tripData[0].userID)).to.deep.equal([]);
	});
	it('should get past trips', function () {
		const newDate2 = new Date(tripData[2].date)
		const newDate4 = new Date(tripData[4].date)
		expect(newTrip.getPastTrips(tripData[0].userID)).to.deep.equal([
			{"id":5,"userID":44,"destinationID":29,"travelers":3,"date":newDate4,"duration":18,"status":"approved","suggestedActivities":[]},
			{"id":3,"userID":44,"destinationID":22,"travelers":4,"date":newDate2,"duration":17,"status":"approved","suggestedActivities":[]}
		]);
	});
	it('should get pending trips', function () {
		const newDate1 = new Date(tripData[1].date)
		expect(newTrip.getPendingTrips(tripData[0].userID)).to.deep.equal([
    {"id":2,"userID":44,"destinationID":25,"travelers":5,"date":newDate1,"duration":18,"status":"pending","suggestedActivities":[]}
		]);
	});
	it.skip('should calculate total travel cost for the current year', function () {
		// expect(newTrip.calculateTotalTravelCostForYear(destinationData[0]., 44))
	});
	it('should find highest trip id', function () {
		expect(newTrip.findHightestTripId()).to.deep.equal(5);
	});
});