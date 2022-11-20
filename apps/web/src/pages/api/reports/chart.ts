import type { NextApiRequest, NextApiResponse } from "next";

import { trelloAdapter } from '../../../backend/adapters/trelloAdapter';
import { cardService } from '../../../backend/services/cardService';

/**
 * Monthly report
 *
 * @description To display number of cards created in a month (with filter and group)
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const generateReport = async() =>{
    const { from, to, status, label } = req.query;
    
    const board = await trelloAdapter.getBoard();

    const { cards, actions, lists } = board;

    let updatedCards = cardService.appendDetailInfo(cards, actions, lists);

    updatedCards = filterCards(updatedCards, status, label, from, to);

    let groupedCardMap = cardService.groupCards(updatedCards);

    return res.status(200).json(
        //restructuredCard
        groupedCardMap
      );
  }

  const filterCards = (updatedCards, status, label, from, to) =>{
    updatedCards = cardService.filterByStatus(updatedCards, status);

    updatedCards = cardService.filterByLabel(updatedCards, label);

    updatedCards = cardService.filterByDateRange(updatedCards, from, to);

    return updatedCards;
  }
    
  await generateReport();
  
}
