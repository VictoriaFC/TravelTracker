import Trip from './Trip';

class TripRepository {
	constructor(tripData) {
		this.trips = tripData.map((tripObj) => { return new Trip(tripObj) });
	}

	sortDatesAscending() {
		return this.trips.sort((a, b) => a.date - b.date);
	}

	sortDatesDescending() {
		return this.trips.sort((a, b) => b.date - a.date);
	}

	getAllTrips(userID) {
		return this.sortDatesDescending().filter(trip => trip.userID === userID);
	}

	getUpcomingTrips(userID) {
		return this.sortDatesAscending().filter((trip) => {
			return trip.date > Date.now() && userID === trip.userID;
		})
	}

	getPresentTrips(userID) {
		const now = Date.now()
		return this.sortDatesAscending().filter((trip) => {
			return now >= trip.date && now <= trip.getEndDate() && userID === trip.userID;
		})
	}

	getPastTrips(userID) {
		return this.sortDatesAscending().filter((trip) => {
			return trip.date < Date.now() && userID === trip.userID;
		})
	}

	getPendingTrips(userID) {
		return this.sortDatesDescending().filter((trip) => {
			return trip.status.includes('pending') && userID === trip.userID;
		})
	}
}

export default TripRepository;
