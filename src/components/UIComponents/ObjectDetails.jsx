import React, {useState} from 'react';
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
import TextureList from "./TextureList";
export default function ObjectDetails(props) {
    const texture = [
        {
            name: 'img_1',
            value: 'texture/img_1/texture.jpg'
        },
        {
            name: 'img_2',
            value: 'texture/img_2/texture.jpg'
        },
        {
            name: 'vid_1',
            value: 'texture/vid_1/texture.jpg'
        },
        {
            name: 'vid_2',
            value: 'texture/vid_2/texture.jpg'
        },
        {
            name: 'vid_3',
            value: 'texture/vid_3/texture.jpg'
        },
        {
            name: 'vid_4',
            value: 'texture/vid_4/texture.jpg'
        },
    ]

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
                                    props.scaleObject(e.target.value);
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
                                    props.rotateObject(e.target.value);
                                }}
                                min={-180}
                                max={180}
                                step={1}
                                defaultValue={props.object?.customRotationY ?? 0}
                                aria-label="rotation"
                                valueLabelDisplay="auto"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography id="add_nft" gutterBottom>
                                Add NFT
                            </Typography>
                            <TextureList
                                texture={texture}
                                handleAddTexture={props.handleAddTexture}
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
