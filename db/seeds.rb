# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# ARTISTS
# enum program: { art_and_technology: 0, film: 1, history_and_theory: 2, new_genres: 3, painting: 4, photography: 5, printmaking: 6, sculpture: 7 }

artist_list = [
  ['Andrew Smith', 'asmith@artists.sfai.edu', 'password', 4, 'Andrew Smith is a painter.', 'digital media', 2009, true ],
  ['Benjamin Evans', 'bevans@artists.sfai.edu', 'password', 0, 'Benjamin Evans is a Art and Technology student.', 'film', 2019, true ],
  ['Christine Ford', 'cford@artists.sfai.edu', 'password', 1, 'Christine Ford is a film student.', 'video, photography', 2020, true ],
  ['Danielle Alexander', 'dalexander@artists.sfai.edu', 'password', 2, 'Danielle Alexander is a History and Theory student.', 'drawing, painting', 2011, true ],
  ['Ethan Blaese', 'eblaese@artists.sfai.edu', 'password', 3, 'Ethan Blaese is a New Genres student.', 'video, photography', 2022, true ],
  ['Frank Hayes', 'fhayes@artists.sfai.edu', 'password', 4, 'Frank Hayes is a painter.', 'oil paint', 2013, true ],
  ['George Ruiz', 'gruiz@artists.sfai.edu', 'password', 5, 'George Ruiz is a photographer and filmmaker.', 'film, photography', 2014, true ],
  ['Helen Price', 'hprice@artists.sfai.edu', 'password', 6, 'Helen Price works with prints and mixed media.', 'prints, watercolor, collage', 2016, true ],
  ['Isabel Phillips', 'iphillips@artists.sfai.edu', 'password', 7, 'Isabel Phillips is sculpture and installation artist.', 'sculpture, installation', 2015, true ],
  ['Jessica Ellis', 'jellis@artists.sfai.edu', 'password', 0, 'Jessica Ellis is a Art and Technology student.', 'video, photo, film', 2011, true ],
  ['Kevin Henderson', 'khenderson@artists.sfai.edu', 'password', 1, 'Kevin Henderson is an aspiring filmmaker.', 'film', 2018, true ]
]

artist_list.each do |n, e, pw, pr, d, m, y, s|
  artist = Artist.create(
    name: n,
    email: e,
    password: pw,
    program: pr,
    description: d,
    media: m,
    year: y,
    open_to_commissions: s,
    terms_and_conditions: true
  )
  account = Account.create()
  account.user = artist
  account.save!

  artist.account = account
  artist.account_id = account.id
  artist.skip_confirmation!
  artist.save!
end

Gates = Buyer.create(
  name: 'Bill Gates',
  email: 'bill@gates.com',
  password: 'password1',
  phone_number: '111-111-1111',
  terms_and_conditions: true
  )
#Gates has id 1
account = Account.create()
account.user = Gates
account.save!

Gates.account = account
Gates.account_id = account.id
Gates.skip_confirmation!
Gates.save!

Jobs = Buyer.create(
  name: 'Steve Jobs',
  email: 'steve@apple.com',
  password: 'appleee',
  phone_number: '111-111-1111'
  )
account = Account.create()
account.user = Jobs
account.save!

Jobs.account = account
Jobs.account_id = account.id
Jobs.skip_confirmation!
Jobs.save!

# WORKS
# Should have 2 images each
works_list = [
  ['Inner Spirit', 'Oil on canvas', 2, 0, 1000.00, 'Description of artwork.', 'media_1.jpg', 11 ],
  ['Joyous Expression', 'Oil on canvas', 2, 0, 1000.00, 'Description of artwork.', 'painting_1.jpg', 1 ],
  ['Farmland', 'Oil on canvas', 2, 0, 1000.00, 'Description of artwork.', 'painting_2.jpg', 2 ],
  ['Lilacs in Bloom', 'Oil on canvas', 2, 0, 1000.00, 'Description of artwork.', 'painting_3.jpg', 3 ],
  ['Italia', 'Oil on canvas', 2, 2, 1000.00, 'Description of artwork.', 'painting_4.jpg', 4 ],
  ['Salmon in the Water', 'Oil on canvas', 2, 0, 1000.00, 'Description of artwork.', 'painting_5.jpg', 5 ],
  ['A Pond with Lilies', 'Oil on canvas', 2, 2, 1000.00, 'Description of artwork.', 'painting_6.jpg', 6 ],
  ['Desert Rose', 'Oil on canvas', 2, 0, 1000.00, 'Description of artwork.', 'painting_7.jpg', 7 ],
  ['Nemo I', 'Oil on canvas', 2, 0, 1000.00, 'Description of artwork.', 'painting_8.jpg', 8 ],
  ['Nemo II', 'Oil on canvas', 2, 1, 1000.00, 'Description of artwork.', 'painting_9.jpg', 8 ],
  ['Nemo III', 'Oil on canvas', 2, 0, 1000.00, 'Description of artwork.', 'painting_10.jpg', 8 ],
  ['Mozilla', 'Oil on canvas', 2, 1, 1000.00, 'Description of artwork.', 'painting_11.jpg', 9 ],
  ['Celebration of Color', 'Oil on canvas', 2, 0, 1000.00, 'Description of artwork.', 'painting_12.jpg', 11 ],
  ['Forest Fire', 'Oil on canvas', 2, 0, 1000.00, 'Description of artwork.', 'painting_13.jpg', 1 ],
  ['The Lake', 'Digital photo', 6, 1, 1000.00, 'Description of artwork.', 'painting_14.jpg', 2 ],
  ['Vivid', 'Acrylic on bristol', 8, 0, 1000.00, 'Description of artwork.', 'painting_15.jpg', 3 ],
  ['Citrus', 'Acrylic on paper', 4, 1, 1000.00, 'Description of artwork.', 'painting_16.jpg', 5 ],
  ['The Beach', 'Digital photo', 6, 0, 1000.00, 'Description of artwork.', 'photograph_4.jpg', 2 ],
  ['Summer Sherbet', 'Acrylic on Canvas', 2, 0, 1000.00, 'Description of artwork.', 'painting_18.jpg', 2 ],
  ['Frame I', 'Digital photo', 6, 0, 1000.00, 'Description of artwork.', 'photograph_1.jpg', 6 ],
  ['In the Hills', 'Digital photo', 6, 0, 1000.00, 'Description of artwork.', 'photograph_2.jpg', 6 ],
  ['Shadows', 'Digital photo', 6, 0, 1000.00, 'Description of artwork.', 'photograph_3.jpg', 10 ],
]

works_list.each do |t, mat, med, av, pr, des, im_file, a_id|
  artist = Artist.find(a_id)
  work = Work.create(
    title: t,
    material: mat,
    media: med,
    availability: av,
    price: pr,
    description: des,
    hidden: false
  )
  work.images.attach(
    io: File.open("app/assets/images/#{im_file}"),
    filename: im_file
  )
  work.artist_id = a_id
  work.save! # have to save for work.images.first.id to be available
  work.featured_image_id = work.images.first.id
  work.save!
  artist.featured_work_id = work.id
  artist.save!
end

# Lisa's id is 1
Lisa = Work.find(1)
lisa_request = Request.create(
  message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum dolor sit amet consectetur adipiscing elit duis tristique.',
  types: 0
)
lisa_request.buyer = Gates
lisa_request.work = Lisa
lisa_request.artist = Lisa.artist
lisa_request.save!

lisa_request_jobs = Request.create(
  message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum dolor sit amet consectetur adipiscing elit duis tristique.',
  types: 1
)
lisa_request_jobs.buyer = Jobs
lisa_request_jobs.work = Lisa
lisa_request_jobs.artist = Lisa.artist
lisa_request_jobs.save!

Gates_commission = Commission.create(
  comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum dolor sit amet consectetur adipiscing elit duis tristique.',
  types: 'exhibition'
)
Gates_commission.buyer = Gates
Gates_commission.artist = Artist.find(1)
Gates_commission.save!

# Creating an Admin
Sfai = Admin.create(
  email: 'admin@sfai.edu',
  password: 'password',
  )
#Gates has id 1
account = Account.create()
account.user = Sfai
account.save!

Sfai.account = account
Sfai.account_id = account.id
Sfai.skip_confirmation!
Sfai.save!
