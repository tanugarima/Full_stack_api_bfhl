
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;
    if (!Array.isArray(data)) {
      return res.status(400).json({ is_success: false, message: 'Invalid input: data must be an array' });
    }

    const even_numbers = [];
    const odd_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sum = 0;
    let all_alpha_chars = [];

    data.forEach(item => {
      if (/^\d+$/.test(item)) {
        const num = parseInt(item, 10);
        sum += num;
        if (num % 2 === 0) {
          even_numbers.push(item);
        } else {
          odd_numbers.push(item);
        }
      } else if (/^[a-zA-Z]+$/.test(item)) {
        const upper = item.toUpperCase();
        alphabets.push(upper);
        all_alpha_chars = all_alpha_chars.concat(upper.split(''));
      } else {
        special_characters.push(item);
      }
    });

    all_alpha_chars.reverse();
    let concat_string = '';
    all_alpha_chars.forEach((char, index) => {
      if (index % 2 === 0) {
        concat_string += char.toUpperCase();
      } else {
        concat_string += char.toLowerCase();
      }
    });

    const full_name = 'Garima Mangal'; 
    const dob = '25092004'; 
    const user_id = `${full_name.toLowerCase()}_${dob}`;
    const email = 'garima.mangal2022@vitstudent.ac.in';
    const roll_number = '22BCT0255'; 

    res.status(200).json({
      is_success: true,
      user_id,
      email,
      roll_number,
      even_numbers,
      odd_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string
    });
  } catch (error) {
    res.status(500).json({ is_success: false, message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get('/', (req, res) => {
  res.send('Welcome to the BFHL API! Send a POST request to /bfhl with JSON data.');
});
app.get('/bfhl', (req, res) => {
  res.send('BFHL API Endpoint: Use a POST request to /bfhl with JSON data.');
});