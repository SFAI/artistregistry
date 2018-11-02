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
  email: 'picasso@picasso.com',
  password: 'password',
  program: 'art',
  open_to_commissions: true
  )
#Picasso has id 0
Picasso.save!

Kahlo = Artist.create(
  id: 1,
  name: 'Frida Kahlo',
  email: 'fkahlo@fkahlo.com',
  password: 'password',
  program: 'art',
  open_to_commissions: true
  )
Kahlo.save!

Matisse = Artist.create(
  id: 3,
  name: 'Matisse',
  email: 'henri@Matisse.com',
  password: 'password',
  program: 'art',
  open_to_commissions: true
  )
Matisse.save!

Gates = Buyer.create(
  id:0,
  name: 'Bill Gates',
  email: 'bill@gates.com',
  password: 'password1',
  phone_number: '111-111-1111'
  )
#Gates has id 1
Gates.save!

Jobs = Buyer.create(
  id:2,
  name: 'Steve Jobs',
  email: 'steve@apple.com',
  password: 'appleee',
  phone_number: '111-111-1111'
  )
#Gates has id 1
Jobs.save!

Lisa = Picasso.works.create(
  title: 'Mona Lisa',
  material: 'Oil on canvas',
  medium: 0,
  availability: 0,
  price: 43.45
  )
Lisa.artist_id = Picasso.id
Lisa.save!

TwoFridas = Work.create(
  title: 'The Two Fridas',
  material: 'Oil on canvas',
  medium: 0,
  availability: 0,
  price: 123.45,
  artist_id: Kahlo.id,
  )
TwoFridas.save!

Oceania = Work.create(
  title: 'Memory of Oceania',
  material: 'Cutout',
  medium: 5,
  availability: 0,
  price: 234.56,
  artist_id: Matisse.id,
  )
Oceania.save!

TwoDancers = Work.create(
  title: 'Two Dancers',
  material: 'Cutout',
  medium: 5,
  availability: 0,
  price: 4578.90,
  artist_id: Matisse.id,
  )
TwoDancers.save!

#Lisa's id is 1
lisa_request = Request.create(

  message: 'I would like to request the Mona Lisa'
  )
lisa_request.buyer = Gates
lisa_request.work = Lisa
lisa_request.artist = Lisa.artist
lisa_request.save!

lisa_request_jobs = Request.create(

  message: 'I would like to request the Mona Lisa as well'
  )
lisa_request_jobs.buyer = Jobs
lisa_request_jobs.work = Lisa
lisa_request_jobs.artist = Lisa.artist
lisa_request_jobs.save!
<<<<<<< HEAD
=======

Gates_commission_Picasso = Commission.create(
  comment: 'Picasso, please paint me a portrait'
)
Gates_commission_Picasso.buyer = Gates
Gates_commission_Picasso.artist = Picasso
Gates_commission_Picasso.save!
>>>>>>> master
