angular.module('waterfallApp')
.service('mathSvc', function() {


    function calc(debt, waterfall) {
        var balance = debt.newBalance;
        var base = debt.base;

        balance = (balance + ((debt.rate/100/12) * balance)) - (base + waterfall);

        return balance;
    }


    function sortDebtsRate(debts, type) {
        return debts.sort(function (a, b) {
            var x = a[type];
            var y = b[type];
            return ((x < y) ? 1 : ((x > y) ? -1 : 0));
        });
    }
    function sortDebtsBal(debts, type) {
        return debts.sort(function (a, b) {
            var x = a[type];
            var y = b[type];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }



    this.payTheBills = function(waterfall, debts, type) {
        // set month counter to zero
        var months = 0;
        // set new debts array to push to
        var newDebtsArray = [];
        // add newBalance property to debts array and initialize with the existing balance
        for (var j = 0; j < debts.length; j++) {
            debts[j].newBalance = debts[j].balance;
        }
        // sort the debts array based on the users choice
        if (type === 'rate') {
            debts = sortDebtsRate(debts, type);
        } else {
            debts = sortDebtsBal(debts, type);
        }
        // console.log(debts);
        // while loop until the debts array is empty
        while (debts.length > 0) {
            // loop through the array of debts and perform the calc() based on first debt or otherwise
            // add one to the months counter each time it runs through the payment calc
            months += 1;
            for (var i = 0; i < debts.length; i++) {
                // if it is the first one on the array then use the calc() that adds the waterfall amt
                if (i === 0) {
                    // the newBalance value is assigned the new value from the payment calculation
                    debts[i].newBalance = calc(debts[i], waterfall);
                    // else use the calc() that adds normal base pmt amount
                } else {
                    debts[i].newBalance = calc(debts[i], 0);
                }
                // check to see if ANY debt has been paid off
                for (var k = 0; k < debts.length; k++) {
                    if (debts[k].newBalance <= 0) {
                        // if it has been paid off then assign the months counter into the debts array
                        debts[k].months = new Date(moment().add(months, 'months'));
                        // when a debt gets paid off then the waterfall must increase by the
                        // amount of the base of that debt
                        waterfall = waterfall + debts[k].base;
                        // and remove the paid debt from the debts array and put into the newDebtsArray
                        newDebtsArray.push(debts.splice([k],1)[0]);
                    }
                }
            }
        }
        return newDebtsArray;
    };


// var debts = [
//     {
//         name: 'student loan',
//         rate: 3.25,
//         base: 55,
//         balance: 4334
//     },
//     {
//         name: 'visa card',
//         rate: 29.95,
//         base: 75,
//         balance: 3457.44
//     },
//     {
//         name: 'car',
//         rate: 6.425,
//         base: 360,
//         balance: 12775.12
//     }
// ];










});
