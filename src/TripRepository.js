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

	getAllTrips(travelerID) {
		return this.sortDatesDescending().filter(trip => trip.userID === travelerID);
	}

	getUpcomingTrips(travelerID) {
		return this.sortDatesAscending().filter((trip) => {
			return trip.date > Date.now() && travelerID === trip.userID;
		})
	}

	getPresentTrips(travelerID) {
		const now = Date.now()
		return this.sortDatesAscending().filter((trip) => {
			return now >= trip.date && now <= trip.getEndDate() && travelerID === trip.userID;
		})
	}

	getPastTrips(travelerID) {
		return this.sortDatesAscending().filter((trip) => {
			return trip.date < Date.now() && travelerID === trip.userID;
		})
	}

	getPendingTrips(travelerID) {
		return this.sortDatesDescending().filter((trip) => {
			return trip.status.includes('pending') && travelerID === trip.userID;
		})
	}

	calculateTotalTravelCostForYear(destinationRepo, travelerID) {
		const now = new Date()
		const tripsForYear = this.trips.filter((trip) => {
			return trip.date.getFullYear() === now.getFullYear() && travelerID === trip.userID;
		})
		const yearlyTotal = tripsForYear.reduce((sum, trip) => {
			const tripDestination = destinationRepo.findById(trip.destinationID)
			const totalLodgingCost = tripDestination.lodgingCost * trip.duration * trip.travelers
			const totalFlightCost = tripDestination.flightCost * trip.travelers
			sum += (totalLodgingCost + totalFlightCost) * 0.9
			return sum
		}, 0)
		return yearlyTotal
	}
}

export default TripRepository;
