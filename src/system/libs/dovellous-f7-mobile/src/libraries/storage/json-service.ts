import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import CapacitorStorage from './capacitor-storage';
 
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

    formatted: false,

    seperator: "/",

    platform: "web",

    usePromise: false,

    init: (filename: any, autosave:boolean = true, formatted:boolean = false, seperator: any = "/", platform: any = "web", usePromise: boolean = false) => {

        JSONService.platform = platform;
        JSONService.usePromise = usePromise;
        JSONService.autosave = autosave;
        JSONService.formatted = formatted;
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
            
            CapacitorStorage.getKey(JSONService.path, (data)=>{
                JSONService.data = data;
                if((typeof callbackFunctionSuccess).toString().toLowerCase() === "function"){
                    callbackFunctionSuccess(data);
                }else{
                    return;
                }
            }, (error)=>{
                if((typeof callbackFunctionError).toString().toLowerCase() === "function"){
                    callbackFunctionError(error);
                }else{
                    return;
                }
            });

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
            
            CapacitorStorage.getKey(JSONService.path, (data)=>{
                JSONService.data = data;
                if((typeof callbackFunctionSuccess).toString().toLowerCase() === "function"){
                    callbackFunctionSuccess(data);
                }else{
                    return;
                }
            }, (error)=>{
                if((typeof callbackFunctionError).toString().toLowerCase() === "function"){
                    callbackFunctionError(error);
                }else{
                    return;
                }
            });

        }catch(error){
            if((typeof callbackFunctionError).toString().toLowerCase() === "function"){
                callbackFunctionError(error);
            }else{
                return;
            }
        }
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
    addData: (path, data, callbackFunctionSuccess, callbackFunctionError) => {
        try{
            JSONService.updateJsonObject(path, data, JSONService.data);
            JSONService.autosave?JSONService.saveData(null, null);
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
    addDataAfterId: (afterId, data, callbackFunctionSuccess, callbackFunctionError) => {

        JSONService.data = JSONService.addNewObject(JSONService.data, afterId, data);

    },
    addNewObject: (mainContainer, idTobeMatched, newObject) => {
        for (let i = 0; i < mainContainer.length; i++) {
          if (mainContainer[i].id == idTobeMatched) {
            let indexOfNewObject = i + 1;
            mainContainer.splice(indexOfNewObject, 0, newObject);
            return mainContainer;
          } else if (mainContainer[i].data && mainContainer[i].data.length) {
            mainContainer[i].data = JSONService.addNewObject(mainContainer[i].data, idTobeMatched, newObject);
          }
        }
        return mainContainer;
    },
    constructObject: (path, data) => {
        const res = {};
            let ref = res;
            let pathArr = path.split(JSONService.seperator.toString());
            let counter=0;
            while(counter<pathArr.length){
            let segmentData = ref[pathArr[counter]];
               ref[pathArr[counter]] = segmentData?segmentData:{};
               counter === (pathArr.length - 1)?ref[pathArr[counter]] = data:null;
               ref = ref[pathArr[counter]];
               counter++;
            };
            return res;
    },
    updateJsonObject: (path, value, obj) => {
        var objValue = value;
        try {
            objValue = JSON.parse(value);
        } catch (e) { } //eat the error, must not be json so carry on... Hack to do a valid JSON check
    
        var parts = path.split("."), part;
        var last = parts.pop();
        while (part = parts.shift()) {
            if (typeof obj[part] != "object")
                obj[part] = {};
            obj = obj[part];
        }
        if (obj.hasOwnProperty(last) && obj[last] && obj[last].constructor === Array) {
            obj[last].push(objValue);
        }
        else if (obj.hasOwnProperty(last) && obj[last]) {
            var objArray = [];
            objArray.push(obj[last])
            objArray.push(objValue);
            obj[last] = objArray;
        }
        else {
            obj[last] = objValue;
        }
    },
    saveData: async (callbackFunctionSuccess, callbackFunctionError) => {
        try{
            const fileObject = {
                path: JSONService.path,
                data: JSON.stringify(JSONService.data, undefined, JSONService.formatted ?  2 : "\t"),
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
    reload: (callbackFunctionSuccess, callbackFunctionError) => {
        if(JSONService.platform==="web"){
            return JSONService.reloadData(callbackFunctionSuccess, callbackFunctionError);
        }
        return JSONService.reloadDataWeb(callbackFunctionSuccess, callbackFunctionError);
    }, 
    reloadData: (callbackFunctionSuccess, callbackFunctionError) => {
        JSONService.loadData(callbackFunctionSuccess, callbackFunctionError);
    },
    reloadDataWeb: (callbackFunctionSuccess, callbackFunctionError) => {
        JSONService.loadData(callbackFunctionSuccess, callbackFunctionError);
    },
}

export default JSONService;