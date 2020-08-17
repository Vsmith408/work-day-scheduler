const today = new Date()
const root = document.getElementById('root')

const formatDate = (date) => moment(date).format('dddd, MMMM Do')
const getHour = (date) => moment(date).format('hA')

document.getElementById('currentDay').textContent = formatDate(today)

for (let i = 9; i <= 17; i++) {
  const year = today.getFullYear()
  const month = today.getMonth()
  const day = today.getDate()

  const withHour = new Date(year, month, day, i)
  const hourString = getHour(withHour)

  let form = document.createElement('form')
  let startOfHour = moment().startOf('hour')
  let endOfHour = moment().endOf('hour')

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

  let hour = document.createElement('div')
  hour.className = 'col-1 hour'
  hour.textContent = hourString

  let textArea = document.createElement('textarea')
  textArea.className = 'col-10'
  textArea.placeholder = 'Enter Event'

  textArea.value = localStorage.getItem(hourString)

  let btn = document.createElement('button')
  btn.className = 'saveBtn col-1'
  btn.type = 'submit'

  let icon = document.createElement('i')
  icon.className = 'fas fa-lock'
  btn.appendChild(icon)

  form.appendChild(hour)
  form.appendChild(textArea)
  form.appendChild(btn)

  textArea.addEventListener('keypress', () => {
    icon.className = 'fas fa-unlock'
  })

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    localStorage.setItem(hourString, e.target[0].value)
    icon.className = 'fas fa-lock'
  })

  root.appendChild(form)
}
