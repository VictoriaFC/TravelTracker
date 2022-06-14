import { expect } from 'chai';
import TripRepository from '../src/TripRepository';
import DestinationRepository from '../src/DestinationRepository';
import Trip from '../src/Trip'; 
import  tripData  from '../src/data/sampleData-trip';

describe('Trip Repository', function() {
	let tripRepo;
	let destinationRepo;
	let destinationData;
  beforeEach(() => {
		destinationData = [
			{"id":49,"destination":"Lima, Peru","estimatedLodgingCostPerDay":70,"estimatedFlightCostPerPerson":400,"image":"https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80","alt":"overview of city buildings with a clear sky"},
			{"id":25,"destination":"Stockholm, Sweden","estimatedLodgingCostPerDay":100,"estimatedFlightCostPerPerson":780,"image":"https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80","alt":"city with boats on the water during the day time"},
			{"id":22,"destination":"Sydney, Austrailia","estimatedLodgingCostPerDay":130,"estimatedFlightCostPerPerson":950,"image":"https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80","alt":"opera house and city buildings on the water with boats"},
			{"id":39,"destination":"Cartagena, Colombia","estimatedLodgingCostPerDay":65,"estimatedFlightCostPerPerson":350,"image":"https://images.unsplash.com/photo-1558029697-a7ed1a4b94c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80","alt":"boats at a dock during the day time"},
			{"id":29,"destination":"Madrid, Spain","estimatedLodgingCostPerDay":150,"estimatedFlightCostPerPerson":650,"image":"https://images.unsplash.com/photo-1543785734-4b6e564642f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80","alt":"city with clear skys and a road in the day time"},	
		]
    tripRepo = new TripRepository(tripData);
		destinationRepo = new DestinationRepository(destinationData);
  });

  it('should be a function', function () {
    expect(TripRepository).to.be.a('function');
  });

	it('should have trips', function () {
		expect(tripRepo.trips[0]).is.instanceOf(Trip);
	});

	it('should sort trip dates in ascending order', function () {
		const newDate = new Date(tripData[0].date)
		const newDate1 = new Date(tripData[1].date)
		const newDate2 = new Date(tripData[2].date)
		const newDate3 = new Date(tripData[3].date)
		const newDate4 = new Date(tripData[4].date)

		expect(tripRepo.sortDatesAscending()).to.deep.equal([
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

		expect(tripRepo.sortDatesDescending()).to.deep.equal([
			new Trip({"id":2,"userID":44,"destinationID":25,"travelers":5,"date":newDate1,"duration":18,"status":"pending","suggestedActivities":[]}),
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
		expect(tripRepo.getAllTrips(tripData[0].userID)).to.deep.equal([
			{"id":2,"userID":44,"destinationID":25,"travelers":5,"date":newDate1,"duration":18,"status":"pending","suggestedActivities":[]},
			{"id":1,"userID":44,"destinationID":49,"travelers":1,"date":newDate,"duration":8,"status":"approved","suggestedActivities":[]},
			{"id":3,"userID":44,"destinationID":22,"travelers":4,"date":newDate2,"duration":17,"status":"approved","suggestedActivities":[]},
			{"id":5,"userID":44,"destinationID":29,"travelers":3,"date":newDate4,"duration":18,"status":"approved","suggestedActivities":[]}
		]);
	});

	it('should get upcoming trips', function () {
		const newDate = new Date(tripData[0].date)
		const newDate1 = new Date(tripData[1].date)
		expect(tripRepo.getUpcomingTrips(tripData[0].userID)).to.deep.equal([
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
		expect(tripRepo.getPresentTrips(tripData[0].userID)).to.deep.equal([]);
	});

	it('should get past trips', function () {
		const newDate2 = new Date(tripData[2].date)
		const newDate4 = new Date(tripData[4].date)
		expect(tripRepo.getPastTrips(tripData[0].userID)).to.deep.equal([
			{"id":5,"userID":44,"destinationID":29,"travelers":3,"date":newDate4,"duration":18,"status":"approved","suggestedActivities":[]},
			{"id":3,"userID":44,"destinationID":22,"travelers":4,"date":newDate2,"duration":17,"status":"approved","suggestedActivities":[]}
		]);
	});

	it('should get pending trips', function () {
		const newDate1 = new Date(tripData[1].date)
		expect(tripRepo.getPendingTrips(tripData[0].userID)).to.deep.equal([
    {"id":2,"userID":44,"destinationID":25,"travelers":5,"date":newDate1,"duration":18,"status":"pending","suggestedActivities":[]}
		]);
	});

	it('should find highest trip id', function () {
		expect(tripRepo.findHightestTripId()).to.deep.equal(5);
	});
});