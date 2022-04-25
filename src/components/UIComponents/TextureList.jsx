import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

export default function TextureList(props) {
    console.log("DEBUG: texture ",props.texture )
    let itemModel = [];
    for (let i = 0; i < props.texture.length; i++) {
        itemModel.push({
            root: `texture/${props.texture[i].name}`,
            img: `texture/${props.texture[i].name}/thumbnail.png`,
            title: `${props.texture[i].name}`,
        });
    }
    const handleAdd = async (item) => {
       console.log('DEBUG: handle add texture ', item)
        props.handleAddTexture(item);
    };
    return (
        <ImageList sx={{ width: 400, height: 300}}>
            {itemModel.map((item) => (
                <ImageListItem cols={1} rows={1} key={item.img}>
                    <img
                        src={process.env.PUBLIC_URL + `${item.img}?w=248&fit=crop&auto=format`}
                        srcSet={process.env.PUBLIC_URL + `${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.title}
                        loading="lazy"
                    />
                    <ImageListItemBar
                        title={item.title}
                        // subtitle={item.author}
                        actionIcon={
                            <IconButton
                                onClick={() => handleAdd(item)}
                                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                aria-label={`info about ${item.title}`}
                            >
                                <AddIcon />
                            </IconButton>
                        }
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
}
