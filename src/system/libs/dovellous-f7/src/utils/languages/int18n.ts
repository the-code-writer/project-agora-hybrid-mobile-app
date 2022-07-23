//import * as Dovellous from '../../../dovellous-f7-mobile';

import { f7 } from 'framework7-react';

const INT18N = {

    text: (path: any, language: string): string => {

        if(!language){
            language = "en";
        }

        const languagesDataResource = new f7.DF7.jasonDatabaseService("");

        return languagesDataResource.pullData(`/${language}/${path}`);

    },

};

export default INT18N;