import Express from "express"

//creating server
const app =Express()
app.set("port",3000)
app.listen(app.get("port"))
console.log("server working in th port ", app.get("port"))
app.use(Express.static( 'public'));
//routes
app.get("/",(req,res)=>{
  res.sendFile(  "/pages/login.html")
})
