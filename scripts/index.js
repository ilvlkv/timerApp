// imports

import { intervalToDuration } from 'date-fns';
import { parseISO } from 'date-fns';

// Interface elements
const time_include_flag = document.getElementById('time_flag');
const countdown_sumbit_btn = document.querySelector('.form__submit-btn');
const input_field = document.querySelector('.form__date-input');

// Interface triggers
time_include_flag.addEventListener('click', showTimePicker);
countdown_sumbit_btn.addEventListener('click', createNewTimer);

// Interface functionality
function showTimePicker() {
  const attribute_value = input_field.getAttribute('type');
  if (attribute_value == 'date') {
    input_field.setAttribute('type', 'datetime-local');
  } else {
    input_field.setAttribute('type', 'date');
  }
}

// App Engine

//Engine variables
let last_generated_token = null;
const data = [];

class Timer {
  constructor(name, date, id) {
    this.name = name;
    this.date = date;
    this.id = id;
  }

  block_render() {
    const relative_elem = document.querySelector('.timers-list');

    let card__div = document.createElement('div');
    card__div.className = 'timer-card';
    card__div.id = this.id;

    let card__info = document.createElement('div');
    card__info.className = 'timer-card__info';

    let timer__name = document.createElement('p');
    timer__name.className = 'timer-card__name';
    timer__name.innerHTML = this.name;

    let text = document.createElement('p');
    text.innerHTML = 'Time left (h/m/s):';

    let time = document.createElement('p');
    time.className = 'time';
    time.innerHTML = '-';

    card__info.appendChild(timer__name);
    card__info.appendChild(text);
    card__info.appendChild(time);

    let card__btn = document.createElement('button');
    card__btn.className = 'timer-card__button';
    card__btn.addEventListener('click', () => {
      const current_elem = document.querySelector('.timer-card:hover');
      const relative_elem = current_elem.parentNode;

      relative_elem.removeChild(current_elem);
    });

    card__div.appendChild(card__info);
    card__div.appendChild(card__btn);

    relative_elem.append(card__div);
  }

  startTimer() {
    const relative_elem = document.getElementById(this.id);
    const output = relative_elem.querySelector('.time');

    const date = parseISO(this.date);
    let start_Date = new Date();

    let timer = setInterval(function () {
      if (start_Date == date) {
        clearInterval(timer);
      } else {
        let time = intervalToDuration({
          start: new Date(),
          end: date,
        });
        output.innerHTML = `Years: ${time.years}, Month: ${time.months}, Days: ${time.days}, Hours: ${time.hours}, Minutes: ${time.minutes}, Seconds: ${time.seconds}`;
      }
    }, 1000);
  }
}

//Engine functions

function createNewTimer() {
  let name_value = document.querySelector('.form__name-input').value;
  let date_value = document.querySelector('.form__date-input').value;

  if (!name_value) {
    name_value = 'Unknown event';
  }

  if (input_field.getAttribute('type') == 'date') {
    date_value = `${date_value}T00:00:00`;
  } else {
    date_value = `${date_value}:00`;
  }

  const id_value = generate_token(32);

  const newTimer = new Timer(name_value, date_value, id_value);

  data.push(newTimer);
  newTimer.block_render();
  newTimer.startTimer();

  console.log(data);

  return (last_generated_token = id_value);
}

function generate_token(length) {
  var a =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('');
  var b = [];
  for (var i = 0; i < length; i++) {
    var j = (Math.random() * (a.length - 1)).toFixed(0);
    b[i] = a[j];
  }
  return b.join('');
}
