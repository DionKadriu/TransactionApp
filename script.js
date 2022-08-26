'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
    containerMovements.innerHTML = '';
    movements.forEach(function (mov, i) {
        const type = mov > 0 ? 'deposit' : 'withdrawal'
        const html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">${mov}💶</div>
        </div>`;

        containerMovements.insertAdjacentHTML('afterbegin', html)
    })
}


//filter add the username to the account but no side effect
const createUsernames = (accs) => {
    accs.forEach((acc) => {
        acc.username = acc.owner.toLowerCase()
            .split(' ')
            .map((name) => name[0])
            .join('')
    })
}
createUsernames(accounts)

const calcPrintBalance = (acc) => {
    acc.balance=acc.movements.reduce((acc, mov) => acc + mov, 0);
    labelBalance.textContent = `${acc.balance} 💶 `
}
const calcDisplaySummary = (acc) => {

    const incomes = acc.movements.filter(mov => mov > 0)
        .reduce((acc, mov) => acc + mov, 0);
    labelSumIn.textContent = `${incomes} 💶 `
    const out =acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0)

    labelSumOut.textContent = `${Math.abs(out)} 💵`;
    const interest =acc.movements.filter(mov => mov > 0)
        .map(deposit => deposit * acc.interestRate / 100)
        .filter((int,i,arr)=> int>=1).reduce((acc, int) => acc + int, 0)

    labelSumInterest.textContent = `${interest} 💹`
}

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
//Event handler

const updateUI=(acc)=>{
    displayMovements(acc.movements)
    calcPrintBalance(acc)
    calcDisplaySummary(acc)
}
let currentAccount;
btnLogin.addEventListener('click', (e)=>{
    e.preventDefault()
currentAccount=accounts.find(acc=>acc.username===inputLoginUsername.value)
    if (currentAccount?.pin===Number(inputLoginPin.value)){
        labelWelcome.textContent= 'Welcome back '+currentAccount.owner.split(' ')[0]
        console.log('Logged in user '+ currentAccount)
        console.log(currentAccount)
        containerApp.style.opacity=100;
    }
    updateUI(currentAccount)
})
btnTransfer.addEventListener('click',(e)=>{
    e.preventDefault();
    const amount = Number(inputTransferAmount.value)
    const receiverAccount= accounts.find(acc=>acc.username
        ===inputTransferTo.value);
    inputTransferAmount.value=inputTransferTo.value='';
    if (amount>0 && receiverAccount && currentAccount.balance>= amount && receiverAccount.username!==currentAccount.username){
      console.log('executing this bullshit')
        currentAccount.movements.push(-amount);
        receiverAccount.movements.push(amount);

        updateUI(currentAccount)
    }
});
btnClose.addEventListener('click',(e)=>{
    e.preventDefault()
    if (inputClosePin===currentAccount.username&&Number(inputClosePin.value)
    ===currentAccount.pin
    ){
        const index= accounts.findIndex(acc=> acc.username===currentAccount.username)
        accounts.splice(index,1)
        containerApp.style.opacity=0;
    }
    inputCloseUsername.value=inputClosePin.value='';
})









const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const deposits = movements.filter(mov => mov > 0)
console.log(deposits)
const balance = movements.reduce((acc, cur) => acc + cur, 0)

const eurToUsd = 1.1;
const movementsUSD = movements.map((mov) => mov * eurToUsd)
/////////////////////////////////////////////////
