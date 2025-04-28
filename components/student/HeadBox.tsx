import { Student } from '@/api/interfaces/Student'
import { Avatar, Box, HStack } from '@chakra-ui/react'
import React from 'react'

const HeadBox = (Student:Student) => {
  return (
    <Box>
        <HStack spaceX="10px">
            <Box w='40px' h='40px' bg='yellow.200'>
                <Avatar.Root>
                          <Avatar.Fallback name="Damigu Djagbaré" />
                          <Avatar.Image src={`../studentPics/${Student.number}.jfif`} />
                </Avatar.Root>
            </Box>
            <Box w='40px' h='40px' bg='tomato'>
                2
            </Box>
        </HStack>
    </Box>
  )
}

export default HeadBox