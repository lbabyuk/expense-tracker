    const totalAmount = document.querySelector('.total-amount');
    const incomeAmount = document.querySelector('.income-amount');
    const expenseAmount = document.querySelector('.expense-amount');
    const historyList = document.querySelector('.history-list');
    const textInput = document.getElementById('input-text');
    const amountInput = document.getElementById('input-number');
    const form = document.querySelector('.transaction-form');

    let balance = 0;
    let income = 0;
    let expense = 0;
    let historyOfTransaction = [];
    const randomNumber = Math.floor(Math.random() * 100);

    const setItemToLocalStorage = (value) => {
        localStorage.setItem('transaction', JSON.stringify(value));
    };

    const updateBalance = () => {
        balance = income - expense;
        totalAmount.textContent = `$${balance.toFixed(2)}`;
        incomeAmount.textContent = `$${income.toFixed(2)}`;
        expenseAmount.textContent = `$${expense.toFixed(2)}`;
    }

    const historyMarkdown = (historyOfTransaction) => {
      
        const listItem = document.createElement('li');
        listItem.classList.add('text', 'history-list__item');
        listItem.innerHTML = `${historyOfTransaction.category}
            <div>
                <span class="paycheck">${historyOfTransaction.paycheck.toFixed(2)}</span>
                <button class="deleteBtn" type="button" onclick="removeTransaction(this)">X</button>
            </div>`;

        historyList.appendChild(listItem);
        updateBalance();
    };

    const getItemFromLocalStorage = () => {
        const savedItems = JSON.parse(localStorage.getItem('transaction'));
        if (savedItems) {
            historyOfTransaction = savedItems;
            historyOfTransaction.forEach(transaction => {
                historyMarkdown(transaction);
            });
        };
    };

    const addTransaction = (e) =>{
        e.preventDefault();

        const category = textInput.value;
        const paycheck = parseFloat(amountInput.value);

        if (category.trim() === '' || isNaN(paycheck)) {
            alert('Please enter valid text and amount.');
            return;
        }

        if (paycheck > 0) {
            income += paycheck;
        } else {
            expense -= paycheck;
        };

        const transactionObj = {
            id: randomNumber,
            category: category,
            paycheck: paycheck
        };

        historyOfTransaction.push(transactionObj);

        setItemToLocalStorage(historyOfTransaction);
        historyMarkdown(transactionObj);
        
        textInput.value = '';
        amountInput.value = '';
    }

    const removeTransaction = (button) => {
        const listItem = button.parentElement.parentElement;
        const transactionAmount = parseFloat(listItem.querySelector('.paycheck').textContent);

        if (transactionAmount > 0) {
            income -= transactionAmount;
        } else {
            expense += Math.abs(transactionAmount);
        }
        listItem.remove();
        updateBalance();
    }

    form.addEventListener('submit', addTransaction);
    getItemFromLocalStorage();
