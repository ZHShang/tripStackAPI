const fetch = require("node-fetch");


getFlightInfo = (origin, dest, dDate, ADT) => {

  var currentDate = new Date();
  var enteredDate = new Date(dDate);
  if (origin.length < 3 || dest.length < 3) { //Checking if airport is valid
      console.log("Enter a valid airport");
      return false;
    } else if (enteredDate < currentDate){ //date valid?
      console.log("Please enter a valid date!")
      return false;
    } else if (ADT < 1) { //at least one adult?
      console.log("You need at least 1 adult!");
      return false;
  }

  var concatURL = "https://desktopapps.ryanair.com/v4/en-gb/availability?ADT="
    + ADT +"&CHD=0&DateOut="
    + dDate + "&Destination="
    + dest + "&FlexDaysOut=0&INF=0&IncludeConnectingFlights=true&Origin="
    + origin + "&RoundTrip=false&TEEN=0&ToUs=AGREED&exists=false"

    fetch(concatURL).then((res)=> {
      return res.json();
    })
    .then((data) => {
      const ori = data.trips[0].origin;
      const des = data.trips[0].destination;
      const flightArray = data.trips[0].dates[0].flights;
      var currency = data.currency;
      if(flightArray.length === 0 ){
        return console.log("No Flights Found!");
      } else {
        const result = flightArray.filter(flight => flight.faresLeft > 0);
        result.sort((a,b) => {
          aPrice = a.regularFare.fares[0].amount;
          bPrice = b.regularFare.fares[0].amount;
          if(aPrice < bPrice){
           return -1;
          }
          if(aPrice > bPrice){
            return 1;
          }
        })
        result.forEach((flight) => {
          var departTime = new Date(flight.time[0]);
          var arriveTime = new Date(flight.time[1]);
          console.log(flight.flightNumber + " " + ori + " --> " + des + " (" + departTime + " --> "
            + arriveTime + ") " + " - " + flight.regularFare.fares[0].amount + currency)
        });
      }
    })
    .catch(() => {
      return console.log("error")
    });
}

(searchFlights = () => {

  var input = process.argv.slice(2);
  if (input.length < 4){
    return console.log("Make sure you entered all required inputs");
  }
  var ori = process.argv[2].toUpperCase(); //The Origin //input[0] etc...
  var des = process.argv[3].toUpperCase(); //The Destination
  var date = process.argv[4]; //Departure Date
  var numOfAdults = process.argv[5]; //Number of adults


  getFlightInfo(ori, des, date, numOfAdults)


})();


module.exports = { getFlightInfo }


