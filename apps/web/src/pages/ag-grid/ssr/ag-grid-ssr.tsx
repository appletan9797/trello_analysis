import { AgChartsReact } from 'ag-charts-react';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios'
import { useRouter } from "next/router"

type final_card = {
  [key:string] : string | number
}

export const getServerSideProps = async(context) =>{
  const params = new URLSearchParams(context.query)
  const url = 'http://localhost:3000/api/reports/chart?'+params
  const getCards = await axios.get(url)
  const card = getCards.data

  return{
    props:{
      card
    }
  }
}

const AgGrid = ({card}) =>{

  const [loading, setLoading] = useState(true)
  const [options, setOption] = useState(null)

  const [status, setStatus] = useState('')
  const [label, setLabel] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  const router = useRouter()

  const processCard = () =>{
    const restructureFinalCard = (final_card) =>{
      for (let i = 0; i<final_card.length; i++){
        let card = final_card[i]
        card['作業'] = 0                 
        card['Productivity'] = 0
        card['VS Code'] = 0              
        card['Video'] = 0
        card['Linux'] = 0
        card['Reading'] = 0
        card['Doc'] = 0
        card['Done'] = 0
        card['Trello'] = 0
        card['Project Management'] = 0
        card['Class'] = 0
        card['自學'] = 0
        card['Interview'] = 0
        card['Testing'] = 0
        card['CI/CD'] = 0
        card['IDE'] = 0
        card['Github'] = 0
        card['HackMD'] = 0
        card['Software Engineering'] = 0
        card['Git'] = 0
        card['Semantic Versioning'] = 0
        card['Markdown'] = 0
        card['SSH'] = 0
        card['Meeting'] = 0
        card['Feature'] = 0
        card['No Label'] = 0
      }
    
      return final_card
    }

    let final_card_for_chart = [
      {month:'January'},
      {month:'February'},
      {month:'March'},
      {month:'April'},
      {month:'May'},
      {month:'June'},
      {month:'July'},
      {month:'August'},
      {month:'September'},
      {month:'October'},
      {month:'November'},
      {month:'December'}
    ]

    final_card_for_chart = restructureFinalCard(final_card_for_chart)

    for (let card_status in card){
      for (let month in card[card_status]){
      //Find index of month, to use it later when storing number of card with certain label
          let index_of_month = final_card_for_chart.map(card => card.month).indexOf(month)
          let label_number_map = card[card_status][month]

          for (let each_card in label_number_map){
              let card = final_card_for_chart[index_of_month]

              if (each_card in final_card_for_chart[index_of_month]){
                  card[each_card]++
              }
              else{ //if not in, create new and append
                  card[each_card] = label_number_map[each_card]
              }
          }
      }
    }

    setDataForChart(final_card_for_chart)
  }

  useEffect(() =>{
    processCard()
  },[])

  const setDataForChart = (result) => {
    setOption({
      title: {
        text: "Monthly Created Card",
      },
      subtitle: {
        text: 'Group by Label',
      },
      data: result,
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

    setLoading(false)
  }

  const returnLoading = () => {
    return(
      <div>Loading...</div>
    )
  }

  const returnChart = () =>{
    return <AgChartsReact options={options} />
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    router.replace({
      pathname:router.asPath,
      query:{
        status:status,
        /* label:label,
        from:from,
        to:to */
      }
    })
    /*let url_with_filter = defaulturl + "?"
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

    fetchData(url_with_filter) */
  }

  const fetchAll = (e) =>{
    /* e.preventDefault();
    defaulturl = 'http://localhost:3000/api/reports/chart';
    fetchData(defaulturl) */
    e.preventDefault()
    console.log(router.asPath)
  }

  return(
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