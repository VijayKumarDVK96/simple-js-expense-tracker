'use strict';

const balanceEl = document.getElementById('balance');
const moneyPlusEl = document.getElementById('money-plus');
const moneyMinusEl = document.getElementById('money-minus');
const listEl = document.getElementById('list');
const formEl = document.getElementById('form');
const transactionEl = document.getElementById('transaction');
const amountEl = document.getElementById('amount');

let transactions = localStorage.getItem('transactions') != null ? JSON.parse(localStorage.getItem('transactions')) : [];

// 1, Create init function to initiate the functionalities

const init = function() {
  listEl.innerHTML = null;
  transactions.forEach(addTransactionsDOM);
  updateValues();
};

// 2, Create add transaction function and update it to list

const addTransactionsDOM = function(transaction) {
  const sign = (transaction.amount < 0) ? '-' : '+';
  const item = document.createElement('li');

  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
  item.innerHTML = `${transaction.transaction} <span>${transaction.amount}</span><button class="delete-btn" onclick="removeTransaction(${transaction.id})">X</button>`;

  listEl.appendChild(item);
}

// 3, Submit function - fetch values from form with validations - add it to storage - call update values

formEl.addEventListener('submit', (e) => {
  e.preventDefault();

  let validated = false;

  if(transactionEl.value.trim() === '') {
    alert('Enter transaction name');
  } else {
    validated = true;
  }

  if(amountEl.value.trim() === '') {
    alert('Enter transaction amount');
  } else {
    validated = true;
  }

  if(validated) {
    const transactionItem = {
      id: new Date().valueOf(),
      transaction: transactionEl.value,
      amount: Number(amountEl.value),
    };

    transactions.push(transactionItem);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    addTransactionsDOM(transactionItem);
    updateValues();

    transactionEl.value = null;
    amountEl.value = null;
  }
});

// 4, Check transactions array and calculate income, expense and total

const updateValues = function() {
  const amounts = transactions.map((transaction) => transaction.amount);

  const income = amounts.
      filter((item) => item > 0).
      reduce((acc, item) => acc + item, 0).toFixed(2);

  const expense = amounts.
      filter((item) => item < 0).
      reduce((acc, item) => acc + item, 0).toFixed(2);

  const total = Number(income) + Number(expense);
  moneyPlusEl.innerText = `₹${income}`;
  moneyMinusEl.innerText = `₹${expense}`;
  balance.innerText = `₹${total}`;
  // console.log(total);
}

// 5, Remove transaction by checking and filtering the transactions array and update it to storage

const removeTransaction = function(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  localStorage.setItem('transactions', JSON.stringify(transactions));
  init();
}

// 6, Call init as first function to load
init();