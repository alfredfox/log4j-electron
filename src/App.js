import React, {useContext, useEffect, useMemo, useReducer, useState} from 'react';

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import ProductsTable from './ProductsTable'
import axios from 'axios'
// const fs = window.require('fs');

import {
  AppContext,
  initialState,
  actionTypes,
} from './AppContext';
import { reducer } from './reducer';

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

// const read = (callback) => {
//   try {
//     const content = fs.readFileSync('application.properties', 'UTF-8')

//     //  parse application properties from string to json
//     const json = content.split('\n').reduce((acc, curr) => {
//       const [k, v] = curr.split('=')
//       return {
//         ...acc,
//         [k]: v
//       }
//     }, {})

//     return callback(json)
//   } catch(error) {
//     throw new Error(JSON.stringify(error))
//   }
// }

export default function App() {

  const [state, dispatch] = useReducer(reducer, initialState);

  const [value, setValue] = React.useState(0);
  const [gitInfo, setGitInfo] = React.useState();
  const [gitResponse, setGitResponse] = React.useState()

  // const appContext = useMemo(
  //   () => ({
  //     state,
  //     dispatch,
  //   }),
  //   [state, dispatch],
  // );

  const appContext = {
      state,
      dispatch,
    };

  // React.useEffect(() => {
  //   read((result) => {
  //     setGitInfo(result)
  //   });
  // }, [])


  useEffect(() => {
    axios.get('https://api.github.com/repos/mlubovac/logging-log4j-audit-sample/contents/audit-service-api/src/main/resources/catalog.json', {
      headers: {
        'Authorization': 'Basic bWx1Ym92YWM6Q253ODRGcmk0NS4='
      }
    })
    .then(({ data }) => {

      const { products, categories, events, attributes } = JSON.parse(atob(data.content))

      dispatch({
        type: actionTypes.GET_CATALOG,
        payload: {
          sha: data.sha,
          products,
          categories,
          events,
          attributes
        }
      })
    })
    .catch(error => console.log(error))
  },[]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <AppContext.Provider value={appContext}>
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
    </AppContext.Provider>
  );
}

