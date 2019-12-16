import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import ProductsTable from './ProductsTable'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default function App() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Products" />
            <Tab label="Categories" />
            <Tab label="Events" />
            <Tab label="Attributes" />
          </Tabs>
        </AppBar>
      </Grid>
      <Grid item xs={12}>
        <TabPanel value={value} index={0}>
          <ProductsTable />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Categories
        </TabPanel>
        <TabPanel value={value} index={2}>
          Events
        </TabPanel>
        <TabPanel value={value} index={3}>
          Attributes
        </TabPanel>
      </Grid>
    </Grid>
  );
}

