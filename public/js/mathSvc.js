angular.module('waterfallApp')
.service('mathSvc', function() {

    function waterfallPayments(XXXXX) {
        // get new date
        // need counter for number of months to get to zero
        // each iteration will calulate a new balance
        // if the balance is less than the base plus waterfall then add one to counter be done
        var date = new Date();
        var counter = 0;
        while (balance > 0) {
            if (balance < base + waterfall) {
                counter++;
            } else {
                balance = (balance + ((rate/12)*balance)) - (base + waterfall);
                counter++;
            }
        }
        return counter;
    }

    function calc(debt, waterfall) {
        var date = new Date();
        var counter = 0;
        while (balance > 0) {
            if (balance < base) {
                counter++;
            } else {
                balance = (balance + ((rate/12)*balance)) - base;
                counter++;
            }
        }
        return counter;
    }


    var bubbleSort = function(debts, type) {
      for (var i = 0; i < debts.length; i++) {
        for (var j = 0; j < (debts.length - i - 1); j++) {
          var temp = null;
          if (type === 'balance') {
            if (debts[i][type] < debts[j][type]) {
              temp = debts[i];
              debts[i] = debts[j];
              debts[j] = temp;
            }
          } else if (type === 'rate') {
            if (debts[i][type] > debts[j][type]) {
              temp = debts[i];
              debts[i] = debts[j];
              debts[j] = temp;
            }
          }
        }
      }
    };


    function xxxNAMEHERExxx(waterfall, debts, type) {
        // set month counter to zero
        var months = 0;
        // set new debts array to push to
        var newDebtsArray = [];
        // add newBalance property to debts array
        debts.push({id: newBalance, value: 0});
        // bubble sort the debts array based on the users choice
        debts = bubble(debts, type);
        // while loop until the debts array is empty
        while (debts !== []) {
            // loop through the array of debts and perform the calc() based on first debt or otherwise
            for (var i = 0; i < debts.length; i++) {
                // if it is the first one on the array then use the calc() that adds the waterfall amt
                if (i === 0) {
                    // the newBalance value is assigned the new value from the payment calculation
                    debts[i].newBalance = calc(debts[i], waterfall);
                    // else use the calc() that adds normal base pmt amount
                } else {
                    debts[i].newBalance = calc(debts[i], 0);
                }
                // add one to the months counter
                months += 1;
                // check if the balance has been paid off
                if (debts[i].balance <= 0) {
                    // if it has been paid off then assign the months counter into the debts array
                    newDebtsArray.months = months;
                    //
                    newDebtsArray.push(debts.splice(0,1));
                }
            }
        }
        return debts;
    }

















});
