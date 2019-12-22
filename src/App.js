import React from 'react';

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import ProductsTable from './ProductsTable'
import axios from 'axios'
const fs = window.require('fs');

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

const read = (callback) => {
  try {
    const content = fs.readFileSync('application.properties', 'UTF-8')

    //  parse application properties from string to json
    const json = content.split('\n').reduce((acc, curr) => {
      const [k, v] = curr.split('=')
      return {
        ...acc,
        [k]: v
      }
    }, {})

    return callback(json)
  } catch(error) {
    throw new Error(JSON.stringify(error))
  }
}

export default function App() {
  const [value, setValue] = React.useState(0);
  const [gitInfo, setGitInfo] = React.useState();
  const [gitResponse, setGitResponse] = React.useState()

  React.useEffect(() => {
    read((result) => {
      setGitInfo(result)
    });
  }, [])

  React.useEffect(() => {
    if (!gitInfo) return;

    axios.get("https://api.github.com", {
      headers: {
        Authorization: `Basic ${btoa(`${gitInfo.gitUserName}:${gitInfo.gitPassword}`)}`
      }
    }).then(response => {
      setGitResponse(response.data)
    }).catch(error => {
      console.log(error)
    })

  }, [gitInfo])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container>
      <pre>
        {JSON.stringify(gitInfo, null, 4)}
      </pre>
      <pre>
        {JSON.stringify(gitResponse, null, 4)}
      </pre>

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

