import { Box } from '@chakra-ui/layout'
import { SimpleGrid } from '@chakra-ui/layout'
import React from 'react'

const GridProductos = ({ category, data }) => {

    const alimento = data[0].alimento
    const accessories = data[1].accessories
    const toys = data[2].toys

    const productos = []

    alimento.map(p => {
        productos.push(p)
    })

    accessories.map(p => {
        productos.push(p)
    })

    toys.map(p => {
        productos.push(p)
    })


    function shuffleArray(inputArray) {
        inputArray.sort(() => Math.random() - 0.5);
    }

    shuffleArray(productos);

    return (
        <>
            <h1>{category}</h1>
            <SimpleGrid minChildWidth="120px" spacing="40px">
                {productos.map((m, index) => {
                    return (
                        <Box key={index}>
                            <h3>{m.name}</h3>
                            <img src={m.img_url} />
                        </Box>
                    )
                })}
            </SimpleGrid>
        </>
    )
}

export default GridProductos
