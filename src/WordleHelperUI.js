import React, { useState } from 'react';
import {
  Button,
  HStack,
  VStack,
  Flex,
  Input,
  Center,
  Stack,
  Heading,
  Badge,
} from '@chakra-ui/react';
// import Tile from './Tile';
import {
  toolGenerateDisallowedArray,
  toolGenerateGreenLettersAndPositions,
  toolGeneratePossibleLettersAndCombinations,
  postWithoutAuth,
} from './API/helperTools';

function WordleHelperUI() {
  let colorArray = ['green', 'gray', 'yellow'];
  let badgeColorSchemeColor = ['green','red','purple']
  // let lettersArray = Object.assign([], 'ABCDEFGHUTY');

  let initialRowState = [
    { letter: '', color: 1 },
    { letter: '', color: 1 },
    { letter: '', color: 1 },
    { letter: '', color: 1 },
    { letter: '', color: 1 },
  ];

  const [matrixState, setMatrixState] = useState([initialRowState]);
  const [possibleWords, setPossibleWords] = useState(null);
  const handleLetterChange = e => {
    // console.log('Target: ', e.target.name);
    let targetI = parseInt(e.target.name[1]);
    let targetJ = parseInt(e.target.name[2]);
    let tempState = [...matrixState];
    tempState[targetI][targetJ].letter = e.target.value.toUpperCase();
    setMatrixState(tempState);
  };

  const handleColorChange = e => {
    // console.log('Target: ', e.target.name);
    let targetI = parseInt(e.target.name[1]);
    let targetJ = parseInt(e.target.name[2]);
    let tempState = [...matrixState];
    tempState[targetI][targetJ]['color'] =
      (matrixState[targetI][targetJ].color + 1) % 3;
    setMatrixState(tempState);
  };

  const addRow = () => {
    let tempState = [...matrixState];
    let newRowState = [...initialRowState];
    for (let indexI = 0; indexI < tempState.length; indexI++) {
      for (let indexJ = 0; indexJ < tempState[indexI].length; indexJ++) {
        if (tempState[indexI][indexJ].color === 0) {
          newRowState[indexJ]['color'] = tempState[indexI][indexJ].color;
          newRowState[indexJ]['letter'] = tempState[indexI][indexJ].letter;
        }
      }
    }
    tempState.push(newRowState);
    setMatrixState(tempState);
  };

  const deleteLastRow = () => {
    let tempState = [...matrixState];
    tempState.pop();
    setMatrixState(tempState);
  };

  function generateDisallowedArray() {
    let tempState = [...matrixState];
    return toolGenerateDisallowedArray(tempState);
  }

  function generateGreenLettersAndPositions() {
    // DONE - ACTION: return lowercase
    let tempState = [...matrixState];
    return toolGenerateGreenLettersAndPositions(tempState);
  }

  function generatePossibleLettersAndCombinations() {
    // DONE-ACTION: return lowercase
    let tempState = [...matrixState];
    return toolGeneratePossibleLettersAndCombinations(tempState);
  }

  function providepossiblewords() {
    let disAllowedArr = generateDisallowedArray();
    let possibleLettersAndPositions = generatePossibleLettersAndCombinations();
    let greenArray = generateGreenLettersAndPositions();
    let generatedObj = {
      disAllowedArr,
      possibleLettersAndPositions,
      greenArray,
    };
    postWithoutAuth('http://localhost:3009/providepossiblewords', generatedObj)
      .then(response => response.json())
      .then(response => {
        console.log(response.result)
        setPossibleWords(response.result)
      });
  }

  function renderRows() {
    return (
      <React.Fragment>
        {matrixState.length !== 0 && (
          <VStack spacing={1}>
            {matrixState.map((elementI, indexI) => {
              return (
                <React.Fragment>
                  <HStack
                    key={((indexI + 1) * 1000).toString()}
                    spacing={1}
                    color="white"
                  >
                    {elementI.map((elementJ, indexJ) => {
                      return (
                        <Flex
                          key={((indexJ + 1) * 100).toString()}
                          width={'80px'}
                          height={'80px'}
                          flex="1"
                          bg={colorArray[elementJ.color]}
                          p={3}
                          color="black"
                          name={'b' + indexI.toString() + indexJ.toString()}
                          onClick={e => handleColorChange(e)}
                          borderColor="whiteAlpha.300"
                        >
                          <Center key={((indexJ + 11) * 100).toString()}>
                            <Input
                              key={(
                                (indexI + 1) * 10 +
                                (indexJ + 1)
                              ).toString()}
                              htmlSize={1}
                              width="auto"
                              borderColor={colorArray[elementJ.color]}
                              focusBorderColor="blue.800"
                              size="lg"
                              value={elementJ.letter}
                              name={'a' + indexI.toString() + indexJ.toString()}
                              onChange={e => handleLetterChange(e)}
                            />
                          </Center>
                        </Flex>
                      );
                    })}
                  </HStack>
                  {indexI === matrixState.length - 1 ? (
                    <Button
                      key={((indexI + 1) * 666).toString()}
                      onClick={() => addRow()}
                    >
                      Add new row
                    </Button>
                  ) : null}
                </React.Fragment>
              );
            })}
          </VStack>
        )}
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <VStack>
        {renderRows()}
        {matrixState.length !== 1 ? (
          <Button key={(1 * 777).toString()} onClick={() => deleteLastRow()}>
            Delete last row
          </Button>
        ) : null}
        {/* <Button onClick={() => generateDisallowedArray()}>
          Generate Disallowed Array
        </Button> */}
        {/* <Button onClick={() => generateGreenLettersAndPositions()}>
          Generate Green Letters
        </Button> */}
        {/* <Button onClick={() => generatePossibleLettersAndCombinations()}>
          Generate Yellow Letters
        </Button> */}
        <Button onClick={() => providepossiblewords()}>
          Provide possible words!
        </Button>
        {possibleWords && <Heading>{possibleWords.length}</Heading>}
        <Flex flexWrap={'wrap'} direction="row">
        {possibleWords && 
        possibleWords.map((el,index)=><Badge ml='1' fontSize='1.2em' colorScheme={badgeColorSchemeColor[index%3]} key={index}> {el} </Badge>)}
        </Flex>
      </VStack>
    </React.Fragment>
  );
}

export default WordleHelperUI;
