module.exports = {
  theme: {
    extend: {
      keyframes: {
        rotate: {
          from: { transform: "rotate(0)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        rotate: "rotate 5s linear infinite forwards",
      },
    },
  },
};
