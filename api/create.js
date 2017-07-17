const request = require('request'),
      faker = require('faker')

for (let i=0;i<100;i++)
  request.post('http://localhost:3000/post').form({
    title: faker.lorem.words(5),
    text: faker.lorem.words(50),
  })
