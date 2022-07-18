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

    platform: "web",

    usePromise: false,

    init: (filename: any, autosave:boolean = true, pretty:boolean = false, seperator: any = "/", platform: any = "web", usePromise: boolean = false) => {

        JSONService.platform = platform;
        JSONService.usePromise = usePromise;
        JSONService.autosave = autosave;
        JSONService.pretty = pretty;
        JSONService.seperator = seperator;
        JSONService.path =  `/io.dovellous.app/state/data/${filename}`;
        JSONService.loadData(null, null);

    },
    load: (callbackFunctionSuccess, callbackFunctionError) => {
        if(JSONService.platform==="web"){
            return JSONService.loadDataWeb(callbackFunctionSuccess, callbackFunctionError);
        }
        return JSONService.loadData(callbackFunctionSuccess, callbackFunctionError);
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
    loadDataWeb: async (callbackFunctionSuccess, callbackFunctionError) => {
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
    get: (path, callbackFunctionSuccess, callbackFunctionError) => {
        if(JSONService.platform==="web"){
            return JSONService.getDataWeb(path, callbackFunctionSuccess, callbackFunctionError);
        }
        return JSONService.getData(path, callbackFunctionSuccess, callbackFunctionError);
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
    add: (path, data, callbackFunctionSuccess, callbackFunctionError) => {
        if(JSONService.platform==="web"){
            return JSONService.addDataWeb(path, data, callbackFunctionSuccess, callbackFunctionError);
        }
        return JSONService.addData(path, data, callbackFunctionSuccess, callbackFunctionError);
    },    
    addData: (path, data, callbackFunctionSuccess, callbackFunctionError) => {



    },   
    addDataWeb: (path, data, callbackFunctionSuccess, callbackFunctionError) => {



    }, 
    save: (callbackFunctionSuccess, callbackFunctionError) => {
        if(JSONService.platform==="web"){
            return JSONService.saveDataWeb(callbackFunctionSuccess, callbackFunctionError);
        }
        return JSONService.saveData(callbackFunctionSuccess, callbackFunctionError);
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
    saveDataWeb: async (callbackFunctionSuccess, callbackFunctionError) => {
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
    del: (callbackFunctionSuccess, callbackFunctionError) => {
        if(JSONService.platform==="web"){
            return JSONService.deleteDataWeb(callbackFunctionSuccess, callbackFunctionError);
        }
        return JSONService.deleteData(callbackFunctionSuccess, callbackFunctionError);
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
    deleteDataWeb: async (callbackFunctionSuccess, callbackFunctionError) => {
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
    delKey: (key, callbackFunctionSuccess, callbackFunctionError) => {
        if(JSONService.platform==="web"){
            return JSONService.deleteKey(key, callbackFunctionSuccess, callbackFunctionError);
        }
        return JSONService.deleteKeyWeb(key, callbackFunctionSuccess, callbackFunctionError);
    }, 
    deleteKey: (key, callbackFunctionSuccess, callbackFunctionError) => {



    },
    deleteKeyWeb: (key, callbackFunctionSuccess, callbackFunctionError) => {



    },
    reload: (key, callbackFunctionSuccess, callbackFunctionError) => {
        if(JSONService.platform==="web"){
            return JSONService.reloadData(callbackFunctionSuccess, callbackFunctionError);
        }
        return JSONService.reloadDataWeb(callbackFunctionSuccess, callbackFunctionError);
    }, 
    reloadData: () => {
        JSONService.loadData(null, null);
    },
    reloadDataWeb: () => {
        JSONService.loadData(null, null);
    },
}

export default JSONService;