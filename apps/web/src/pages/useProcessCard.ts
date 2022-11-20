import { useEffect, useState } from "react"

const useProcessCard = (card) =>{
    const [loading, setLoading] = useState(true)
    const [cards, setCard] = useState({})
    
    const processCard = () =>{
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

        setCard(final_card_for_chart)
        setLoading(false)
    }
    
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

    useEffect(() =>{
        processCard()
    },[])

    return {cards, loading}
}

export default useProcessCard