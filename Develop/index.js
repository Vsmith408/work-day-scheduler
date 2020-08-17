// accessing the container from HTML and storing it to a variable
const root = document.getElementById('root')

/**
 * accessing moment and formatting the date to Weekday , Month day
 * @param {Date} date
 */
const formatDate = (date) => moment(date).format('dddd, MMMM Do')
/**
 * accessing moment to format the time to hours and setting it to AM or PM
 * @param {Date} date
 */
const getHour = (date) => moment(date).format('hA')

// setting today to equal todays date
const today = new Date()
//  setting the html element with the id of 'currentDay' to todays date
document.getElementById('currentDay').textContent = formatDate(today)

// looping through each hour of the day (9am - 5pm)
for (let i = 9; i <= 17; i++) {
  // setting year to the current four digit year
  const year = today.getFullYear()
  // setting month to the current month
  const month = today.getMonth()
  // setting day to the current number date
  const day = today.getDate()

  // withHour equals the current hour(i) of the current day
  const withHour = new Date(year, month, day, i)
  // setting the returned value of getHour to a string
  const hourString = getHour(withHour)

  // create an html form
  let form = document.createElement('form')

  // startOfHour equals the top of the current hour (if its 3:15 , startOfHour = 3:00)
  let startOfHour = moment().startOf('hour')
  // endOfHour equals the bottom of the current hour (if its 3:15 , endOfHour = 3:59)
  let endOfHour = moment().endOf('hour')

  // setting the past present or future tense to the events
  let tense = ''
  if (moment(withHour).isAfter(endOfHour)) {
    tense = 'future'
  } else if (
    moment(withHour).isBetween(startOfHour, endOfHour) ||
    moment(withHour).isSame(startOfHour)
  ) {
    tense = 'present'
  } else {
    tense = 'past'
  }
  form.className = `row time-block ${tense}`

  // create HTML div element, adding a class name of 'col-1 hour' and setting the HTML text content to the hourString var
  let hour = document.createElement('div')
  hour.className = 'col-1 hour'
  hour.textContent = hourString

  // create HTML textarea element, adding a class name of 'col-10' and setting the placeholder val to "Enter Event"
  let textArea = document.createElement('textarea')
  textArea.className = 'col-10'
  textArea.placeholder = 'Enter Event'
  // setting the value of the textarea to local storage stored value for the current hour
  textArea.value = localStorage.getItem(hourString)

  // create HTMl btn element , give it a class name , and define it's type as submit
  let btn = document.createElement('button')
  btn.className = 'saveBtn col-1'
  btn.type = 'submit'

  // create icon element, give it a class name, append icon to button
  let icon = document.createElement('i')
  icon.className = 'fas fa-lock'
  btn.appendChild(icon)

  // appending all aspects of the row to the form , this way it will show on page
  form.appendChild(hour)
  form.appendChild(textArea)
  form.appendChild(btn)

  // on the press of a key inside the textarea change lock icon to unlock
  textArea.addEventListener('keypress', () => {
    icon.className = 'fas fa-unlock'
  })

  // on submit (click of button) prevent default event, then set the text to local storage with the correct hour
  // change unlock icon back to the lock icon
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    localStorage.setItem(hourString, e.target[0].value)
    icon.className = 'fas fa-lock'
  })

  // appending the form to the container (so it shows on the page)
  root.appendChild(form)
}
