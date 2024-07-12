// Your code here
function createEmployeeRecord([firstName,familyName, title, payPerHour, timeInEvents, timeOutEvents]){
        return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents : [],
        timeOutEvents : []
     
    };
}

//create multiple employee records
function createEmployeeRecords(records){
    return records.map(record => createEmployeeRecord(record));
}

// Function to create a time-in event
function createTimeInEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    employee.timeInEvents.push({ type: 'TimeIn', hour: parseInt(hour, 10), date });
    return employee;
}
// Function to create a time-out event
function createTimeOutEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    employee.timeOutEvents.push({ type: 'TimeOut', hour: parseInt(hour, 10), date });
    return employee;
}
//hours worked on a given date
function hoursWorkedOnDate(employee,date){
    const timeIn = employee.timeInEvents.find(event => event.date === date);
    const timeOut = employee.timeOutEvents.find(event => event.date ==date);
    return (timeOut.hour - timeIn.hour)/100;
}
//fn tyhat calculates wages earned on a specific  date.
function wagesEarnedOnDate(employee, date) {
    const hours = hoursWorkedOnDate(employee, date);
    return hours * employee.payPerHour;
}

// Function to calculate total wages for an employee
function allWagesFor(employee) {
    const dates = employee.timeInEvents.map(event => event.date);
    return dates.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0);
}

// Function to calculate payroll for all employees
function calculatePayroll(employees) {
    return employees.reduce((total, employee) => total + allWagesFor(employee), 0);
}

// Sample Data
const employeeData = [
    ["John", "Doe", "Manager", 50],
    ["Jane", "Smith", "Developer", 40]
];

const employees = createEmployeeRecords(employeeData);
console.log(employees);

createTimeInEvent(employees[0], "2024-07-12 0900");
createTimeOutEvent(employees[0], "2024-07-12 1700");

console.log(hoursWorkedOnDate(employees[0], "2024-07-12"));
console.log(wagesEarnedOnDate(employees[0], "2024-07-12"));
console.log(allWagesFor(employees[0]));
console.log(calculatePayroll(employees)); 