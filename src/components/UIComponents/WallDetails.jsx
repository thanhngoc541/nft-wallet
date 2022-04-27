import React from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
export default function WallDetails({ wall, mode, clearFocused }) {
    return (
        <SwipeableDrawer
            hideBackdrop={true}
            anchor={'right'}
            open={wall != null && mode == 'edit wall'}
            onClose={() => {
                clearFocused();
            }}
            onOpen={() => {}}
        >
            <Box
                sx={{
                    paddingTop: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '100vh',
                }}
            >
                <Typography component="h1" variant="h5">
                    Wall Editor
                </Typography>
                <Box component="form" noValidate onSubmit={() => {}} sx={{ mt: 2, width: '500px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <label className="label3" htmlFor="color">
                                Color:
                            </label>
                            <input
                                type="color"
                                id="color"
                                name="color"
                                onChange={(e) => {
                                    wall.color = e.target.value;
                                }}
                                value={wall?.color}
                            />
                        </Grid>
                    </Grid>
                    <Button fullWidth variant="contained" sx={{ mt: 3, mb: 0 }} onClick={clearFocused}>
                        OK
                    </Button>
                </Box>
            </Box>
        </SwipeableDrawer>
    );
}
