import express from 'express';

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(express.static('public'));

app.get('route', (req, res) => {});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
