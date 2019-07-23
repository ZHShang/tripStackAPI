const chai    = require("chai");
const assert  = require("chai").assert;
const expect = require("chai").expect;
const { getFlightInfo } = require("./SearchFlights");
const { sortingFlightsByPrice } = require("./SearchFlights");
const { printingArray } = require("./SearchFlights");
const { inputValidationCheck } = require("./SearchFlights");

const sampleData = {

}

describe('getFlightInfo', () => {
  it("returns false when you enter wrong departure airport", () => {
     assert.equal(getFlightInfo("LG", "DUB", "2019-07-19", 1), false);
  });

  it("returns false when you enter wrong arrival airport", () => {
     assert.equal(getFlightInfo("LGW", "DB", "2019-07-19", 1), false);
  });

  it("returns false when you enter invalid date", () => {
     assert.equal(getFlightInfo("LGW", "DUB", "2019-05-19", 1), false);
  });

  it("returns message when no flights are found", () => {
     assert.equal(getFlightInfo("BUD", "LIS", "2019-11-04", 1), console.log("No Flights Found!"));
  });

  it("returns message when no flights are found even if the aiport in lowercase", () => {
     assert.equal(getFlightInfo("BuD", "lIS", "2019-11-04", 1), console.log("No Flights Found!"));
  });

  it("returns the proper flight when all fields are entered", () => {
    assert.equal(getFlightInfo("LGW", "DUB", "2019-07-19", 1), console.log("FR 117 LGW --> DUB (Fri Jul 19 2019 17:35:00 GMT-0400 (Eastern Daylight Time) --> Fri Jul 19 2019 18:55:00 GMT-0400 (Eastern Daylight Time))  - 299.99 HUF"));
  });
});


  // it("returns error when you enter wrong arrival airport", () => {
  //   const result = searchFlights.getFlightInfo("LGW", "DU", "2019-07-19", 1);
  //   assert.equal("Enter a valid airport", result);
  // });


