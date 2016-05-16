angular.module('waterfallApp')
.service('mathSvc', function() {


    function calc(debt, waterfall) {
        var balance = debt.newBalance;
        var base = debt.base;

        balance = (balance + ((debt.rate/100/12) * balance)) - (base + waterfall);

        return balance;
    }


    function sortDebts(debts, type) {
        return debts.sort(function (a, b) {
            var x = a[type];
            var y = b[type];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }


    function payTheBills(waterfall, debts, type) {
        // set month counter to zero
        var months = 0;
        // set new debts array to push to
        var newDebtsArray = [];
        // add newBalance property to debts array
        for (var j = 0; j < debts.length; j++) {
            debts[j].newBalance = debts[j].balance;
        }
        // bubble sort the debts array based on the users choice
        debts = sortDebts(debts, 'balance');
        // while loop until the debts array is empty
        while (debts.length > 0) {
            console.log(debts);
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
                if (debts[i].newBalance <= 0) {
                    // if it has been paid off then assign the months counter into the debts array
                    debts[i].months = months;
                    // when the first debt gets paid off then the waterfall must increase by the
                    // amount of the base of the first debt
                    waterfall = waterfall + debts[i].base;
                    // and remove the paid debt from the debts array and put into the newDebtsArray
                    newDebtsArray.push(debts.splice(0,1)[0]);
                }
            }
            if (debts.length === 0) {
                break;
            }
        }
        console.log(newDebtsArray);
        return newDebtsArray;
    }















});
