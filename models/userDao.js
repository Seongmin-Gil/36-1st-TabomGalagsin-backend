const { database } = require('./database');

const selectEmail = async email => {
  const [{ result }] = await database.query(
    `
    SELECT EXISTS(
      SELECT 
        email 
      from users 
      WHERE email = ?
    ) AS result`,
    [email]
  );
  console.log(result);
  return result;
};

const insertUser = async (firstName, lastName, nickName, email, address, password) => {
  return await database.query(
    `
    INSERT INTO users(
      first_name, 
      last_name, 
      nick_name, 
      email,
      address,
      password
    ) VALUES (?, ?, ?, ?, ?, ?)`,
    [firstName, lastName, nickName, email, address, password]
  );
};

const selectUserId = async email => {
  const [{ userId }] = await database.query(
    `
    SELECT 
      id userId
    FROM users
    WHERE email = ?`,
    [email]
  );
  return userId;
};

const selectPassword = async email => {
  const [{ password }] = await database.query(
    `
    SELECT 
      password
    FROM users
    WHERE email = ?`,
    [email]
  );
  return password;
};

module.exports = {
  insertUser,
  selectPassword,
  selectEmail,
  selectUserId,
};
