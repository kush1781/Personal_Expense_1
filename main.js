// Greet!!
console.log("Hi")

// Get the reference to headingTotal element
const headingEl = document.querySelector("#headingTotal")

// Get the reference to inputDesc element 
const inputDescEl = document.querySelector("#inputDesc")

// Get the reference to inputAmount element 
const inputElement = document.querySelector("#inputAmount")

// Get the reference to expenseTable element 
const expenseTableEl = document.querySelector("#expenseTable")

// Initialize total amount to zero
let totalExpense = 0

// Initializing an allExpense array
let allExpense = []

// Set the headingTotal element equal to totalExpense
headingEl.textContent = `Total Expense: ${totalExpense}`

// OnButtonClick add inputAmount to totalExpense
function addExpenceToTotal() {
    // Read value from inputAmount
    const textAmount = inputElement.value

    // Read value from inputDesc
    const textDesc = inputDescEl.value
    
    // Convert it to number
    const inputAmount = parseInt(textAmount)

    // Initializing expense
    const expense = {}
    expense.description = textDesc
    expense.amount =  inputAmount
    expense.moment = new Date()

    // Add that value to totalExpense
    totalExpense = totalExpense + inputAmount
    // console.log("Your total expense",totalExpense)

    // Adding expense to allExpense
    allExpense.push(expense)
    // console.table(allExpense)

    // Set the headingTotal element equal to totalExpense
    headingEl.textContent = `Total Expense: ${totalExpense}`
    
    // To renderList to Document
    renderList(allExpense)

    // Reset the inputElement to empty
    inputDescEl.value = ""
    inputElement.value = ""
}

// Get the btnCounter element
const element = document.querySelector("#btnAddExpense")

// Listen to click event
element.addEventListener("click", addExpenceToTotal, false)

// *** Controller Functions ***

// to Delete expense from allExpense
function deleteExpense(dateValue) {
    let newTotalExpense = 0;
    const newArr = allExpense.filter((exp)=>{
        if(exp.moment.valueOf() !== dateValue)
        {
            newTotalExpense = newTotalExpense + exp.amount 
            return exp
        }
    })
    // So that allExpense is updated
    allExpense = newArr
    renderList(newArr)
    // So that totalExpense is updated
    totalExpense = newTotalExpense
    headingEl.textContent = `Total Expense: ${totalExpense}`
}

// to getDateString
function getDateString(moment) {
    return moment.toLocaleDateString("en-US", {
        year:"numeric", 
        month:"long",
        day:"numeric"
    })
} 

// *** View Layer ***

// to return an HTML Format List
function createListItem({description,amount,moment}) {
    return `<li class="list-group-item d-flex justify-content-between">
        <div class="d-flex flex-column">
            ${description}
        <small class="text-muted">${getDateString(moment)}</small>
        </div>
        <div class="d-flex flex-row">
            <span class="px-5">
                Rs ${amount}
            </span>
            <button 
                type="button" 
                class="btn btn-outline-danger btn-sm"
                onclick="deleteExpense(${moment.valueOf()})"
            >
                <i class="fas fa-trash-alt"></i>
            </button>
        </div>
    </li>`
}

// to renderList
function renderList(arrOfList) {
    // Showing one allExpense as table in HTML
    const allExpenseHtml = arrOfList.map(exp => createListItem(exp))

    const joinAllExpenseHtml = allExpenseHtml.join("")
    expenseTableEl.innerHTML = joinAllExpenseHtml
}