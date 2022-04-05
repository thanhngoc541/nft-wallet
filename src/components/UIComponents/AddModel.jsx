import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ModelList from './ModelList';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs(props) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="Bed" {...a11yProps(0)} />
        <Tab label="Chair" {...a11yProps(1)} />
        <Tab label="Clock" {...a11yProps(2)} />
        <Tab label="Lamp" {...a11yProps(3)} />
        <Tab label="Picture" {...a11yProps(4)} />
        <Tab label="Table" {...a11yProps(5)} />
        <Tab label="TV" {...a11yProps(6)} />
        <Tab label="Others" {...a11yProps(7)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <ModelList {...props} name="bed" number={6}></ModelList>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ModelList {...props} name="chair" number={6}></ModelList>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ModelList {...props} name="clock" number={1}></ModelList>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <ModelList {...props} name="lamp" number={4}></ModelList>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <ModelList {...props} name="picture" number={4}></ModelList>
      </TabPanel>
      <TabPanel value={value} index={5}>
        <ModelList {...props} name="table" number={3}></ModelList>
      </TabPanel>
      <TabPanel value={value} index={6}>
        <ModelList {...props} name="tv" number={3}></ModelList>
      </TabPanel>
      <TabPanel value={value} index={7}>
        <ModelList {...props} name="other" number={4}></ModelList>
      </TabPanel>
    </Box>
  );
}
