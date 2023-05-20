function toolGenerateDisallowedArray(tempState) {
  //DONE - ACTION: return lowercase
  let disallowedArray = [];
  let greenArray = toolGenerateGreenLettersAndPositions(tempState).filter(el=>el!=='*').map(el=>el.toLowerCase())
  for (let indexI = 0; indexI < tempState.length; indexI++) {
    for (let indexJ = 0; indexJ < tempState[indexI].length; indexJ++) {
      if (tempState[indexI][indexJ].color === 1) {
          if (!greenArray.includes(tempState[indexI][indexJ].letter.toLowerCase())){
              disallowedArray.push(tempState[indexI][indexJ].letter);
          }
      }
    }
  }
  let result = [...new Set(disallowedArray)];
  
  console.log(
    'result: ',
    result.map(el => el.toLowerCase())
  );
  return result.map(el => el.toLowerCase());
}

function toolGenerateGreenLettersAndPositions(tempState) {
  // DONE - ACTION: return lowercase
  let lastRow = tempState[tempState.length - 1];
  let result = Array(5).fill('*');
  for (let indexJ = 0; indexJ < lastRow.length; indexJ++) {
    if (lastRow[indexJ].color === 0) {
      result[indexJ] = lastRow[indexJ].letter.toLowerCase();
    }
  }
  console.log('generateCertainLettersAndPositions: ', result);
  return result;
}

function convertKeysToLowercase(combinations){
    let combinationsUpdated={}
    Object.keys(combinations).forEach(el=>{
        combinationsUpdated[el.toLowerCase()]=combinations[el]
    })
    return combinationsUpdated
}

function toolGeneratePossibleLettersAndCombinations(tempState) {
  // DONE-ACTION: return lowercase
  let combinations = {};
  for (let indexI = 0; indexI < tempState.length; indexI++) {
    for (let indexJ = 0; indexJ < tempState[indexI].length; indexJ++) {
      if (tempState[indexI][indexJ].color === 2) {
        if (combinations[tempState[indexI][indexJ].letter]) {
          combinations[tempState[indexI][indexJ].letter] = combinations[
            tempState[indexI][indexJ].letter
          ].filter(item => item !== indexJ);
        } else {
          combinations[tempState[indexI][indexJ].letter] = [
            0, 1, 2, 3, 4,
          ].filter(item => item !== indexJ);
        }
      }
    }
  }
  let greenArray = toolGenerateGreenLettersAndPositions(tempState).map(el =>
    el.toUpperCase()
  );
  if ([...new Set(greenArray)].length === 1) {
    console.log('combinations: ', convertKeysToLowercase(combinations));
    return convertKeysToLowercase(combinations);
  }
  //collect the green letters
  let greenLetters = greenArray.filter(letter => letter !== '*');
  //remove those letters - key-value pairs
  let combinationsProcessedStep1 = {};
  Object.keys(combinations).map(key => {
    if (!greenLetters.includes(key)) {
      combinationsProcessedStep1[key] = combinations[key];
    }
  });
  console.log('combinationsProcessedStep1: ', combinationsProcessedStep1);
  //collect the indexes where they are green
  let greenIndicies = [];
  greenArray.map((greenLetter, index) => {
    if (greenLetter !== '*') {
      greenIndicies.push(index);
    }
  });
  console.log('greenIndicies: ', greenIndicies);
  //remove those indicies from the keys
  let combinationsProcessedStep2 = {};
  let collectedKeys = Object.keys(combinationsProcessedStep1);

  collectedKeys.forEach(key => {
    combinationsProcessedStep2[key.toLowerCase()] = combinationsProcessedStep1[
      key
    ].filter(item => greenIndicies.includes(item) === false);
  });
  console.log('combinationsProcessedStep2: ', combinationsProcessedStep2);
  return combinationsProcessedStep2;
}

//ASYNC FETCH RELATED
const postWithoutAuth = (url, obj) => {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(obj),
    });
  };
//

export {
  toolGenerateDisallowedArray,
  toolGenerateGreenLettersAndPositions,
  toolGeneratePossibleLettersAndCombinations,
  postWithoutAuth
};
