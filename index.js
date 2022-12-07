let weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

let calendarDays = document.getElementById("days");

class Set {
  constructor(weight, reps) {
    this.weight = weight;
    this.reps = reps;
  }
}

class Exercise {
  constructor(name, sets = []) {
    this.name = name;
    this.sets = sets;
    this.workout = null;
  }

  setWorkout(workout) {
    this.workout = workout;
  }

  addSet(set) {
    this.sets[this.sets.length] = set;
  }

  removeSet() {
    this.sets.pop();
  }
}

class Workout {
  constructor(name) {
    this.name = name;
    this.exercises = new Map();
  }

  addExercise(exercise) {
    if (!this.exercises.has(exercise.name)) {
      this.exercises.set(exercise.name, exercise);
      exercise.setWorkout(this);
    }
    //this.exercises[this.exercises.length] = exercise;
  }

  removeExercise(name) {
    this.exercises.delete(name);
  }
}

class Day {
  constructor(date, workouts = []) {
    this.date = date;
    this.workouts = workouts;
  }

  addWorkout(workout) {
    this.workouts[this.workouts.length] = workout;
  }
}

class Days {
  constructor() {
    this.days = new Map();
    this.current = currentDay();
  }

  addDay(day) {
    this.days.set(day.date, day);
  }

  getDay(date) {
    return this.days.get(date);
  }

  setCurrent(date) {
    this.current = date;
  }

  getCurrent() {
    return this.days.get(this.current);
  }
}

/* __ IMPORTANT __ */
let workoutData = new Days();

/* ____ */

function currentDay() {
  return new Date().toDateString();
}

function removeTime(date) {
  return date.toDateString();
}

function generateDay(day = workoutData.getCurrent()) {
  let section = document.getElementById("workout-section");

  let header = document.createElement("h1");
  header.textContent = day.date;

  let workouts = document.createElement("div");
  workouts.className = "workouts";

  for (let i = 0; i < day.workouts.length; i++) {
    workouts.appendChild(generateWorkout(day.workouts[i]));
  }

  section.textContent = "";
  section.appendChild(header);
  section.appendChild(document.createElement("hr"));
  section.appendChild(workouts);

  /*
          <h1>December 6, 2022</h1>
          <hr />
          <div id="workouts"></div>
  */
}

function generateWorkout(workout) {
  let wrapper = document.createElement("div");
  wrapper.className = "workout";

  let header = document.createElement("h2");
  header.className = "header";
  header.textContent = workout.name;

  let span = document.createElement("span");

  let add = document.createElement("button");
  add.className = "icon-button";
  add.textContent = "+";
  add.onclick = () => {
    workout.addExercise(new Exercise("Exercise"));
    generateDay();
  };

  span.appendChild(add);
  header.appendChild(span);

  let exercises = document.createElement("div");
  exercises.className = "exercises";

  /*for (let i = 0; i < workout.exercises.length; i++) {
    exercises.appendChild(generateExercise(workout.exercises[i]));
  }*/
  for (let [key, value] of workout.exercises) {
    exercises.appendChild(generateExercise(value));
  }

  wrapper.appendChild(header);
  wrapper.appendChild(exercises);
  return wrapper;

  /*
            <div class="workout">
              <h2>Afternoon Workout</h2>
              <div class="exercises"></div>
            </div>
  */
}

function generateExercise(exercise) {
  let wrapper = document.createElement("div");
  wrapper.className = "exercise";

  let header = document.createElement("span");
  header.className = "header";

  let name = document.createElement("h3");
  name.textContent = exercise.name;

  let span = document.createElement("span");

  let del = document.createElement("button");
  del.className = "icon-button";
  del.textContent = "x";
  del.onclick = () => {
    exercise.workout.removeExercise(exercise.name);
    generateDay();
  };

  let remove = document.createElement("button");
  remove.className = "icon-button";
  remove.textContent = "-";
  remove.onclick = () => {
    exercise.removeSet();
    generateDay();
  };

  let add = document.createElement("button");
  add.className = "icon-button";
  add.textContent = "+";
  add.onclick = () => {
    exercise.addSet(new Set(99, 99));
    generateDay();
  };

  span.appendChild(del);
  span.appendChild(remove);
  span.appendChild(add);

  header.appendChild(name);
  header.appendChild(span);

  wrapper.appendChild(header);
  wrapper.appendChild(generateSets(exercise));

  /*
                  <span class="exercise-header">
                    <h3>Chest Press</h3>
                    <span>
                      <button class="delete">x</button>
                      <button class="remove">-</button>
                      <button class="add">+</button></span
                    ></span
                  >
  */

  return wrapper;
}

function generateSets(exercise) {
  let allSets = document.createElement("div");
  allSets.className = "sets";

  for (let i = 0; i < exercise.sets.length; i++) {
    let set = exercise.sets[i];

    let wrapper = document.createElement("span");
    wrapper.className = "set";

    let number = document.createElement("p");
    number.innerHTML = i + 1;

    let data = document.createElement("p");
    data.innerHTML = set.weight + "lb x " + set.reps;

    wrapper.appendChild(number);
    wrapper.appendChild(data);

    allSets.appendChild(wrapper);
  }

  return allSets;

  /*
  
                    <span class="set">
                      <p>1</p>
                      <p>105lbs x 10</p></span
                    >
  */
}

function populateCalendar() {
  while (calendarDays.firstChild) {
    calendarDays.removeChild(calendarDays.firstChild);
  }

  let now = new Date();
  let firstDay = new Date(now.getFullYear(), now.getMonth(), 1);

  for (let i = 0; i < firstDay.getDay() - 1; i++) {
    let empty = document.createElement("span");
    empty.className = "date";
    empty.innerHTML = "";
    calendarDays.appendChild(empty);
  }

  for (let i = 1; i <= daysInMonth(now.getMonth(), now.getFullYear()); i++) {
    let date = document.createElement("button");
    date.className = "date";
    date.innerHTML = i;

    if (i === now.getDate()) {
      date.id = "current-date";
    }

    calendarDays.appendChild(date);
  }
}

function daysInMonth(month, year) {
  var date = new Date(year, month);
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

populateCalendar();

function magic() {
  var ex1 = new Exercise("test");
  var set1 = new Set(150, 10);
  var set2 = new Set(150, 10);
  var set3 = new Set(150, 10);
  var set4 = new Set(150, 10);

  ex1.addSet(set1);
  ex1.addSet(set2);
  ex1.addSet(set3);
  ex1.addSet(set4);

  var ex2 = new Exercise("testIGINGING");
  var set11 = new Set(90, 10);
  var set21 = new Set(80, 10);
  var set31 = new Set(90, 8);
  var set41 = new Set(90, 8);

  ex2.addSet(set11);
  ex2.addSet(set21);
  ex2.addSet(set31);
  ex2.addSet(set41);

  let wk = new Workout("Workout");
  wk.addExercise(ex1);
  wk.addExercise(ex2);

  let day = new Day(currentDay());
  day.addWorkout(wk);

  workoutData.addDay(day);

  generateDay(workoutData.getDay(day.date));
}
magic();
