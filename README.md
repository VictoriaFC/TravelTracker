# Welcome to Travel via Victoria

This was designed to be my submission for Turing's Front End Mod 2 final solo project

You can find my GitHub [here](https://github.com/VictoriaFC).

## How to Run the Application

1. Clone down this repo.
2. Then cd into the root directory and run npm start in the terminal to start up the local server.
3. Then clone down [this repo](https://github.com/turingschool-examples/travel-tracker-api) outside of the TravelTracker directory.
4. cd into travel-tracker-api.
5. Run npm start in the terminal to start up the local api server.
6. Finally, open the app at http://localhost:8080/

## How to Use the Application

Log in using the credentials below:

 - username: traveler# (traveler number can be anything inbetween 1 and 50. i.e. traveler30)
 - password: travel

From there, you'll be taken to the travelers dashboard! This shows all upcoming, present, past and pending trips sorted by date! It also shows the location, dates of the trip, and how many travelers were on that trip!

## How to Book a New Trip

There is a form in the sidebar, simply select the desired start date, enter the number of days the trip will be, the number of travelers that will be on the trip, and selection a location from the destination dropdown. Before you hit submit you'll see a trip estimate price populate below the form. If you'd like to submit the trip then click the submit button! You'll see that trip pop up under the 'All Trips' and 'Pending' tabs. 

## Technologies Used

Vanilla JavaScript
Fetch API
Mocha/Chai testing
Webpack
CSS
HTML

## Future Ideas

- Add a travel agent interaction page that would allow the travel agent to approve pending trips!
- Display user information on the dashboard after they login
