const { MessageEmbed, Client, Intents, GuildScheduledEvent, Permissions, MessageButton, MessageActionRow } = require("discord.js");
const puppeteer = require('puppeteer');
const Discord = require("discord.js")
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES
  ]
});

var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");

const DiscordStrategy = require('passport-discord').Strategy
  , refresh = require('passport-oauth2-refresh');
const passport = require('passport');
const session = require('express-session');
const wait = require('node:timers/promises').setTimeout;
const { channels, bot, website } = require("./config.js");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(__dirname + "assets"))
app.set("view engine", "ejs")
app.use(express.static("public"));
const config = require("./config.js");
const { use } = require("passport");
global.config = config;
const DiscordOauth2 = require("discord-oauth2");
const oauth = new DiscordOauth2({
  clientId: config.bot.botID,
  clientSecret: config.bot.clientSECRET,
  redirectUri: config.bot.callbackURL,
});
const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://mosatfaafroto:30122009a@cluster0.6jg1the.mongodb.net/").then(() => {
  console.log("database connected successfully...")
})
const dataDB = require('./data.js')


const onWork = new Map()

app.use(session({
  secret: 'some random secret',
  cookie: {
    maxAge: 60000 * 60 * 24
  },
  saveUninitialized: false
}));

var scopes = ['identify', 'guilds', 'guilds.join'];

passport.use(new DiscordStrategy({
  clientID: config.bot.botID,
  clientSecret: config.bot.clientSECRET,
  callbackURL: config.bot.callbackURL,
  scope: scopes
}, async function(accessToken, refreshToken, profile, done) {
  process.nextTick(async function() {
    let count = await dataDB.find({})
const user = await client.users.fetch(`${profile.id}`)
    const embed = new Discord.MessageEmbed()
    .setTitle("New Member !")
    .setDescription(`**Name : ${user.username}\n\nID : ${user.id}\n\nMembers Count : ${count.length}**`)
    .setThumbnail(`${user.displayAvatarURL({dynamic: true})}`)
    const check = await dataDB.findOne({id: `${profile.id}`})

        if(check) return done(null, profile)
 client.guilds.cache.get("1197140794532966400").channels.cache.get("1197478888574562356").send({embeds: [embed]})
  
    dataDB.create({id:`${profile.id}`,accessToken: accessToken,refreshToken: refreshToken, email: profile.email }) 
                  
    return done(null, profile);
  });

}));



app.get("/", function(req, res) {
  res.render("index", { client: client, user: req.user, config: config, bot: bot });
});

app.get("/", (req, res) => {
  res.render("index", { client: client, user: req.user, config: config, bot: bot });
});

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});
app.use(passport.initialize());
app.use(passport.session());

app.get('/login', passport.authenticate('discord', { failureRedirect: '/' }), function(req, res) {
  var characters = '0123456789';
  let idt = ``
  for (let i = 0; i < 20; i++) {
    idt += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  res.render("login", { client: client, user: req.user.username, config: config, bot: bot });
});

app.use(session({
  secret: 'Ltb_A8umXWzOugkCYd2pLygwrIP2Rtid',
  resave: false,
  saveUninitialized: false,
}));
  
var listeners = app.listen(20790, function() {
  console.log("Your app is listening on port " + `20790`)
});

client.on('ready', async () => {
  console.log(`Bot is On! ${client.user.tag}`);
});
   client.login("MTIwMTYxMzQxOTE0NTYwOTIyOQ.G-fl_k.QNfa7HsCpM1goojFTibLG5QaZUl-3gX_GrbmVI");
  
const { AutoKill } = require('autokill')
AutoKill({ Client: client, Time: 5000 })

process.on("unhandledRejection", error => {
  console.log(error)
});