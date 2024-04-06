require("dotenv").config();
const userModel = require('./models/Core Models/User.js');
const activityModel = require('./models/Core Models/Activity.js');
const activePlansModel = require('./models/Relational Models/ActivePlans.js');
const supplementsModel = require('./models/Core Models/Supplements.js');
const suppsBoughtModel = require('./models/Relational Models/SuppsBought.js');
const fitnessModel = require('./models/Core Models/Fitness.js');
const indumentaryModel = require('./models/Core Models/Indumentary.js');
const indumentaryBoughtModel = require('./models/Relational Models/IndumentaryBought.js');
const fitnessBoughtModel = require('./models/Relational Models/FitnessBought.js');
const carritoModel = require('./models/Core Models/Carrito.js');
const { Sequelize } = require("sequelize");
const { DATABASE_URL, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;
const isLocal = false;

let sequelize = null;
// const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/healthy`,{ logging: false, native: false })

isLocal === true
?  sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/healthy`,{ logging: false, native: false })
:  sequelize = new Sequelize(DATABASE_URL, {logging: false,native: false,})

sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión exitosa');
  })
  .catch((err) => {
    console.error('Error al conectar:', err);
  });

// RELATIONAL MODELS
userModel(sequelize);
activityModel(sequelize);
supplementsModel(sequelize);
indumentaryModel(sequelize);
fitnessModel(sequelize);

// CORE MODELS
activePlansModel(sequelize);
suppsBoughtModel(sequelize);
indumentaryBoughtModel(sequelize);
fitnessBoughtModel(sequelize);
carritoModel(sequelize);

const {
  User,  Activity, Supplements, Indumentary, Fitness, Carrito,
  SuppsBought, ActivePlans, IndumentaryBought, FitnessBought
} = sequelize.models;

// RELACIONES           [ USER / ACTIVITY ]
User.belongsToMany(Activity, { through: ActivePlans});
Activity.belongsToMany(User, { through: ActivePlans});

// RELACIONES           [ USER / SUPPS ]
User.belongsToMany(Supplements, {through: SuppsBought } );
Supplements.belongsToMany(User, {through: SuppsBought } );

// RELACIONES           [ USER / ACTIVITY ]
User.belongsToMany(Indumentary, { through: IndumentaryBought});
Indumentary.belongsToMany(User, { through: IndumentaryBought});

// RELACIONES           [ USER / ACTIVITY ]
User.belongsToMany(Fitness, { through: FitnessBought});
Fitness.belongsToMany(User, { through: FitnessBought});

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
  isLocal,
};
