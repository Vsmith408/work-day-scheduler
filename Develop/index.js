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

  const isPast = moment(withHour).isBefore(today)
  let form = document.createElement('form')
  form.className = 'row time-block past'

  let hour = document.createElement('div')
  hour.className = 'col-1 hour'
  hour.textContent = getHour(withHour)

  let textArea = document.createElement('textarea')
  textArea.className = 'col-10'
  textArea.placeholder = 'Enter Event'

  let btn = document.createElement('button')
  btn.className = 'saveBtn col-1'
  btn.type = 'submit'

  let icon = document.createElement('i')
  icon.className = 'fas fa-lock'
  btn.appendChild(icon)

  form.appendChild(hour)
  form.appendChild(textArea)
  form.appendChild(btn)

  form.addEventListener('submit', (e) => {
    e.preventDefault()

    console.log(e.target[0].value)
  })

  root.appendChild(form)

  // every iteration gets html rendered
  /**
    <form class="row time-block past">
        <div class="col-1 hour">9AM</div>
        <textarea name="textarea" placeholder="Past Event" aria-label="Past Event" class="col-10"></textarea>
        <button class="saveBtn col-1" type="submit"><i class="fas fa-lock"></i></button>
    </form>
   */
  // form gets on submit handler, prevent default
  // on submit of form update object at time with textarea value, save to localsorage

  console.log(getHour(withHour), formatDate(today))
}
