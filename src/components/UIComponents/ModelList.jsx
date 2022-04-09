import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import AddIcon from '@mui/icons-material/Add';
import ObjectModel from '../../models/object';
export default function ModelList(props) {
  let itemModel = [];
  for(let i=1;i<=props.number;i++) {
      itemModel.push({
        root:`/${props.name}_${i}`,
        img: `/${props.name}_${i}/scene.png`,
        title: `${props.name} ${i}`,
        // author: '@bkristastucchio',
      })
  }
  const handleAdd =async (item)=>{
    var data = await fetch(process.env.PUBLIC_URL+`${item.root}/model.json`)
    .then(response => response.json()).catch(e=>console.error(e))
    console.log(data);
      props.addModel(new ObjectModel(`${item.root}/scene.gltf`, [0, data?.dims!=null ? data?.dims[1]/2:1, 0],
       data?.scale??[0.01,0.01,0.01],data?.dims??[1,1,1], data?.offset??[0,0,0],data?.mass,data?.lockX,data?.lockY,data?.lockZ,data?.rotation));
      props.close()}
  return (
    <ImageList sx={{ width: 500, height: '80vh' }}>
      {itemModel.map((item) => (
        <ImageListItem cols={1} rows={1} key={item.img}>
          <img
            src={process.env.PUBLIC_URL+`${item.img}?w=248&fit=crop&auto=format`}
            srcSet={process.env.PUBLIC_URL+`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.title}
            // subtitle={item.author}
            actionIcon={
              <IconButton
                onClick={()=>handleAdd(item)}
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
