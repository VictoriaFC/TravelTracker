class Trip {
	constructor(tripData) {
			this.id = tripData.id;
			this.userID = tripData.userID;
			this.destinationID = tripData.destinationID;
			this.travelers = tripData.travelers;
			this.date = new Date(tripData.date);
			this.duration = tripData.duration;
			this.status = tripData.status;
			this.suggestedActivities = tripData.suggestedActivities;
	}

	getEndDate() {
		const endDate = new Date(this.date.getTime());
		endDate.setDate(this.date.getDate() + this.duration);

		return endDate;
	}

	calculateCost(destinationRepo) {
		const destination = destinationRepo.findById(this.destinationID)
		const totalLodgingCost = destination.lodgingCost * this.duration * this.travelers
		const totalFlightCost = destination.flightCost * this.travelers
		
		return (totalLodgingCost + totalFlightCost) * 0.9
	}
}

export default Trip;
