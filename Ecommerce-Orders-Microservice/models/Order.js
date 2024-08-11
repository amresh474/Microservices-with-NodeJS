export default (sequelize, DataTypes) => {
    const Orders = sequelize.define("Orders", {
      userId: {
        type: DataTypes.STRING,
      },
  
      orderId: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
  
      products: {
        type: DataTypes.JSON,
      },
  
      amount: {
        type: DataTypes.INTEGER,
      },
  
      status: {
        type: DataTypes.STRING,
        enum: ["Pending", "Delivering", "Delivered"],
        defaultValue: "Pending",
      },
    });
  
    return Orders;
  };