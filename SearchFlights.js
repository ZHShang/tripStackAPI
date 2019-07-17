const fetch = require("node-fetch");

sortingFlightsByPrice = (array) => {
  if (array.length === 0){
    return console.log("No Flights Found!");
  } else {
    const result = array.filter(element => element.faresLeft > 0);
    result.sort((a,b) => {
      aPrice = a.regularFare.fares[0].amount;
      bPrice = b.regularFare.fares[0].amount;
      if (aPrice < bPrice){
        return -1;
      }
      if (aPrice > bPrice){
        return 1;
      }
    });
    return result
  }
}

printingArray = (array, currency, ori, des) => {
  array.forEach((element) => {
    var departTime = new Date(element.time[0]);
    var arriveTime = new Date(element.time[1]);
    console.log(element.flightNumber + " " + ori + " --> " + des + " (" + departTime + " --> "
            + arriveTime + ") " + " - " + element.regularFare.fares[0].amount + currency)
  })
}

inputValidationCheck = (origin, dest, dDate, ADT) => {
  var currentDate = new Date();
  var enteredDate = new Date(dDate);
  if (origin.length < 3 || dest.length < 3) { //Checking if airport is valid
      return console.log("Enter a valid airport");
    } else if (enteredDate < currentDate){ //date valid?
      return console.log("Please enter a valid date!");
    } else if (ADT < 1) { //at least one adult?
      return console.log("You need at least 1 adult!");
    }
}

getFlightInfo = (origin, dest, dDate, ADT) => {

  inputValidationCheck(origin, dest, dDate, ADT);

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
      var sortedArr = sortingFlightsByPrice(flightArray);
      printingArray(sortedArr, currency, ori, des);
    })
    .catch((error) => {
      return console.log("error: " + error);
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


module.exports = { getFlightInfo, sortingFlightsByPrice, printingArray, inputValidationCheck }


