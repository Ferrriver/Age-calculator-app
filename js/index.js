const dayInput = document.querySelector("#day-input");
const monthInput = document.querySelector("#month-input");
const yearInput = document.querySelector("#year-input");

const inputs = document.querySelectorAll("input");

const dayResult = document.querySelector("#day-result");
const monthResult = document.querySelector("#month-result");
const yearResult = document.querySelector("#year-result");

const labelDay = document.querySelector("#label-day");
const labelMonth = document.querySelector("#label-month");
const labelYear = document.querySelector("#label-year");

const invalidDay = document.querySelector("#invalid-day");
const invalidMonth = document.querySelector("#invalid-month");
const invalidYear = document.querySelector("#invalid-year");

const lengtMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
reset();
inputs.forEach((x) => {
    x.addEventListener("focus", (e) => {
        e.target.value = "";
        reset();
    })
})

function calculateAge () {

    const dayBirth = parseInt(dayInput.value);
    const monthBirth = parseInt(monthInput.value);
    const yearBirth = parseInt(yearInput.value);

    const actualDate = new Date();
    const actualYear = parseInt(actualDate.getFullYear());
    const actualMonth = parseInt(actualDate.getMonth()) + 1;
    const actualDay = parseInt(actualDate.getDate());

    // Actual data
    let age;
    let months;
    let days;

    let validDay;
    let validMonth;
    let validYear;
    let validData;

    // Check valid day
    if(dayBirth < 1 || dayBirth > 31) {
        validDay = false;
        dayInput.style.borderColor = "red";
        labelDay.style.color = "red";
        invalidDay.style.display = "inline";
    } else if (dayBirth > lengtMonth[monthBirth - 1]) {
        validDay = false;
        dayInput.style.borderColor = "red";
        labelDay.style.color = "red";
        invalidDay.style.display = "inline";
    } else {
        validDay = true;
        dayInput.style.borderColor = "";
    }

    // Check valid month
    if(monthBirth < 1 || monthBirth > 12) {
        validMonth = false;
        monthInput.style.borderColor = "red";
        labelMonth.style.color = "red";
        invalidMonth.style.display = "inline";
    } else {
        validMonth = true;
        monthInput.style.borderColor = "";
    }

    // Check valid year
    if(yearBirth > actualYear || yearBirth == 0) {
        validYear = false;
        yearInput.style.borderColor = "red";
        labelYear.style.color = "red";
        invalidYear.style.display = "inline";
    } else {
        validYear = true;
        yearInput.style.borderColor = "";
    }

    // Check valid data
    if (!validDay || !validMonth || !validYear) {
        validData = false;
    }
    else{
        validData = true;
    }


    // Calculate age
    if(validData) {
        age = actualYear - yearBirth;
        months = actualMonth - monthBirth;
        days = actualDay - dayBirth;
    

        if(months < 0 || months === 0 && days < 0){
            age--;
            months = 12 - Math.abs(months);
        }
        if (days < 0){
            months--;
            days = daysInMonth(yearBirth, monthBirth) - dayBirth + actualDay;
        }

        dayResult.innerHTML = `${days}`;
        monthResult.innerHTML = `${months}`;
        yearResult.innerHTML = `${age}`;
    }
}

function reset () {
    dayResult.innerHTML = "--";
    monthResult.innerHTML = "--";
    yearResult.innerHTML = "--";

    labelDay.style.color = "";
    labelMonth.style.color = "";
    labelYear.style.color = "";

    invalidDay.style.display = "none";
    invalidMonth.style.display = "none";
    invalidYear.style.display = "none";
}

function daysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
  }
  