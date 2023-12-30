export interface QueryResult{
    responseId:string;
    queryText:string;
    parameters:{
        food_item:string[];
        number:number[];
        fulfillmentMessages:[{
            text:{
                text:string[];
            };
        }];
    };
    allRequiredParamsPresent:boolean;
    fulfillmentText:string;
    intent:{
        name:string;
        displayName:string;
    }
    intentDetectionConfidence:number;
    languageCode:string;
    session:string;
}


export interface BodyType{
    responseId:string;
    queryResult:QueryResult;
    session:string;
    // allRequiredParamsPresent:boolean;
    // fulfillmentText:string;
    // fulfillmentMessages:[{
    //     text:{
    //         text:string[];
    //     };
    // }];
    // outputContexts:[
    //     {
    //         name:string;
    //         lifespanCount:number;
    //         parameters:{
    //             food_item:string[];
    //             number:number[];
    //         };
    //     }
    // ]
    // intent:{
    //     name:string;
    //     displayName:string;
    // }
    // webhookStatus:string;

}

export interface IntentTypes {
  add_order: string;
  remove_order: string;
}
