var dateInput = document.querySelector("#input-bday");
var Output = document.querySelector("#output");
var BTN = document.querySelector("#show-btn");


function reverseStr(str) {
    var listOfChar = str.split('');
    var rev = listOfChar.reverse();
    var revStr = rev.join('');
    return revStr;

    /* OR 
    return str.split('').reverse().join('');*/
}

function isPalindrome(str) {
    var reverse = reverseStr(str);
    return (str === reverse);
}

function convertDateToStr(date) {
    var dateStr = { day: '', month: '', year: '' };
    if(date.day < 10){
        dateStr.day = '0' + date.day.toString();
    } else {
        dateStr.day = date.day.toString();
    }
    if(date.month < 10){
        dateStr.month = '0' + date.month.toString();
    } else {
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();
    return dateStr;
}

function getAllDateFormat(date) {
    var dateStr = convertDateToStr(date);
    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, yymmdd];
}

function checkPalindrome(date) {
    var listOfPalindromes = getAllDateFormat(date);
    var isPal = false;
    for(var i = 0; i<listOfPalindromes.length; i++) {
        if(isPalindrome(listOfPalindromes[i])) {
            isPal = true;
            break;
        }
    }
    return isPal;
}

function leapYear(year) {
    if(year % 400 === 0){
        return true;
    }
    if(year % 100 === 0){
        return false;
    }
    if(year % 4 === 0){
        return true;
    }
    return false;
}

function getNextDate(date){
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    
    if(month === 2){
        if(leapYear(year)) {
            if(day > 29){
                day = 1;
                month++;
            }
        }
        else{
            if(day > 28){
                day = 1;
                month++;
            }
        }
    } else {
        if(day > daysInMonth[month - 1]){
            day = 1;
            month++;
        }
    }
    if(month > 12){
        month = 1;
        year++;
    }
    return {day:day, month:month, year:year};
}

function getNextPalindrome(date) {
    var ctr = 0;
    var NextDate = getNextDate(date);
    while(1){
        ctr++;
        var a = checkPalindrome(NextDate);
        if(a){
            break;
        }
        NextDate = getNextDate(NextDate);
    }
    return [ ctr, NextDate];
}

function getPreviousDate(date){

}
function getPreviousPalindrome(date){

}

function clickHandler(e){
    var bdayStr = dateInput.value;
    if(bdayStr !== ''){
        var listOfDate = bdayStr.split('-');
        var date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        }
        var isPal = checkPalindrome(date);
        if(isPal){
            Output.innerText = "Yay!! Your birthday is a palindrome!!";
        }else{
            var [ctr, NextDate] = getNextPalindrome(date);
            Output.innerText = "Your birthday is not a palindrome!! \n The next palindrome date is "+NextDate.day+"-"+NextDate.month+"-"+NextDate.year+"."+"\n You missed it by "+ctr+" days.";
        }
    }
}

BTN.addEventListener("click",clickHandler);