import React from 'react'
import CarouselSwipeableTextMobileStepper from '../../components/home/CarouselSwipeableTextMobileStepper';
import NabBarMiniVariantDrawer from '../sideBar/NabBarMiniVariantDrawer';
import styled from 'styled-components'

const StyledDivTabs = styled.div`
    display:flex; 
    justify-content:center;
    margin-right: 1px;  
    margin-left: 72px;

    @media (min-width: 320px) and (max-width: 480px) {
        margin-left: 58px;
    }
`

const Home = () => {

    return (
        <>
            <CarouselSwipeableTextMobileStepper />
            <NabBarMiniVariantDrawer />
            <StyledDivTabs>
            <TabScrollButton />
            </StyledDivTabs>
            
        </>
    )
}

export default Home
