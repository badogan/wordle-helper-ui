const fs = require("fs");

async function myFunction(file) {
  return new Promise((resolve) => {
    fs.open(file, "r", (err, file) => {
      if (err) throw err;
      resolve(
        new Promise((resolve) => {
          fs.readFile(file, (err, data) => {
            if (err) throw err;
            resolve(data.toString().split(/\r?\n/));
          });
        })
      );
    });
  });
}

function compliesToDisallowedList(word, disallowedArr) {
  if (
    disallowedArr.includes(word[0]) ||
    disallowedArr.includes(word[1]) ||
    disallowedArr.includes(word[2]) ||
    disallowedArr.includes(word[3]) ||
    disallowedArr.includes(word[4])
  ) {
    return false;
  } else {
    return true;
  }
}

// function compliesToMustIncludeList(word, mustIncludeArr, possiblePositionsArr) {
//   let result = false;
//   possiblePositionsArr.map((position) => {
//     if (mustIncludeArr.includes(word[parseInt(position)])) {
//       result = true;
//     }
//   });
//   return result;
// }

// function compliesToMustIncludeListVersion2(word, possibleLettersAndPositions) {
//   const keys = Object.keys(possibleLettersAndPositions);
//   //construct all potential combinations
//   return result;
// }

// function bringAllCombinations(possibleLettersAndPositions) {
//   const keys = Object.keys(possibleLettersAndPositions);
//   const numberOfCombinations = keys.reduce(
//     (sum, num) => sum * possibleLettersAndPositions[num].length,
//     1
//   );
//   let possibleCombinationsArr = Array(numberOfCombinations).fill("*****");

//   for (let i = 0; i < keys.length; i++) {
//     // for (let j=0;) {
//     //     possibleLettersAndPositions[keys[i]]
//     // }
//   }

//   return possibleCombinationsArr;
// }

// function bringReducedSet(possibleLettersAndPositions, disAllowedArr, allWords) {
//   let firstSet = [];
//   for (i = 0; i < allWords.length; i++) {
//     for (j = 0; j < disAllowedArr.length; j++) {
//       if (!allWords[i].includes(disAllowedArr[j])) {
//         firstSet.push(allWords[i]);
//       }
//     }
//   }
// }

// function printList(fullListArr, previousDaysWordsArr) {
//   // at some point use this to print out potential ones AND indicate previous days/weeks words
// }

function compliesToMustIncludeListV3(word, possibleLettersAndPositions) {
  const keys = Object.keys(possibleLettersAndPositions);
  if (keys.length === 0) {
    return false;
  }
  for (i = 0; i < keys.length; i++) {
    let innerResult = false;
    for (j = 0; j < possibleLettersAndPositions[keys[i]].length; j++) {
      if (word[possibleLettersAndPositions[keys[i]][j]] === keys[i]) {
        //if it is positioned in one of those
        innerResult = true;
      }
    }
    if (!innerResult) {
      return false;
    }
  }
  return true;
}

async function bring5LetterWordsAsArray() {
  const myArr = await myFunction("words5-from-OSPD4");
  // console.log(myArr)
//   let reducedArr = [];
  // console.log("sample 5 letter word:",myArr[Math.floor(Math.random()*myArr.length)])
//   let previousDaysWordsArr = ["crimp", "knoll", "could", "skill"]; //skill added
  let disAllowedArr = Object.assign([], "arsbnchmv"); //list of disallowed letters pushed into an array
  let possibleLettersAndPositions = {
    o: [0,3],
    // i: [0, 3, 4],
  };
  const noYellow = Object.keys(possibleLettersAndPositions).length === 0;
  let potentialWords1 = [];
  // const reducedSet = bringReducedSet(possibleLettersAndPositions)
  for (let i = 0; i < myArr.length; i++) {
    //GREENs
    if (myArr[i][2] === "i" && myArr[i][4] === "e") {
      //NOT ALLOWEDs
      if (compliesToDisallowedList(myArr[i], disAllowedArr)) {
        //YELLOWs
        if (
          compliesToMustIncludeListV3(myArr[i], possibleLettersAndPositions) ||
          noYellow
        ) {
          potentialWords1.push(myArr[i]);
        }
      }
    }
  }
  // potentialWords1.map((word) => console.log(word));
  console.log(potentialWords1);
}

// function allLettersDifferent(word) {
//   const mySet2 = new Set([word[0], word[1], word[2], word[3], word[4]]);
//   return mySet2.size === word.length;
// }

// async function findFirstTryCandidates() {
//   const allWordsArr = await myFunction("words5-from-OSPD4");
//   //analyze starting letters and find best candidates
//   let allStartingLettersHash = {};
//   await allWordsArr.map((word) => {
//     if (allStartingLettersHash[word[0]]) {
//       allStartingLettersHash[word[0]]++;
//     } else {
//       allStartingLettersHash[word[0]] = 1;
//     }
//   });
//   // console.log(allStartingLettersHash)
//   //what are the 5 letter words with the most repeated first letter -
//   const sortedValuesArr = Object.values(allStartingLettersHash)
//     .sort(function (a, b) {
//       return a - b;
//     })
//     .reverse();
//   // console.log(sortedValuesArr)
//   const total = sortedValuesArr.reduce((sum, num) => sum + num, 0);
//   console.log(total);
//   let runningTotal = 0;
//   for (let i = 0; i < sortedValuesArr.length; i++) {
//     runningTotal = sortedValuesArr[i] + runningTotal;
//     console.log(runningTotal / total, " : ", sortedValuesArr[i]);
//   }
//   // >=466 covers more than 50% of the starting letters
//   let reducedTargetStartingLetters = [];
//   Object.entries(allStartingLettersHash).map((pair) => {
//     if (pair[1] >= 466) {
//       reducedTargetStartingLetters.push(pair[0]);
//     }
//   });
//   console.log(reducedTargetStartingLetters);
//   //best probable 5 letters as starting letter are : ['t', 'a', 'c','b', 's', 'p','d']
//   //lets find out the letters involved in words starting with ['t', 'a', 'c','b', 's', 'p','d']
//   let set2Hash = {};
//   let set2TargetArr = ["t", "a", "c", "b", "s", "p", "d"];
//   allWordsArr.map((word) => {
//     if (set2TargetArr.includes(word[0])) {
//       let currentLettersInQuestion = [word[1], word[2], word[3], word[4]];
//       currentLettersInQuestion.map((letter) => {
//         if (set2Hash[letter]) {
//           set2Hash[letter]++;
//         } else {
//           set2Hash[letter] = 1;
//         }
//       });
//     }
//   });
//   // console.log(set2Hash)
//   const sortedValuesArr2 = Object.values(set2Hash)
//     .sort(function (a, b) {
//       return a - b;
//     })
//     .reverse();
//   const total2 = sortedValuesArr2.reduce((sum, num) => sum + num, 0);
//   console.log(total2);
//   let runningTotal2 = 0;
//   for (let i = 0; i < sortedValuesArr2.length; i++) {
//     runningTotal2 = sortedValuesArr2[i] + runningTotal2;
//     console.log(runningTotal2 / total2, " : ", sortedValuesArr2[i]);
//   }
//   // >=1201 covers more than 50% of the starting letters
//   let reducedTargetLettersForPositionsTwoToFive = [];
//   Object.entries(set2Hash).map((pair) => {
//     if (pair[1] >= 1201) {
//       reducedTargetLettersForPositionsTwoToFive.push(pair[0]);
//     }
//   });
//   console.log(reducedTargetLettersForPositionsTwoToFive);
//   //find words that involve the most probable first letter and reducedTargetLettersForPositionsTwoToFive for the others
//   let targetWords = [];
//   let set3Hash = {};
//   allWordsArr.map((word) => {
//     if (set2TargetArr.includes(word[0])) {
//       if (
//         reducedTargetLettersForPositionsTwoToFive.includes(word[1]) ||
//         reducedTargetLettersForPositionsTwoToFive.includes(word[2]) ||
//         reducedTargetLettersForPositionsTwoToFive.includes(word[3]) ||
//         reducedTargetLettersForPositionsTwoToFive.includes(word[4])
//       ) {
//         let points = 0;
//         if (reducedTargetLettersForPositionsTwoToFive.includes(word[1]))
//           points++;
//         if (reducedTargetLettersForPositionsTwoToFive.includes(word[2]))
//           points++;
//         if (reducedTargetLettersForPositionsTwoToFive.includes(word[3]))
//           points++;
//         if (reducedTargetLettersForPositionsTwoToFive.includes(word[4]))
//           points++;
//         if (word[4] !== "s") {
//           set3Hash[word] = points;
//           if (allLettersDifferent(word) && points >= 4) {
//             targetWords.push(word);
//           }
//         }
//       }
//     }
//   });
//   console.log(targetWords);
// }

//open file, read the file, split per new line and assign words to an array
bring5LetterWordsAsArray();
// findFirstTryCandidates()
