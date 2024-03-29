import { Spinner } from '@chakra-ui/react'

const Loading = () => {
    return <Spinner
        thickness='3px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='md'
    />
}

export default Loading;
