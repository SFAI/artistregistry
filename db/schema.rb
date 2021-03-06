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

ActiveRecord::Schema.define(version: 2019_05_08_070200) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accounts", force: :cascade do |t|
    t.string "user_type"
    t.bigint "user_id"
    t.index ["user_type", "user_id"], name: "index_accounts_on_user_type_and_user_id"
  end

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "admins", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.bigint "account_id"
    t.index ["account_id"], name: "index_admins_on_account_id"
    t.index ["confirmation_token"], name: "index_admins_on_confirmation_token", unique: true
    t.index ["email"], name: "index_admins_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admins_on_reset_password_token", unique: true
  end

  create_table "artists", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.boolean "open_to_commissions"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.integer "featured_work_id"
    t.string "description"
    t.string "media"
    t.integer "year"
    t.boolean "terms_and_conditions"
    t.bigint "account_id"
    t.datetime "locked_at"
    t.boolean "hidden", default: false
    t.integer "degree", default: 0
    t.string "program", default: [], array: true
    t.index ["account_id"], name: "index_artists_on_account_id"
    t.index ["confirmation_token"], name: "index_artists_on_confirmation_token", unique: true
    t.index ["email"], name: "index_artists_on_email", unique: true
    t.index ["reset_password_token"], name: "index_artists_on_reset_password_token", unique: true
  end

  create_table "blocks", force: :cascade do |t|
    t.integer "blocker_id", null: false
    t.integer "blocked_id", null: false
    t.index ["blocked_id", "blocker_id"], name: "index_blocks_on_blocked_id_and_blocker_id", unique: true
    t.index ["blocked_id"], name: "index_blocks_on_blocked_id"
    t.index ["blocker_id"], name: "index_blocks_on_blocker_id"
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
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.boolean "terms_and_conditions"
    t.bigint "account_id"
    t.datetime "locked_at"
    t.index ["account_id"], name: "index_buyers_on_account_id"
    t.index ["confirmation_token"], name: "index_buyers_on_confirmation_token", unique: true
    t.index ["email"], name: "index_buyers_on_email", unique: true
    t.index ["reset_password_token"], name: "index_buyers_on_reset_password_token", unique: true
  end

  create_table "commissions", force: :cascade do |t|
    t.text "comment"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "artist_id"
    t.bigint "buyer_id"
    t.integer "types"
    t.boolean "deleted"
    t.index ["artist_id"], name: "index_commissions_on_artist_id"
    t.index ["buyer_id"], name: "index_commissions_on_buyer_id"
  end

  create_table "receipts", force: :cascade do |t|
    t.integer "transaction_type"
    t.date "start_date"
    t.date "end_date"
    t.date "purchase_date"
    t.decimal "price"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "comment"
    t.bigint "request_id"
    t.index ["request_id"], name: "index_receipts_on_request_id"
  end

  create_table "requests", force: :cascade do |t|
    t.text "message"
    t.bigint "buyer_id"
    t.bigint "work_id"
    t.bigint "artist_id"
    t.boolean "open", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "receipt_id"
    t.integer "types"
    t.boolean "deleted"
    t.index ["artist_id"], name: "index_requests_on_artist_id"
    t.index ["buyer_id"], name: "index_requests_on_buyer_id"
    t.index ["receipt_id"], name: "index_requests_on_receipt_id"
    t.index ["work_id"], name: "index_requests_on_work_id"
  end

  create_table "works", force: :cascade do |t|
    t.string "title"
    t.text "material"
    t.integer "media"
    t.integer "availability"
    t.decimal "price"
    t.bigint "artist_id", null: false
    t.string "description"
    t.integer "featured_image_id"
    t.boolean "hidden", default: false
    t.string "links"
    t.integer "year"
    t.string "dimensions"
    t.index ["artist_id"], name: "index_works_on_artist_id"
  end

  add_foreign_key "commissions", "artists"
  add_foreign_key "commissions", "buyers"
  add_foreign_key "receipts", "requests"
  add_foreign_key "requests", "artists"
  add_foreign_key "requests", "buyers"
  add_foreign_key "requests", "receipts"
  add_foreign_key "requests", "works"
  add_foreign_key "works", "artists"
end
