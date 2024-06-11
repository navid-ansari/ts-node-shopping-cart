export const ProductFixture = (override = {}) => (
    {
        name: "Mobile",
        title: "Touch screen mobile",
        price: 200,
        description: "Touch screen smartphone with 2 GB ram",
        category: "Electronics",
        image: "http://imagepath.com/imageid",
        ...override
    }
)