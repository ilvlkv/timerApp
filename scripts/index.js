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
    input_field.setAttribute('type', 'datetime-local'),
      setMinimalAppropriateDate();
  } else {
    input_field.setAttribute('type', 'date'), setMinimalAppropriateDate();
  }
}

// App Engine

//Engine variables
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

  start_timer() {
    const relative_elem = document.getElementById(this.id);
    const output = relative_elem.querySelector('.time');

    const end_date = parseISO(this.date);

    let timer = setInterval(function () {
      const start_date = new Date();

      if (start_date == end_date) {
        clearInterval(timer);
      } else {
        let time = intervalToDuration({
          start: start_date,
          end: end_date,
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

  const id_value = generateToken(32);

  const newTimer = new Timer(name_value, date_value, id_value);

  data.push(newTimer);
  newTimer.block_render();
  newTimer.start_timer();
}

function generateToken(length) {
  var a =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('');
  var b = [];
  for (var i = 0; i < length; i++) {
    var j = (Math.random() * (a.length - 1)).toFixed(0);
    b[i] = a[j];
  }
  return b.join('');
}

// Default resets

document.addEventListener('DOMContentLoaded', setMinimalAppropriateDate);

function setMinimalAppropriateDate() {
  const input_attribute_value = input_field.getAttribute('type');

  const current_date_value = new Date().toJSON().slice(0, 10);
  const current_datetime_value = new Date().toJSON().slice(0, 16);

  if (input_attribute_value == 'date') {
    return input_field.setAttribute('min', current_date_value);
  } else {
    return input_field.setAttribute('min', current_datetime_value);
  }
}
