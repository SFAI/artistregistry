# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_11_02_032041) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "artists", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "program"
    t.string "name"
    t.boolean "open_to_commissions"
    t.index ["email"], name: "index_artists_on_email", unique: true
    t.index ["reset_password_token"], name: "index_artists_on_reset_password_token", unique: true
  end

  create_table "attachments", force: :cascade do |t|
    t.string "image_file_name"
    t.string "image_content_type"
    t.integer "image_file_size"
    t.datetime "image_updated_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "work_id"
    t.index ["work_id"], name: "index_attachments_on_work_id"
  end

  create_table "buyers", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.string "phone_number"
    t.index ["email"], name: "index_buyers_on_email", unique: true
    t.index ["reset_password_token"], name: "index_buyers_on_reset_password_token", unique: true
  end

  create_table "commissions", force: :cascade do |t|
    t.text "comment"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "artist_id"
    t.bigint "buyer_id"
    t.index ["artist_id"], name: "index_commissions_on_artist_id"
    t.index ["buyer_id"], name: "index_commissions_on_buyer_id"
  end

  create_table "requests", force: :cascade do |t|
    t.text "message"
    t.bigint "buyer_id"
    t.bigint "work_id"
    t.bigint "artist_id"
    t.index ["artist_id"], name: "index_requests_on_artist_id"
    t.index ["buyer_id"], name: "index_requests_on_buyer_id"
    t.index ["work_id"], name: "index_requests_on_work_id"
  end

  create_table "works", force: :cascade do |t|
    t.string "title"
    t.text "material"
    t.integer "medium"
    t.integer "availability"
    t.decimal "price"
    t.bigint "artist_id", null: false
    t.index ["artist_id"], name: "index_works_on_artist_id"
  end

  add_foreign_key "attachments", "works"
  add_foreign_key "commissions", "artists"
  add_foreign_key "commissions", "buyers"
  add_foreign_key "requests", "artists"
  add_foreign_key "requests", "buyers"
  add_foreign_key "requests", "works"
  add_foreign_key "works", "artists"
end
