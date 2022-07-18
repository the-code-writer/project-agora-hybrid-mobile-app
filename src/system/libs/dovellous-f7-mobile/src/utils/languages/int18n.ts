import * as Dovellous from '../../../dovellous-f7-mobile';

const INT18N = {

    text: (path: any, language: string): string => {
        if(!language){
            language = "en";
        }
        return Dovellous.LanguageResource.getData(`/${language}/${path}`);
    },

};

export default INT18N;