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
}

export default Trip;
