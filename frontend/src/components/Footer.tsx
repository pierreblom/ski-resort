import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
    return (
        <Box mt={5} py={3} textAlign="center" bgcolor="primary.main" color="white">
            <Typography variant="body2">
                © 2024 Ski Trip Manager. All rights reserved.
            </Typography>
        </Box>
    );
};

export default Footer;
