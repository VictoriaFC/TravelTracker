class Trip {
    constructor(tripData) {
        this.id = tripData.id;
        this.userID = tripData.userID;
        this.destinationID = tripData.destinationID;
        this.travelers = tripData.travelers;
        this.date = tripData.date;
        this.duration = tripData.duration;
        this.status = tripData.status;
        this.suggestedActivities = tripData.suggestedActivities;
    }

}

export default Trip;
// {"id":1,"userID":44,"destinationID":49,"travelers":1,"date":"2022/09/16",
// "duration":8,"status":"approved","suggestedActivities":[]}