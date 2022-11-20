import { AgChartsReact } from 'ag-charts-react';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import useData from '../useFetchData'

type final_card = {
  [key:string] : string | number
}

const AgGrid = () =>{
  let defaulturl = 'http://localhost:3000/api/reports/chart'

  const {loading , cards, fetchData} = useData(defaulturl)
  
  const [options, setOption] = useState(null)

  const [status, setStatus] = useState('')
  const [label, setLabel] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  const setDataForChart =() => {
    setOption({
      title: {
        text: "Monthly Created Card",
      },
      subtitle: {
        text: 'Group by Label',
      },
      data: cards,
      series: [
        {
          type: 'column',
          xKey: 'month',
          yKey: 'Feature',
          yName: 'Feature',
          //normalizedTo: 100,
          stacked: true,
        },
        {
          type: 'column',
          xKey: 'month',
          yKey: '作業',
          yName: '作業',
          //normalizedTo: 100,
          stacked: true,
        },
        {
          type: 'column',
          xKey: 'month',
          yKey: 'Productivity',
          yName: 'Productivity',
          //normalizedTo: 100,
          stacked: true,
        },
        {
          type: 'column',
          xKey: 'month',
          yKey: 'VS Code',
          yName: 'VS Code',
          //normalizedTo: 100,
          stacked: true,
        },
        {
          type: 'column',
          xKey: 'month',
          yKey: 'Video',
          yName: 'Video',
          //normalizedTo: 100,
          stacked: true,
        },
        {
          type: 'column',
          xKey: 'month',
          yKey: 'Linux',
          yName: 'Linux',
          //normalizedTo: 100,
          stacked: true,
        },
        {
          type: 'column',
          xKey: 'month',
          yKey: 'Reading',
          yName: 'Reading',
          //normalizedTo: 100,
          stacked: true,
        },
        {
          type: 'column',
          xKey: 'month',
          yKey: 'Doc',
          yName: 'Doc',
          //normalizedTo: 100,
          stacked: true,
        },
        {
          type: 'column',
          xKey: 'month',
          yKey: 'Done',
          yName: 'Done',
          //normalizedTo: 100,
          stacked: true,
        },
        {
          type: 'column',
          xKey: 'month',
          yKey: 'Trello',
          yName: 'Trello',
          //normalizedTo: 100,
          stacked: true,
        },
        {
          type: 'column',
          xKey: 'month',
          yKey: 'Project Management',
          yName: 'Project Management',
          //normalizedTo: 100,
          stacked: true,
        },
        {
          type: 'column',
          xKey: 'month',
          yKey: 'Class',
          yName: 'Class',
          //normalizedTo: 100,
          stacked: true,
        },
        {
          type: 'column',
          xKey: 'month',
          yKey: '自學',
          yName: '自學',
          //normalizedTo: 100,
          stacked: true,
        },
        {
          type: 'column',
          xKey: 'month',
          yKey: 'Interview',
          yName: 'Interview',
          //normalizedTo: 100,
          stacked: true,
        },
        {
          type: 'column',
          xKey: 'month',
          yKey: 'Testing',
          yName: 'Testing',
          //normalizedTo: 100,
          stacked: true,
        },
        {
          type: 'column',
          xKey: 'month',
          yKey: 'CI/CD',
          yName: 'CI/CD',
          //normalizedTo: 100,
          stacked: true,
        },
        {
          type: 'column',
          xKey: 'month',
          yKey: 'IDE',
          yName: 'IDE',
          //normalizedTo: 100,
          stacked: true,
        },
        {
          type: 'column',
          xKey: 'month',
          yKey: 'Github',
          yName: 'Github',
          //normalizedTo: 100,
          stacked: true,
        },
        {
          type: 'column',
          xKey: 'month',
          yKey: 'HackMD',
          yName: 'HackMD',
          //normalizedTo: 100,
          stacked: true,
        },
        {
          type: 'column',
          xKey: 'month',
          yKey: 'Git',
          yName: 'Git',
          //normalizedTo: 100,
          stacked: true,
        },
        {
          type: 'column',
          xKey: 'month',
          yKey: 'Semantic Versioning',
          yName: 'Semantic Versioning',
          //normalizedTo: 100,
          stacked: true,
        },
        {
          type: 'column',
          xKey: 'month',
          yKey: 'Markdown',
          yName: 'Markdown',
          //normalizedTo: 100,
          stacked: true,
        },
        {
          type: 'column',
          xKey: 'month',
          yKey: 'SSH',
          yName: 'SSH',
          //normalizedTo: 100,
          stacked: true,
        },
        {
          type: 'column',
          xKey: 'month',
          yKey: 'Meeting',
          yName: 'Meeting',
          //normalizedTo: 100,
          stacked: true,
        },
        {
          type: 'column',
          xKey: 'month',
          yKey: 'No Label',
          yName: 'No Label',
          //normalizedTo: 100,
          stacked: true,
        },
      ],
      axes: [
        {
          type: 'number',
          position: 'left',
        },
        {
          type: 'category',
          position: 'bottom',
        },
      ],
      legend: {
        position: 'bottom',
      },
    })
  }

  const returnChart = () =>{
    return <AgChartsReact options={options} />
  }

  const returnLoading = () => {
      return(
        <div>Loading...</div>
      )
 }

  useEffect(() => {
    setDataForChart()
  },[cards])

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

export default AgGrid