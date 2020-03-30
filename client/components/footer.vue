<template>
  <div>
    <transition>
      <footer class="footer around" v-if="$store.state.created">
        <hr />
        <div class="contaner">
<<<<<<< HEAD
          <nuxt-link to="/" class="select_menu">Top</nuxt-link>
          <nuxt-link to="/report" class="select_menu">活動報告</nuxt-link>
          <nuxt-link to="/progress" class="select_menu">作品</nuxt-link>
          <nuxt-link to="/inquiry" class="select_menu">問い合わせ</nuxt-link>
        </div>
        <li class="mail-adress">
          <p>連絡先:tcu.ctrl@gmail.com</p>
        </li>
        <li class="rightlink">
          <a href="https://twitter.com/tcuctrl?ref_src=twsrc%5Etfw"
            ><img class="twitter_style" :src="twitter_img" alt="Twitter"
          /></a>
        </li>
=======
          <nuxt-link
            :to="to.to"
            class="select_menu"
            v-for="to in menu"
            :key="to.name"
            >{{ to.name }}</nuxt-link
          >
        </div>
        <div class="contaner center">
          <a href="https://twitter.com/tcuctrl?ref_src=twsrc%5Etfw"
            ><img class="icon_style" :src="twitter_img" alt="Twitter"
          /></a>
          <a href="mailto:tcu.ctrl@gmail.com">
            <img class="icon_style" alt="email" :src="gmail_img" />
          </a>
        </div>
>>>>>>> feature/footer
        <span class="copyright">&copy; 2019 CTRL web creater</span>
      </footer>
    </transition>
  </div>
</template>
<script>
<<<<<<< HEAD
import twitter_img from "~/assets/img/img5.jpg";
=======
import twitter_img from "~/static/twitter.png";
import gmail_img from "~/static/gmail.png";
>>>>>>> feature/footer

export default {
  props: {
    menu: Array
  },
  data() {
    return {
<<<<<<< HEAD
      twitter_img: twitter_img
=======
      twitter_img,
      gmail_img
>>>>>>> feature/footer
    };
  },
  name: "footer_component"
};
</script>
<style lang="scss" scoped>
.mail-adress {
  margin-top: 10%;
}
<<<<<<< HEAD
.contaner {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 25px 10%;
  a {
    flex: 1 1 200px;
    margin-bottom: 20px;
    text-align: center;
    font-size: 14px;
  }
}
=======
.around {
  justify-content: space-around;
  a {
  }
}

.contaner {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 30px 10%;
  @include mq() {
    flex-wrap: nowrap;
  }
}
.center {
  justify-content: center;
  a {
    margin: 10px;
    opacity: 0.6;
    &:hover {
      opacity: 1;
      transition: all 0.5s ease;
    }
  }
}
>>>>>>> feature/footer
.leftlink {
  margin-top: 20px;
  list-style: none;
}

.rightlink {
  list-style: none;
}

.copyright {
  font-size: 10px;
}

.select_menu {
  color: $mainchar;
  flex: 1 1 200px;
  margin-bottom: 0.2vw;
  text-align: center;
  font-size: 14px;
  text-decoration: none;
  font-weight: 300;
  padding: 10px;
  opacity: 0.6;
  &:hover {
    opacity: 1;
    transition: all 0.5s ease;
  }
}

.icon_style {
  width: 30px;
  height: auto;
}

//アニメーション制御だから触らないで
.v-enter {
  opacity: 0;
}
.v-enter-to {
  opacity: 1;
}
.v-enter-active {
  transition: all 2s;
}
</style>
