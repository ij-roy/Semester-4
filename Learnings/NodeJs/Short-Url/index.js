const express = require('express');
const path = require('path');
const { connectToMongoDB } = require('./connect')
const cookieParser = require('cookie-parser');
const {checkForAuthentication,restrictTo} = require('./middlewares/auth');

const URL  = require('./models/URL');

const urlRouter = require('./routes/url');
const staticRouter = require('./routes/staticRouter');
const userRouter = require('./routes/user');

const app = express();
const port = 8001;

connectToMongoDB('mongodb://localhost:27017/short-url').then(
  console.log('Connected to MongoDB')
);

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

app.get('/test', async (req,res)=>{

  const allUrls = await URL.find({});

  return res.render('home',{urls:allUrls});

});

app.use("/url", restrictTo(['NORMAL']) ,urlRouter);
app.use("/user", userRouter);
app.use("/",staticRouter);

app.get('/url/:shortId',async (req,res)=>{
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate({shortId},{$push:{visitHistory: {timestamp : Date.now()}}});
  res.redirect(entry.redirectUrl);
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//11 authorization