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




/////////////////////////////////////////////////
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// console.log(movements.splice(1,4));
// console.log(movements);
// for (mov of movements){
//   if(mov>0){
//     console.log(`you credited ${mov} dollar today`)
//   }
//   else{
//     console.log(`you debiteted ${Math.abs(mov)} dollar today`)
//   }
// }
// console.log("------------------------------------");
// movements.forEach(function (mov,i,array){
//   if(mov>0){
//     console.log(`number ${i+1} you credited ${mov} dollar today`)
//   }
//   else{
//     console.log(`number ${i+1} you debiteted ${Math.abs(mov)} dollar today`)
//   }
//   console.log(array);
// })


// coding challenge-----------------------------------


// // Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
// // § Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
// const julia=[3, 5, 2, 12, 7];
// const juliaFinal=julia.slice(1,-2);//[...julia];
// const kate=[4, 1, 15, 8, 3];
// const final=[...juliaFinal,...kate];
// console.log(final);

// const checkDogs=function(array){
//     array.forEach(function(age,num){
//         const name=age>3?"adult":"puppy";
//         console.log(`Number ${num} is ${name}, his age is ${age}`);
//     })
// }
// checkDogs(final);

//map------------------------------
// const userName= function(acc){
//     acc.forEach(function(account){
//         account.username=account.owner.split(" ").map(function(ac){
//             return ac[0];
//         }).join("");
//     })
// }
// userName(accounts);
// console.log(accounts);



// const namee="Steven thomas ray";
// const neww=namee.split(" ")
// .map(function(word){
//     return word[0];
// }).join();
// console.log(neww);


//filter--------------------------------------
//     const newWithdraw=account1.movements.filter(function(ab,num){
//         console.log(`${num+1} withdrwal is ${ab<0?ab:"none"}`) ;

// })
// // reduce-----------------------------------------
// const balance=movements.reduce(function(sum,amount){
//   return sum+amount;
// })
// labelBalance.textContent=`${balance} EUR`;

//coding challenge 2----------------------
// Create a function 'calcAverageHumanAge', which accepts an arrays of dog's 
// ages ('ages'), and does the following things in order:
// 1. Calculate the dog age in human years using the following formula: if the dog is 
// <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, 
// humanAge = 16 + dogAge * 4
// 2. Exclude all dogs that are less than 18 human years old (which is the same as 
// keeping dogs that are at least 18 years old)
// 3. Calculate the average human age of all adult dogs (you should already know 
// from other challenges how we calculate averages �)
// 4. Run the function for both test datasets
// const calcAverageHuman=function (dogage){
//   //dogage.forEach(function(ages){
//   const humanAge=dogage.map(function(age){
//     if(age<=2){
//       return 2*age;
//     }
//     else{
//     return 16+age*4;
//     }
//   })
//   console.log(humanAge);
//   const lessThan=humanAge.filter(function(amount){
//     if (amount>18)
//     return  amount;
// })
//   console.log(lessThan);
//  const average=lessThan.reduce(function(sum,allAge){
// return sum+allAge;
//  },0)/lessThan.length;

//  console.log(average);
// //})

// }
// const dog=[5, 2, 4, 1, 15, 8, 3];
// const dog2=[16, 6, 10, 5, 6, 1, 4];
// calcAverageHuman(dog);
// calcAverageHuman(dog2);

// ---------------------------------------------random dice roll
// function getRandom (){
// return Math.floor(Math.random()*50);
// };
// const randomNum=Array.from({length:100},function(){
//   return Math.floor(Math.random()*50);
// });
// console.log(randomNum);

// const movnum=Array.from(document.querySelectorAll(".movements__value"),);
// labelBalance.addEventListener("click",function(){

// })
// console.log(movnum);


//------------------------------------------coding challenge 4-----
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
  ]
  
dogs.forEach(dog=>(dog.recommendFood=Math.trunc(dog.weight**0.75*28)));
console.log(dogs);
let findName;
function findOwner(owner){
  owner=prompt();
findName=dogs.find(dog=>dog.owners.includes(owner));
console.log(findName);

  console.log(`${owner}'s Dog is eat too ${findName.curFood>findName.recommendFood?"much":"less"}`)
}
findOwner();
const toomuch=dogs.filter(dog=>dog.curFood>dog.recommendFood).flatMap(dog=>dog.owners);
console.log(`${toomuch.join(" And ")} dog eat tto much`);
const tooLittle=dogs.filter(dog=>dog.curFood<dog.recommendFood);
console.log(tooLittle);
tooLittle.forEach(function(dog){
  console.log(`${dog.owners}s dog eat too little`);
})

const okayAmount=dog=>dog.curFood > (dog.recommendFood * 0.90) && dog.curFood < (dog.recommendFood * 
  1.10);

console.log(dogs.some(okayAmount));
console.log(dogs.filter(okayAmount));
const sorted=dogs.slice().sort((a,b)=>a.curFood-b.curFood);
console.log(sorted);

