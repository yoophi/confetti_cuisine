"use strict";

const mongoose = require("mongoose"),
  { Schema } = mongoose,
  Subscriber = require("./subscriber"),
  userSchema = new Schema(
    {
      name: {
        first: { type: String, trim: true },
        last: { type: String, trim: true },
      },
      email: { type: String, required: true, lowercase: true, unique: true },
      zipCode: { type: Number, min: [10000, "Zip code too short"], max: 99999 },
      password: { type: String, required: true },
      courses: [
        {
          type: Schema.Types.ObjectId,
          ref: "Course",
        },
      ],
      subscribedAccount: [
        {
          type: Schema.Types.ObjectId,
          ref: "Subscriber",
        },
      ],
    },
    {
      timestamps: true,
    }
  );
const bcrypt = require("bcrypt");

userSchema.virtual("fullName").get(function () {
  return `${this.name.first} ${this.name.last}`;
});

userSchema.pre("save", function (next) {
  let user = this;
  if (user.subscribedAccount === undefined) {
    Subscriber.findOne({
      email: user.email,
    })
      .then((subscriber) => {
        user.subscribedAccount = subscriber;
        next();
      })
      .catch((error) => {
        console.log(`Error in connection subscriber: ${error.message}`);
        next(error);
      });
  } else {
    next();
  }
});

userSchema.pre("save", function (next) {
  let user = this;
  bcrypt
    .hash(user.password, 10)
    .then((hash) => {
      user.password = hash;
      next();
    })
    .catch((error) => {
      console.log(`Error in hashing password: ${error.message}`);
      next(error);
    });
});

userSchema.pre("findOneAndUpdate", function (next) {
  let that = this;
  console.log("findOneAndUpdate", that);
  try {
    if (that._update.$set.password) {
      bcrypt
        .hash(this._update.$set.password, 10)
        .then((hash) => {
          that._update.$set.password = hash;
          next();
        })
        .catch((error) => {
          console.log(`Error in hashing password: ${error.message}`);
          next(error);
        });
    }
  } catch (e) {
    console.log(`error: ${e}`);
  }
});

userSchema.methods.passwordComparison = function (inputPassword) {
  let user = this;
  return bcrypt.compare(inputPassword, user.password);
};

module.exports = mongoose.model("User", userSchema);
