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

// /////////////////////////////////////////////////
// /////////////////////////////////////////////////
// // LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const userName= function(acc){
    acc.forEach(function(account){
        account.username=account.owner.toLowerCase().split(" ").map(function(ac){
            return ac[0];
        }).join("");
    })
}
userName(accounts);
console.log(accounts);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const movement= function(acc){
  acc.movements.forEach (function(mov,i) {
    const type=mov>0?"deposit":"withdrawal";
    const html=(`<div class="movements__row">
        <div class="movements__type movements__type--${type}">${i} ${type}</div>
          <div class="movements__value">${mov}</div>
  </div>`);
  containerMovements.insertAdjacentHTML("afterbegin",html);
  }); 
}
const sum=function(acc){
 acc.balance= acc.movements.reduce((sum,num)=>sum+num,0);
labelBalance.textContent=`${acc.balance}$`;
}
// btnLogin.addEventListener("click",movement());
// movement(account2);

const displayamount=function(acc){
const inAmount=acc.movements.filter(function(amount){
      return amount>0;
}).reduce(function(sum,mov){
  return sum+mov;
},0);
const outAmount=acc.movements.filter(function(amount){
  return amount<0;
}).reduce((sum,mov)=>sum+mov,0);
labelSumIn.textContent=inAmount;
labelSumOut.textContent=Math.abs(outAmount);

const interest=acc.movements.filter(function(amount){
  return amount>0;
}).map(function(amount){
  return amount*acc.interestRate/100;
}).reduce(function(sum,amount){
  return sum+amount;
});

labelSumInterest.textContent=(interest);
}
// displayamount(account2);
var currentAccount;
const updateUI=function(a){
  movement(a);
  displayamount(a);
  sum(a);
}

// containerApp.style.opacity=100;
btnLogin.addEventListener("click",function(e){
  e.preventDefault();
  currentAccount=accounts.find(function(acc){
 if (acc.username===inputLoginUsername.value && acc.pin===Number(inputLoginPin.value)){
   return acc;
 }
})
console.log(currentAccount);
labelWelcome.textContent=`Welcome to Account ${currentAccount.owner.split(" ")[1]}`;
containerApp.style.opacity=100;
// console.log(accounts);
inputLoginUsername.value=inputLoginPin.value="";
inputLoginPin.blur();
updateUI(currentAccount);
})



btnTransfer.addEventListener("click",function(e){
  e.preventDefault();
  console.log("transfer");
  const amount=Number(inputTransferAmount.value);
  const receiver=accounts.find(function(acc){
    if(inputTransferTo.value===acc.username && currentAccount.username!=acc.username){
      return acc;
    }
  })
    if(amount>0 && amount<currentAccount.balance &&receiver?.username!==currentAccount.username){
      currentAccount.movements.push(-amount);
      receiver.movements.push(amount);
      updateUI(currentAccount);
    }
    inputTransferAmount.value=inputTransferTo.value="";
    inputTransferAmount.blur();
  })

btnLoan.addEventListener("click",function(e){
e.preventDefault();
const amount=Number(inputLoanAmount.value);
// const loan=currentAccount.movements.some(acc=>acc>0)
if(amount>0 && currentAccount.movements.some(mov=>mov>amount*0.1)){
currentAccount.movements.push(amount);
updateUI(currentAccount);
}
console.log(amount); 
})


btnClose.addEventListener("click",function(v){
  v.preventDefault();

  if(currentAccount.username===inputCloseUsername.value && currentAccount.pin===Number(inputClosePin.value)){
   const index=accounts.findIndex(ac=>ac.username===currentAccount.username);
   console.log(index);
   accounts.splice(index,1);
   containerApp.style.opacity=0;
  }
  inputCloseUsername.value=inputClosePin.value=""; 
})





