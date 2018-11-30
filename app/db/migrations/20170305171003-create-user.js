module.exports = {
    up: (queryInterface, Sequelize) =>
      queryInterface.createTable('users', {
        id: {
          allowNull: false,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV1,
          primaryKey: true
        },
        firstName: {
          type: Sequelize.STRING(64)
        },
        lastName: {
          type: Sequelize.STRING(64)
        },
        email: {
          allowNull: false,
          type: Sequelize.STRING(50),
          unique: true
        },
        phone: {
          type: Sequelize.STRING(20)
        },
        password: {
          allowNull: false,
          type: Sequelize.STRING(255)
        },
        avatar: {
          type: Sequelize.STRING(64)
        },
        resetToken: {
          type: Sequelize.STRING(64)
        },
        resetTokenSentAt: {
          type: Sequelize.DATE
        },
        resetTokenExpireAt: {
          type: Sequelize.DATE
        },
        status: {
          allowNull: false,
          defaultValue: 'pending',
          type: Sequelize.STRING(64)
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      })
    ,
    down: (queryInterface, Sequelize) => queryInterface.dropTable('users')
}
