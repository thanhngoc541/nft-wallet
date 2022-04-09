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
export default function ObjectDetails(props) {
    console.log(props);
    const calcDims = (object) => {
        object.calcDims = [
            object.dims[0] * object.customScale,
            object.dims[1] * object.customScale,
            object.dims[2] * object.customScale,
        ];
    };
    return (
        <SwipeableDrawer
            hideBackdrop={true}
            anchor={'right'}
            open={props.object != null && props.mode == 'edit'}
            onClose={() => {
                props.clearFocused();
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
                    Details
                </Typography>
                <Box component="form" noValidate onSubmit={() => {}} sx={{ mt: 2, width: '500px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography id="scale" gutterBottom>
                                Scale
                            </Typography>
                            <Slider
                                onChange={(e) => {
                                    props.object.customScale = e.target.value;
                                    calcDims(props.object);
                                }}
                                min={0.1}
                                max={2}
                                step={0.1}
                                defaultValue={props.object?.customScale ?? 1}
                                aria-label="scale"
                                valueLabelDisplay="auto"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography id="rotation" gutterBottom>
                                Rotation
                            </Typography>
                            <Slider
                                onChange={(e) => {
                                    props.object.customRotationY = e.target.value;
                                }}
                                min={-180}
                                max={180}
                                step={1}
                                defaultValue={props.object?.customRotationY ?? 0}
                                aria-label="rotation"
                                valueLabelDisplay="auto"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        color="error"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 0 }}
                        onClick={props.deleteFocused}
                    >
                        Delete
                    </Button>
                    <Button fullWidth variant="contained" sx={{ mt: 3, mb: 0 }} onClick={props.clearFocused}>
                        OK
                    </Button>
                </Box>
            </Box>
        </SwipeableDrawer>
    );
}
