import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';
import ConstructionIcon from '@mui/icons-material/Construction';
import WallCreator from './WallCreator';
import AddModel from './AddModel';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import EditOffIcon from '@mui/icons-material/EditOff';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
export default function FloatingActionButtons(props) {
    const [openWallCreator, setOpenWallCreator] = useState(false);
    const [openAddModel, setOpenaddModel] = useState(false);
    return (
        <Box style={{ position: 'absolute', bottom: '10px', right: '10px' }} sx={{ '& > :not(style)': { m: 1 } }}>
            <SwipeableDrawer
                anchor={'right'}
                open={openAddModel}
                onClose={() => setOpenaddModel(false)}
                onOpen={() => setOpenaddModel(true)}
            >
                <AddModel addModel={props.addModel} close={() => setOpenaddModel(false)}></AddModel>
            </SwipeableDrawer>
            <Fab color="primary" aria-label="add furniture" onClick={() => setOpenaddModel(!openAddModel)}>
                <AddIcon />
            </Fab>
            <SwipeableDrawer
                anchor={'right'}
                open={openWallCreator}
                onClose={() => setOpenWallCreator(false)}
                onOpen={() => setOpenWallCreator(false)}
            >
                <WallCreator
                    createWallHandle={props.createWallHandle}
                    close={() => {
                        setOpenWallCreator(false);
                    }}
                ></WallCreator>
            </SwipeableDrawer>
            <Fab color="primary" aria-label="add wall" onClick={() => setOpenWallCreator(!openWallCreator)}>
                <ConstructionIcon />
            </Fab>
            <Fab
                color="primary"
                aria-label="edit mode"
                onClick={() => {
                    if (props.mode == 'edit') {
                        props.setMode('');
                    } else {
                        props.setMode('edit');
                    }
                }}
            >
                {props.mode == 'edit' ? <EditOffIcon></EditOffIcon> : <ModeEditIcon></ModeEditIcon>}
            </Fab>
            <Fab
                color="primary"
                aria-label="lock mode"
                onClick={() => {
                    if (props.mode == 'lock') {
                        props.setMode('');
                    } else {
                        props.setMode('lock');
                    }
                }}
            >
                {props.mode == 'lock' ? <LockOpenIcon></LockOpenIcon> : <LockIcon></LockIcon>}
            </Fab>
        </Box>
    );
}
