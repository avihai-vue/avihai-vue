export default {
  props: {
    name: {
      type: String,
      required: true,
      validator(value) {
        return value.length > 0;
      },
    },
    price: {
      type: Number,
      required: true,
      validator(value) {
        return value > 0;
      },
    },
    quantity: {
      type: Number,
      required: true,
      validator(value) {
        return value >= 0;
      },
    },
    Currency: {
      type: String,
      required: true,
      validator(value) {
        return ['USD', 'EUR'].includes(value);
      },
    },
  },
};
