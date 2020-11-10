require('dotenv').config();
const express = require('express');

/**
 * @author KEHL Johann <jkehl.dev@gmail.com>
 * @version 1.0.0
 * @description Main app module. Configure Express HTTP web server.
 */
const app = express();

app.use(express.urlencoded({
    extended: true
}));

// TABLE ROUTING
const router_list = require('./app/routers/router_list');
app.use('/list', router_list);

const http = require('http');
const APP_PORT_HTTP = process.env.PORT_HTTP;
http.createServer(app).listen(APP_PORT_HTTP);
