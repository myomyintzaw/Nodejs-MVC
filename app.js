const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const multer = require('multer')


const app = express();
app.set('view engine', 'ejs');
// app.use(express.static('./public'));
app.use(express.static("public"));
app.use("/css", express.static("dist"));

app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
// app.set(express.static(path.join(__dirname, 'public')));

app.use(userRoutes);
app.use(postRoutes);
app.use(categoryRoutes);

app.get('/', (req, res) => {
    res.render('index')
})

//Start the server
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});