# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Picasso = Artist.create(
  id: 0,
  name: 'Picasso',
  email: 'picasso@artists.sfai.edu',
  password: 'password',
  program: 'art',
  description: 'bleh',
  genres: 'bleh',
  open_to_commissions: true
  )
#Picasso has id 0
Picasso.skip_confirmation!
Picasso.save!

Kahlo = Artist.create(
  id: 1,
  name: 'Frida Kahlo',
  email: 'fkahlo@artists.sfai.edu',
  password: 'password',
  program: 'art',
  description: 'bleh',
  genres: 'bleh',
  open_to_commissions: true
  )
Kahlo.skip_confirmation!
Kahlo.save!

Matisse = Artist.create(
  id: 3,
  name: 'Matisse',
  email: 'henri@artists.sfai.edu',
  password: 'password',
  program: 'art',
  description: 'bleh',
  genres: 'bleh',
  open_to_commissions: true
  )
Matisse.skip_confirmation!
Matisse.save!

Gates = Buyer.create(
  id:0,
  name: 'Bill Gates',
  email: 'bill@gates.com',
  password: 'password1',
  phone_number: '111-111-1111'
  )
#Gates has id 1
Gates.skip_confirmation!
Gates.save!

Jobs = Buyer.create(
  id:1,
  name: 'Steve Jobs',
  email: 'steve@apple.com',
  password: 'appleee',
  phone_number: '111-111-1111'
  )
#Gates has id 1
Jobs.skip_confirmation!
Jobs.save!

Lisa = Picasso.works.create(
  id: 0,
  title: 'Mona Lisa',
  material: 'Oil on canvas',
  medium: 0,
  availability: 0,
  price: 43.45,
  description: "Some really cool stuff"
)
Lisa.images.attach(
  io: File.open('app/assets/images/IMG_3294.jpg'),
  filename: 'IMG_3294'
)
Lisa.images.attach(
  io: File.open('app/assets/images/IMG_3300.jpg'),
  filename: 'IMG_3300'
)
Lisa.featured_image_id = Lisa.images.first.id
Lisa.artist_id = Picasso.id
Lisa.save!

Picasso.featured_work_id = Lisa.id
Picasso.save!

#Lisa's id is 1
lisa_request = Request.create(
  message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum dolor sit amet consectetur adipiscing elit duis tristique.',
  types: 0
  )
lisa_request.buyer = Gates
lisa_request.work = Lisa
lisa_request.artist = Lisa.artist
lisa_request.save!

lisa_request_jobs = Request.create(
  message: 'I would like to request the Mona Lisa as well',
  types: 1
  )
lisa_request_jobs.buyer = Jobs
lisa_request_jobs.work = Lisa
lisa_request_jobs.artist = Lisa.artist
lisa_request_jobs.save!

Gates_commission_Picasso = Commission.create(
  comment: 'Picasso, please paint me a portrait',
  types: 'exhibition'
)
Gates_commission_Picasso.buyer = Gates
Gates_commission_Picasso.artist = Picasso
Gates_commission_Picasso.save!
