const { PrismaClient } = require("@prisma/client"),
      prisma = new PrismaClient(),
      bcrypt = require("bcrypt"),
      LocalStrategy = require("passport-local").Strategy;

module.exports = new LocalStrategy(
  {
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true,
    session: false
  },
  async (req, userName, passWord, done) => {
    try{
      //ログインID(userName)と一致するユーザを検索
      const users = await prisma.users.findMany({
        where: { username: userName}
      });
      
      //検索結果が0件ならreturn
      if(users.length === 0){
        await prisma.$disconnect;
        //console.log("user missing");
        return done(null, false, { message: "ユーザ名が間違っています。" });
      }
  
      //1件以上の検索結果に対してパスワードの照合を行う
      //パスワードが一致したユーザをreturn
      for await(let user of users){
        let checkPw = await bcrypt.compareSync(passWord, user.password);
        if(checkPw) {
          await prisma.$disconnect;
          return done(null, user);
        }
      }
      
      //パスワードの照合にすべて失敗したらreturn
      //console.log("password missing");
      await prisma.$disconnect;
      return done(null, false, { message: "パスワードが間違っています。" });

    }catch(err){
      await prisma.$disconnect;
      console.log(err.message);
      return done(err);
    }
  }
);
