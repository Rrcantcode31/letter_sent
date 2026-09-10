const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up Handlebars view engine with defaultLayout set to false
app.engine('hbs', engine({ 
    extname: '.hbs',
    defaultLayout: false 
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'view'));

// Serve static files (CSS, client JS) from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Import and use your custom page routes
const pageRoutes = require('./routes/pages');
app.use('/', pageRoutes);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});