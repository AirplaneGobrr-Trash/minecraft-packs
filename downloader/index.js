
const { app, express, http, io, server } = require('./web')
const { engine } = require("express-handlebars")
const fs = require("fs")
const path = require("path")
const config = require("./config.json")
const cAPIF = require("./api.js")
const cAPI = cAPIF(config.token)
async function e() {
    // let v = cAPI.raw()
    // let b = await v.get(`https://api.curseforge.com/v1/minecraft/modloader/forge-40.2.0`)
    // console.log(b.data)
}
e()

// Steps
// unzip folder
// check for manifest
// get version and modLoaders,
// check if vaild version
// check if vaild modLoader + check game version of returned modLoader
// Put all fileID(s) of files in array
// ZIP it all back up make sure to include the overrides folder

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.static("public"))

app.get('/', (req, res) => {
    res.render('home');
});

let packsDir = path.join(__dirname, "../packs")

app.use("/files", (req, res,next)=>{
    console.log()
    req.url = req.url.split("?")[0]
    var fPathRaw = req.url.split("/").filter(Boolean);
    var filePath = path.join(packsDir, fPathRaw.join("/"))
    var fileStat = fs.statSync(filePath)
    if (fileStat.isFile()){
        if (req.query.download){
            res.sendFile(filePath)
            return
        } else if (req.query.package){
            // package it
        }
        res.render("file", {
            file: fPathRaw[fPathRaw.length-1]
        })
        return
    }
    const filesOfDir = fs.readdirSync(filePath)
    var filesHTML = ``
    for (var file of filesOfDir){
        var FFStat = fs.statSync(path.join(filePath, file))
        filesHTML+=`<a href="/files/${fPathRaw.join("/")}/${file}">${file}</a> ${new Date(FFStat.mtime).toDateString()} ${FFStat.size}`
    }
    res.render("dir", {
        path: fPathRaw.join("/"),
        files: filesHTML
    })
})

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(3015, () => {
  console.log('listening on *:3015');
});

// Web: <script src='/socket.io/socket.io.js'></script>