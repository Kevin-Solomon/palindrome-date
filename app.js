let dateInput = document.querySelector('#bday-input')
let outputDiv = document.querySelector('#output')
document.addEventListener('submit',submitHandler)
function submitHandler(e){
  e.preventDefault();
  console.log(typeof dateInput.value)
  if(dateInput.value!==''){
  let listOfDate = dateInput.value.split('-')
  let date = {
    day: Number(listOfDate[2]),
    month: Number(listOfDate[1]),
    year: Number(listOfDate[0])
  };
  console.log(date)
  let isPalindrome = palindromeCheckForAllDates(date)
  console.log(isPalindrome)
  if(isPalindrome){
    outputDiv.innerText="Yes , your birthday is a palindrome date"
  }else{
    let [counter,nextPalindromeDate] = getNextPalindromeDate(date)
    console.log(counter)
    outputDiv.innerText=`Sorry the next palindrome date is ${nextPalindromeDate.day}-${nextPalindromeDate.month}-${nextPalindromeDate.year} ,you missed it by ${counter} days!`
    console.log(counter,nextPalindromeDate)
  }
  }
}
function reverseStr(str){
  let listOfChars=str.split('')
  let reverse=listOfChars.reverse().join('')
  return reverse
}
function isPalindrome(str){
  let reverse = reverseStr(str)
  return str===reverse
}
function dateToString(date){
  console.log(date)
  let dateStr = {day:'',month:'',year:''}
  if(date.day<10){
    dateStr.day = '0'+date.day
  }
  else{
    dateStr.day=date.day.toString()
  }
  if(date.month<10){
    dateStr.month = '0'+date.month
  }
  else{
    dateStr.month=date.month.toString()
  }
  dateStr.year=date.year.toString()
  return dateStr
}
function getAllDateFormats(date){
  console.log(date)
  let dateStr = dateToString(date)
  let ddmmyyyy = dateStr.day+dateStr.month+dateStr.year
  let yyyymmdd =dateStr.year+dateStr.month+dateStr.day
  let mmddyyyy = dateStr.month+dateStr.day+dateStr.year
  let ddmmyy = dateStr.day+dateStr.month+dateStr.year.slice(-2)
  let mmddyy = dateStr.month+dateStr.day+dateStr.year.slice(-2)
  let yymmdd = dateStr.year.slice(-2)+dateStr.month+dateStr.day
  return [ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd]
}
function palindromeCheckForAllDates(date){
  console.log(date)
  let dateArr = getAllDateFormats(date)
  let flag=false
  for(let i=0;i<dateArr.length;i++){
    if(isPalindrome(dateArr[i])){
      flag=true
      break
    }
  }
  return flag
}
function leapYearCheck(year){
  if(year%400===0){
    return true
  }
  if(year%4===0){
    return true
  }
  if(year%100===0){
    return false
  }
  return false
}
function getNextDate(date){
  let day = date.day+1
  let month = date.month
  let year = date.year
  let daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31]
  if(month==2){
    if(leapYearCheck(year)){
      if(day>29){
        day=1
        month++
      }
    }
    else{
      if(day>28){
        day=1
        month++
      }
    }
  }else{
    if(day>daysInMonth[month-1]){
      day=1
      month++
    }
  }
  if(month>12){
    month=1
    year++
  }
  return{
    day:day,
    month:month,
    year:year
  }
}
function getNextPalindromeDate(date){
  console.log(date)
  let ctr=0
  let nextDate = getNextDate(date)
  console.log(nextDate)
  while(true){
    ctr++;
    let isPalindrome=palindromeCheckForAllDates(nextDate)
    if(isPalindrome){
      break
    }
    nextDate=getNextDate(nextDate)
  }
  return [ctr,nextDate]
}