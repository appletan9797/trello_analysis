import _ from "lodash";

/**
 * Map created card with date
 *
 * @param {array} cards
 * @param {array} actions
 * @returns {array}
 */

type Card ={
  updatedListName?: string,
  id: string,
  address: string,
  badges: {
    attachmentsByType: [Object],
    location: boolean,
    votes: number,
    viewingMemberVoted: boolean,
    subscribed: boolean,
    fogbugz: string,
    checkItems: number,
    checkItemsChecked: number,
    checkItemsEarliestDue: null,
    comments: number,
    attachments: number,
    description: true,
    due: null,
    dueComplete: boolean,
    start: null
  },
  checkItemStates: null,
  closed: boolean,
  coordinates: null,
  creationMethod: null,
  dueComplete: boolean,
  dateLastActivity: string,
  desc: string,
  descData: { emoji: {} },
  due: null,
  dueReminder: null,
  email: null,
  idBoard: string,
  idChecklists: [],
  idLabels: [],
  idList: string,
  idMembers: [],
  idMembersVoted: [],
  idShort: number,
  idAttachmentCover: null,
  labels: {
    id: string,
    idBoard: string,
    name: string,
    color: string
  }[],
  limits: { attachments: [Object], checklists: [Object], stickers: [Object] },
  locationName: null,
  manualCoverAttachment: boolean,
  name: string,
  pos: number,
  shortLink: string,
  shortUrl: string,
  staticMapUrl: null,
  start: null,
  subscribed: boolean,
  url: string,
  cover: {
    idAttachment: null,
    color: null,
    idUploadedBackground: null,
    size: string,
    brightness: string,
    idPlugin: null
  },
  isTemplate: boolean,
  cardRole: null,
  attachments: [],
  createdDate: string
}

type Action = {
  id: string,
  idMemberCreator: string,
  data: {
    card: {
      desc: string,
      id: string,
      name: string,
      idShort: number,
      shortLink: string
    },
    old: {
      desc:string
    },
    board: {
      id: string,
      name: string,
      shortLink: string
    },
    list: {
      id: string,
      name: string
    }
  },
  appCreator: string,
  type: string,
  date: string,
  limits: string,
  memberCreator: {
    id: string,
    activityBlocked: boolean,
    avatarHash: string,
    avatarUrl: string,
    fullName: string,
    idMemberReferrer: string,
    initials: string,
    nonPublic: {
      
    },
    nonPublicAvailable: boolean,
    username: string
  }
}

type List = {
  id: string,
  name: string,
  closed: boolean,
  idBoard: string,
  pos: number,
  subscribed: boolean,
  softLimit: string,
  limits: {
    cards: {
      openPerList: {
        status: string,
        disableAt: number,
        warnAt: number
      },
      totalPerList: {
        status: string,
        disableAt: number,
        warnAt: number
      }
    }
  },
  creationMethod: string
}

type GroupedCard = {
  [x:string]: Card[]
}

class CardService {
  
  appendDetailInfo(cards: Card[], actions: Action[], lists: List[]) {
    let updatedCards = this.appendCreatedDate(cards, actions);

    updatedCards = this.appendListName(updatedCards, lists);
    
    return updatedCards;
  }

  appendCreatedDate(cards: Card[], actions: Action[]) {
    return cards.map((card) => {
      const action = actions.find(
        (action) =>
          (action.type == "createCard" || action.type == "copyCard") &&
          action.data.card.id === card.id
      );
      return {
        ...card,
        createdDate: action?.date,
      };
    });
  }

  appendListName(updatedCards: Card[], lists: List[]) {
    return updatedCards.map((card) => {
      const matched = lists.find((list) => card.idList == list.id);

      return {
        updatedListName: matched?.name,
        ...card,
      };
    });
  }

  filterByStatus(updatedCards: Card[], status: string) {
    const objStatus = {
      Info: ["General Info", "Template"],
      Todo: ["Todo"],
      InProgress: ["In Progress", "Reviewing"],
      Done: ["Closed", "Classes", "Done"],
    };

    //Filter
    //list
    const arrStatus = objStatus[status];
    if (status) {
      updatedCards = updatedCards.filter((card) =>
        arrStatus.includes(card.updatedListName)
      );
    }
    return updatedCards;
  }

  filterByDateRange(updatedCards: Card[], fromDate: string, toDate: string) {
    if (fromDate) {
      updatedCards = updatedCards.filter(
        (card) => card.createdDate >= fromDate
      );
    }

    if (toDate) {
      updatedCards = updatedCards.filter((card) => card.createdDate <= toDate);
    }
    return updatedCards;
  }

  filterByLabel(updatedCards: Card[], label: string) {
    if (label) {
      updatedCards = updatedCards.filter((card) => {
        const cardLabels = card.labels;
        const labelExist = cardLabels.some(
          (labelOfCard) => labelOfCard.name == label
        );
        if (labelExist) {
          return card;
        }
      });
    }
    return updatedCards;
  }

  groupCards(updatedCards: Card[]) {
    let groupedCardMap = _.groupBy(updatedCards, "updatedListName");

    //Group by month of card created
    for (let cardStatus in groupedCardMap) {
      const cards = groupedCardMap[cardStatus];
      groupedCardMap[cardStatus] = this.groupByMonth(cards);
    }

    let labelNames = this.extractAllLabelNames(groupedCardMap);

    //Group by label
    for (let cardStatus in groupedCardMap) {
      for (let cardMonth in groupedCardMap[cardStatus]) {
        //add list key to sorted array + add value
        const labelCardNumbersMap = this.getMonthlyLabelCardNumbersMap(
          groupedCardMap,
          cardStatus,
          cardMonth,
          labelNames
        );
        groupedCardMap[cardStatus][cardMonth] = labelCardNumbersMap;
      }
    }
    return groupedCardMap;
  }

  groupByMonth(cards: Card[]) {
    return _.groupBy(cards, (card) => {
      const createdDate = new Date(card.createdDate);
      return createdDate.toLocaleString("default", { month: "long" });
    });
  }

  extractAllLabelNames(groupedCardMap: GroupedCard) {
    let labelNames = [];
    for (let cardStatus in groupedCardMap) {
      for (let cardMonth in groupedCardMap[cardStatus]) {
        //put label list into array
        let cards = groupedCardMap[cardStatus][cardMonth]; //store array of obj created on certain month to letiable
        _.forEach(cards, (card) => {
          //each card in the result array under certain month
          if (card.labels.length > 0) {
            const filteredLableNames = card.labels
              .filter((label) => !labelNames.includes(label.name))
              .map((label) => label.name);
            labelNames = labelNames.concat(filteredLableNames);
          }
        });
      }
    }
    return labelNames;
  }

  getMonthlyLabelCardNumbersMap(
    groupedCardMap: GroupedCard,
    cardStatus: string,
    cardMonth: string,
    labelNames: string[]
  ) {
    let monthlyCards = groupedCardMap[cardStatus][cardMonth]; //array of cards under certain month
    let labelCardNumbersMap = {
      "No Label": 0,
    };
    let counter = monthlyCards.length;
    monthlyCards.forEach((card) => {
      //run through each card
      let labels = card.labels;
      if (labels.length > 0) {
        //if got label
        for (let label of labels) {
          //each label of current card
          if (labelNames.includes(label.name)) {
            let index = labelNames.indexOf(label.name);
            const labelName = labelNames[index];
            const cardNumbers = labelCardNumbersMap[labelName] ?? 0;

            labelCardNumbersMap[labelName] = cardNumbers + 1;
          }
        }
      } else {
        labelCardNumbersMap["No Label"] += 1;
      }
      counter -= 1;
    });

    if (counter == 0) {
      if (labelCardNumbersMap["No Label"] == 0) {
        delete labelCardNumbersMap["No Label"];
      }
    }

    return labelCardNumbersMap;
  }
 }

const cardService = new CardService();

export {
  CardService,
  cardService,
}