import React from 'react';
import { Container, Box } from '@mui/material';
import TrailList from '../components/TrailList';
import Footer from '../components/Footer';

const Home: React.FC = () => {
    return (
        <>
            <Container>
                <Box my={4}>
                    <TrailList />
                </Box>
            </Container>
            <Footer />
        </>
    );
};

export default Home;
