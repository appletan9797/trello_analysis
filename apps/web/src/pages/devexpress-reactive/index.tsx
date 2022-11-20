import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Title,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { Stack, Animation } from '@devexpress/dx-react-chart';
import { useState } from 'react';
import useData from '../useFetchData'

const Root = props => (
  <Legend.Root {...props} sx={{ display: 'block', margin: 'auto' }} />
);
const Label = props => (
  <Legend.Label {...props} sx={{ whiteSpace: 'nowrap' }} />
);

const DevExpress = () =>{
  let defaulturl = 'http://localhost:3000/api/reports/chart'

  const {loading , cards, fetchData} = useData(defaulturl)
  const [status, setStatus] = useState('')
  const [label, setLabel] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  
  const returnChart = () =>{
    console.log(cards)
    return (
      <Paper>
        <Chart
          data={cards}
        >
          <ArgumentAxis/>
          <ValueAxis/>
  
        <BarSeries
            name="Feature"//name in the series of stack
            valueField="Feature"//value in the object
            argumentField="month" // the name of the key that u want to group ur data
          />
          
          <BarSeries
            name="作業"
            valueField="作業"
            argumentField="month"
          />
  
          <BarSeries
            name="Productivity"
            valueField="Productivity"
            argumentField="month"
          />
  
          <BarSeries
            name="VS Code"
            valueField="VS Code"
            argumentField="month"
          />
  
          <BarSeries
            name="Video"
            valueField="Video"
            argumentField="month" 
          />
  
          <BarSeries
            name="Linux"
            valueField="Linux"
            argumentField="month" 
          />
  
          <BarSeries
            name="Reading"
            valueField="Reading"
            argumentField="month" 
          />
  
          <BarSeries
            name="Doc"
            valueField="Doc"
            argumentField="month" 
          />
  
          <BarSeries
            name="Done"
            valueField="Done"
            argumentField="month" 
          />
  
          <BarSeries
            name="Trello"
            valueField="Trello"
            argumentField="month" 
          />
  
          <BarSeries
            name="Project Management"
            valueField="Project Management"
            argumentField="month" 
          />
          
          <BarSeries
            name="Class"
            valueField="Class"
            argumentField="month" 
          />
  
          <BarSeries
            name="自學"
            valueField="自學"
            argumentField="month" 
          />
  
          <BarSeries
            name="Interview"
            valueField="Interview"
            argumentField="month" 
          />
  
          <BarSeries
            name="Testing"
            valueField="Testing"
            argumentField="month" 
          />
  
          <BarSeries
            name="CI/CD"
            valueField="CI/CD"
            argumentField="month" 
          />
  
          <BarSeries
            name="IDE"
            valueField="IDE"
            argumentField="month" 
          />
  
          <BarSeries
            name="Github"
            valueField="Github"
            argumentField="month" 
          />
  
          <BarSeries
            name="HackMD"
            valueField="Software Engineering"
            argumentField="month" 
          />
  
          <BarSeries
            name="Git"
            valueField="Git"
            argumentField="month" 
          />
  
          <BarSeries
            name="Semantic Versioning"
            valueField="Semantic Versioning"
            argumentField="month" 
          />
  
          <BarSeries
            name="Markdown"
            valueField="Markdown"
            argumentField="month" 
          />
          
          <BarSeries
          name="SSH"
          valueField="SSH"
          argumentField="month" 
        />
  
        <BarSeries
          name="Meeting"
          valueField="Meeting"
          argumentField="month" 
        />
  
        <BarSeries
          name="No Label"
          valueField="No Label"
          argumentField="month" 
        />
          <Animation />
          <Legend position="right" rootComponent={Root} labelComponent={Label}/>
          <Title text="Monthly Created Card - Group by Label" />
          <Stack
            stacks={[
              { 
                series:['No Label','Feature','作業','Productivity','VS Code','Video','Linux','Reading','Doc','Done','Trello','Project Management', 'Class','自學','Interview','Testing','CI/CD','IDE','Github','HackMD','Software Engineering','Git','Semantic Versioning','Markdown','SSH','Meeting']
              },
            ]}
          />
        </Chart>
      </Paper>
    );
  }

  const returnLoading = () => {
    return(
      <div>Loading...</div>
    )
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    let url_with_filter = defaulturl + "?"
    if(status){
      url_with_filter += "status="+status+"&"
    }
    if(label){
      url_with_filter += "label="+label+"&"
    }
    if(from){
      url_with_filter += "from="+from+"&"
    }
    if(to){
      url_with_filter += "to="+to
    }

    fetchData(url_with_filter)
  }

  const fetchAll = (e) =>{
    e.preventDefault();
    defaulturl = 'http://localhost:3000/api/reports/chart';
    fetchData(defaulturl)
  }

  return (
    <div>
      <div id="UserInput">
        <form onSubmit={handleSubmit}>
          <TextField
          label="Status"
          variant="filled"
          sx={{ mb: 2 }}
          value={status}
          onChange={e => setStatus(e.target.value)}
          /><br />

          <TextField
            label="Label"
            variant="filled"
            sx={{ mb: 2 }}
            value={label}
            onChange={e => setLabel(e.target.value)}
          /><br />

          <TextField
            label="From"
            variant="filled"
            type='date'
            sx={{ mb: 2 }}
            value={from}
            onChange={e => setFrom(e.target.value)}
          /><br />

          <TextField
            label="To"
            variant="filled"
            type='date'
            sx={{ mb: 2 }}
            value={to}
            onChange={e => setTo(e.target.value)}
          /><br />

          <Button variant='outlined' color='success' type='submit'>Filter Data</Button>
          <Button variant='contained' color='success' onClick={fetchAll} sx={{ ml: 2 }}>Fetch All</Button>
        </form>
      </div>
      <div id="Container">
          {loading ? returnLoading() : returnChart()}
      </div>
    </div>
  )
}
export default DevExpress