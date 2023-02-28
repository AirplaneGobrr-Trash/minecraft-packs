// https://api.curseforge.com/v1/minecraft/version - Not needed
// https://api.curseforge.com/v1/minecraft/modloader - Done
// https://api.curseforge.com/v1/mods/{modId}/files/{fileId} - Done
// https://api.curseforge.com/v1/mods/{modId}/files - Done
// https://api.curseforge.com/v1/mods/files - Done


const baseURL = `http://api.curseforge.com`
const version = `v1`

const axios = require("axios").default

const apiBASE = axios.create({
    baseURL: `${baseURL}/${version}`
})

class api {
    /**
     * 
     * @param {String} token eternal token, https://eternal.overwolf.com 
     */
    constructor(token){
        apiBASE.defaults.headers["x-api-key"] = token
    }
    /**
     * 
     * @param {Array<Number>} FileIDArray 
     */
    getFiles(FileIDArray){
        return apiBASE.post(`/mods/files`, {fileIds: FileIDArray })
    }
    /**
     * 
     * @param {Number} modID 
     * @returns 
     */
    getModFiles(modID){
        return apiBASE.get(`/mods/${modID}/files`)
    }
    /**
     * 
     * @param {Number} modID 
     * @param {Number} fileID 
     * @returns 
     */
    getModFile(modID, fileID){
        return apiBASE.get(`/mods/${modID}/files/${fileID}`)
    }
    /**
     * 
     * @param {String} version EG "forge-40.2.0"
     * @returns 
     */
    getModloader(version){
        return apiBASE.get(`/minecraft/modloader/${version}`)
    }
    /**
     * 
     * @param {String} version EG "1.18.2"
     * @returns 
     */
    getVersion(version){
        return apiBASE.get(`/minecraft/version/${version}`)
    }
    raw(){
        return apiBASE
    }
}

function output(token){
    return new api(token);
}

module.exports = output