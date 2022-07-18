import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

// The first argument is the database filename. If no extension, '.json' is assumed and automatically added.
// The second argument is used to tell the DB to save after each push
// If you put false, you'll have to call the save() method.
// The third argument is to ask JsonDB to save the database in an human readable format. (default false)
// The last argument is the separator. By default it's slash (/)
const JSONService = {

    path: "/io.dovellous.app/state/data/app-data.json",

    data: {},

    loaded: false,

    autosave: true,

    pretty: false,

    seperator: "/",

    init: (filename: any, autosave:boolean = true, pretty:boolean = false, seperator: any = "/") => {

        JSONService.autosave = autosave;
        JSONService.pretty = pretty;
        JSONService.seperator = seperator;
        JSONService.path =  `/io.dovellous.app/state/data/${filename}`;
        JSONService.loadData(null, null);

    },
    loadData: async (callbackFunctionSuccess, callbackFunctionError) => {
        try{
            const fileObject = {
                path: JSONService.path,
                directory: Directory.Documents,
                encoding: Encoding.UTF8,
            };
            const _data = await Filesystem.readFile(fileObject);
            JSONService.data = JSON.parse(_data);
            if((typeof callbackFunctionSuccess).toString().toLowerCase() === "function"){
                callbackFunctionSuccess(JSONService.data);
            }else{
                return JSONService.data;
            }
        }catch(error){
            if((typeof callbackFunctionError).toString().toLowerCase() === "function"){
                callbackFunctionError(error);
            }else{
                return;
            }
        }
    }, 
    loadDataPromise: async () => {
        return new Promise(function(resolve, reject) {
            try{
                const fileObject = {
                    path: JSONService.path,
                    directory: Directory.Documents,
                    encoding: Encoding.UTF8,
                };
                const _data = await Filesystem.readFile(fileObject);
                JSONService.data = JSON.parse(_data);
                resolve(JSONService.data);
            }catch(error){
                reject(error);
            }
        });
    }, 
    getData: async (path, callbackFunctionSuccess, callbackFunctionError) => {
        try{
            let pathKeys = path.split(JSONService.seperator);
            let extractedObject = pathKeys.reduce((a, c) => a[c], JSONService.data);
            if((typeof callbackFunctionSuccess).toString().toLowerCase() === "function"){                
                callbackFunctionSuccess(extractedObject);
            }else{
                return extractedObject;
            }
        }catch(error){
            if((typeof callbackFunctionError).toString().toLowerCase() === "function"){
                callbackFunctionError(error);
            }else{
                return;
            }
        }
    },    
    addData: ( key: any) => {



    },
    saveData: async (callbackFunctionSuccess, callbackFunctionError) => {
        try{
            const fileObject = {
                path: JSONService.path,
                data: JSON.stringify(JSONService.data, null, JSONService.pretty),
                directory: Directory.Documents,
                encoding: Encoding.UTF8,
            };
            await Filesystem.writeFile(fileObject);
            if((typeof callbackFunctionSuccess).toString().toLowerCase() === "function"){
                callbackFunctionSuccess(fileObject);
            }
        }catch(error){
            if((typeof callbackFunctionError).toString().toLowerCase() === "function"){
                callbackFunctionError(error);
            }
        }
    },
    deleteData: async (callbackFunctionSuccess, callbackFunctionError) => {
        try{
            const fileObject = {
                path: JSONService.path,
                directory: Directory.Documents,
            };
            await Filesystem.deleteFile(fileObject);
            if((typeof callbackFunctionSuccess).toString().toLowerCase() === "function"){
                callbackFunctionSuccess(fileObject);
            }
        }catch(error){
            if((typeof callbackFunctionError).toString().toLowerCase() === "function"){
                callbackFunctionError(error);
            }
        }
    },
    deleteKey: ( key: any) => {



    },
    reloadData: () => {
        JSONService.loadData(null, null);
    },
    
}

export default JSONService;