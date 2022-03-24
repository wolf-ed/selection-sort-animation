const randomizeBTN = document.getElementById('randomize');
const sortBTN = document.getElementById('sort');
let columns = document.querySelectorAll('.column')

let preventInterruption = false;

const randomNumbers = (number) => {
  let randomNumber = [];

  let compare = (arr, num) => {
    return arr.some(numb => num === numb)
  }

  for (let i = 0; i < number; i++) {
    let newValue = (Math.floor(Math.random() * number + 1));
    if (compare(randomNumber, newValue) || newValue === 0) {
      i--
    } else {
      randomNumber.push(newValue)
    }
  }

  return randomNumber
}

const randomize = () => {
  if (preventInterruption) {
    return
  }
  const random = randomNumbers(columns.length)
  for (let i = 0; i < 20; i++) {
    columns[i].style.height = `${+random[i] * 10}px`
  }
}

function setTimeOutCustom(milisec) {
  return new Promise(resolve => {
    setTimeout(() => { resolve('') }, milisec);
  })
}

const disableBTN = btnElement => {
  btnElement.disabled = true;
  btnElement.style.backgroundColor = 'rgb(87, 87, 87)';
}

const restoreBTN = btnElement => {
  btnElement.disabled = false;
  btnElement.style.backgroundColor = 'steelblue';
}

const toggleColumns = (col1, col2) => {

  let heightHolder = col1.style.height
  col1.style.height = col2.style.height
  col2.style.height = heightHolder
}

const selectionSort = async (arr) => {
  for (let i = 0; i < arr.length; i++) {
    let min = i

    for (let j = i + 1; j < arr.length; j++) {
      columns[j].style.backgroundColor = 'white';
      columns[i].style.backgroundColor = 'black';
      // columns[min].style.backgroundColor = 'rgb(46, 238, 20)';
      columns[min].style.backgroundColor = 'red';


      await setTimeOutCustom(100);
      columns[j].style.backgroundColor = 'aqua';
      columns[i].style.backgroundColor = 'aqua';
      columns[min].style.backgroundColor = 'aqua';
      if (arr[min].offsetHeight > arr[j].offsetHeight) {
        min = j
      }

    }
    if (i !== min) {
      toggleColumns(columns[i], columns[min])

    }

  }
}

const sortColumns = async () => {
  preventInterruption = true;
  disableBTN(randomizeBTN);
  disableBTN(sortBTN);

  await selectionSort(columns)

  restoreBTN(randomizeBTN);
  restoreBTN(sortBTN);
  preventInterruption = false;
}

randomizeBTN.addEventListener('click', randomize)
sortBTN.addEventListener('click', sortColumns)