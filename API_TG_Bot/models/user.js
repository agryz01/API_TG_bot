const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: (value) => {
        if (validator.isEmail(value)) {
          return true;
        }
        return false;
      },
    },
    gender: {
      type: String,
      enum: ['м', 'ж'],
    },
    age: {
      type: Number,
    },
    city: {
      type: String,
    },
    firstName: {
      type: String,
    },
    graphStatus:[Number],
    // graphStatus: {
    //   day1: {
    //     type: Number,
    //   },
    //   day2: {
    //     type: Number,
    //   },
    //   day3: {
    //     type: Number,
    //   },
    //   day4: {
    //     type: Number,
    //   },
    //   day5: {
    //     type: Number,
    //   },
    //   day6: {
    //     type: Number,
    //   },
    //   day7: {
    //     type: Number,
    //   },
    //   day8: {
    //     type: Number,
    //   },
    //   day9: {
    //     type: Number,
    //   },
    //   day10: {
    //     type: Number,
    //   },
    //   day11: {
    //     type: Number,
    //   },
    //   day12: {
    //     type: Number,
    //   },
    //   day13: {
    //     type: Number,
    //   },
    //   day14: {
    //     type: Number,
    //   },
    //   day15: {
    //     type: Number,
    //   },
    //   day16: {
    //     type: Number,
    //   },
    //   day17: {
    //     type: Number,
    //   },
    //   day18: {
    //     type: Number,
    //   },
    //   day19: {
    //     type: Number,
    //   },
    //   day20: {
    //     type: Number,
    //   },
    //   day21: {
    //     type: Number,
    //   },
    //   day22: {
    //     type: Number,
    //   },
    //   day23: {
    //     type: Number,
    //   },
    //   day24: {
    //     type: Number,
    //   },
    //   day25: {
    //     type: Number,
    //   },
    //   day26: {
    //     type: Number,
    //   },
    //   day27: {
    //     type: Number,
    //   },
    //   day28: {
    //     type: Number,
    //   },
    //   day29: {
    //     type: Number,
    //   },
    //   day30: {
    //     type: Number,
    //   },
    // },
    events: {
      day1: {
        type: String,
      },
      day2: {
        type: String,
      },
      day3: {
        type: String,
      },
      day4: {
        type: String,
      },
      day5: {
        type: String,
      },
      day6: {
        type: String,
      },
      day7: {
        type: String,
      },
      day8: {
        type: String,
      },
      day9: {
        type: String,
      },
      day10: {
        type: String,
      },
      day11: {
        type: String,
      },
      day12: {
        type: String,
      },
      day13: {
        type: String,
      },
      day14: {
        type: String,
      },
      day15: {
        type: String,
      },
      day16: {
        type: String,
      },
      day17: {
        type: String,
      },
      day18: {
        type: String,
      },
      day19: {
        type: String,
      },
      day20: {
        type: String,
      },
      day21: {
        type: String,
      },
      day22: {
        type: String,
      },
      day23: {
        type: String,
      },
      day24: {
        type: String,
      },
      day25: {
        type: String,
      },
      day26: {
        type: String,
      },
      day27: {
        type: String,
      },
      day28: {
        type: String,
      },
      day29: {
        type: String,
      },
      day30: {
        type: String,
      },
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('user', userSchema);
