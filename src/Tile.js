import React, { useState } from 'react';
import { Center, Flex, Box, Heading, Button, Input } from '@chakra-ui/react';

function Tile(props) {
  // let colorArray=["green","gray","yellow"]
  const [color, setColor] = useState(props.color);
  const [letter, setLetter] = useState(props.letter);
  const [rowValue, setRowValue] = useState(props.rowValue);
  const [columnValue, setColumnValue] = useState(props.columnValue);
  const handleChange = e => setLetter(e.target.value);

  return (
    <Flex>
      <Box
        width={'100px'}
        height={'100px'}
        flex="1"
        bg={color}
        p={3}
        color="black"
        borderColor="whiteAlpha.300"
      >
        <Center>
          {/* <Heading size='4xl'>{letter}</Heading> */}
          <Input
            htmlSize={1}
            width="auto"
            focusBorderColor="blue.500"
            size="lg"
            value={letter}
            onChange={e => handleChange(e)}
          />
        </Center>
      </Box>
    </Flex>
  );
}

export default Tile;
