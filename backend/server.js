const app = require("./app");

const PORT =
process.env.PORT || 3002;

app.listen(PORT, () => {

    console.log(
        `Server Running On Port ${PORT}`
    );

});