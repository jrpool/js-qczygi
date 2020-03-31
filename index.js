// Import stylesheets
import './style.css';

// Write Javascript code!
// Data.
const acctData = [
  {
    acctNum: 'AAA - 1234',
    user: 'Alice'
  },
  {
    acctNum: 'AAA - 5231',
    user: 'Bob'
  },
  {
    acctNum: 'AAA - 9921',
    'user': 'Alice'
  },
  {
    acctNum: 'AAA - 8191',
    user: 'Alice'
  }
];
const balance = {
  'AAA - 1234': 4593.22,
  'AAA - 9921': 0,
  'AAA - 5231': 232142.5,
  'AAA - 8191': 4344
};

/*
  Return an array of account numbers, optionally for a specified user and
  optionally sorted by account number or balance.
  Arguments:
    0: array of account objects, with 'acctNum' and 'user' properties.
    1: object with account-number properties and balance values.
    2: optional object with possible properties:
      user.
      sortBy (value 'acctNum' or 'balance').
      sortDirection (value 'asc' [default] or 'desc').
*/
const getAcctNums = (accts, balances, optionsObj) => {
  /*
    Get an array of the numbers of all accounts that have both a user and a
    valid balance, limited to accounts of the user if a user was specified.
  */
  let wantedAcctNums = accts
  .filter(acct => {
    if (Number.isFinite(balances[acct.acctNum])) {
      const user = optionsObj && optionsObj.user;
      if (user) {
        return acct.user === user;
      }
      else {
        return true;
      }
    }
    else {
      return false;
    }
  })
  .map(acct => acct.acctNum);
  // Sort it if specified, how specified.
  const sortBy = optionsObj && optionsObj.sortBy;
  if (sortBy) {
    if (sortBy === 'acctNum') {
      wantedAcctNums.sort();
    }
    else if (sortBy === 'balance') {
      wantedAcctNums.sort((a, b) => balances[a] - balances[b]);
    }
    if (optionsObj.sortDirection === 'desc') {
      wantedAcctNums.reverse();
    }
  }
  // Return it.
  return wantedAcctNums;
};

// Test the getAcctNums function.
console.log('a. Unsorted accounts of Bob:');
console.log(getAcctNums(acctData, balance, {user: 'Bob'}));
console.log('b. Unsorted accounts of Charlie:');
console.log(getAcctNums(acctData, balance, {user: 'Charlie'}));
console.log('c. All accounts sorted by number in default order:');
console.log(getAcctNums(acctData, balance, {sortBy: 'acctNum'}));
console.log('d. Accounts of Alice sorted by balance in ascending order:');
console.log(getAcctNums(
  acctData, balance, {user: 'Alice', sortBy: 'balance', sortDirection: 'asc'})
);
console.log('=== EXTRA TESTS FOR CONDITIONS NOT TESTED ABOVE: ===');
console.log('e. Accounts of Alice sorted by balance in descending order:');
console.log(getAcctNums(
  acctData, balance, {user: 'Alice', sortBy: 'balance', sortDirection: 'desc'})
);
console.log('f. Accounts of Alice sorted by number in descending order:');
console.log(getAcctNums(
  acctData, balance, {user: 'Alice', sortBy: 'acctNum', sortDirection: 'desc'})
);
