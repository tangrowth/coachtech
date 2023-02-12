<template>
  <div class="flex">
    <div class="left">
      <SideNav />
    </div>
    <div class="right">
      <div class="title">
        <p>コメント</p>
      </div>
      <Message
        v-if="post"
        :post="post"
        :uid="uid"
        @like="like"
        @unlike="unlike"
        @deletePost="deletePost"
      />
      <div v-if="post" class="comment">
        <div class="comment-title">
          <p>コメント</p>
        </div>
        <div class="message" v-for="comment in post.comments" :key="comment.id">
          <div class="flex">
            <p class="name">{{ comment.user.name }}</p>
          </div>
          <div>
            <p class="text">{{ comment.comment }}</p>
          </div>
        </div>
        <validation-observer ref="obs" v-slot="ObserverProps">
          <validation-provider v-slot="{ errors }" rules="required|max:120">
            <input v-model="content" type="text" name="コメント">
            <div class="error">{{ errors[0] }}</div>
          </validation-provider>
          <button @click="postComment" :disabled="ObserverProps.invalid||!ObserverProps.validated">コメント</button>
        </validation-observer>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";
export default {
  data() {
    return {
      post: null,
      uid: null,
      content: null,
    };
  },
  methods: {
    async fetchPost() {
      const { data } = await this.$axios.get(
        `http://localhost:8000/api/v1/post/${this.$route.params.id}`
      );
      this.post = data.post;
    },
    fetchData() {
      firebase.auth().onAuthStateChanged(async (user) => {
        this.uid = user.uid;
        this.fetchPost();
      });
    },
    async postComment() {
      const { data } = await this.$axios.post(
        "http://localhost:8000/api/v1/comment",
        {
          post_id: this.post.id,
          user_id: this.uid,
          comment: this.content,
        }
      );
      this.post.comments.push(data.comment);
      this.content = "";
    },
    async like() {

      const { data } = await this.$axios.post(
        "http://localhost:8000/api/v1/like",
        {
          post_id: this.post.id,
          user_id: this.uid,
        }
      );
      this.post.likes.push(data.like);
    },
    async unlike() {
      const findLike = this.post.likes.find(
        (like) => like.user_id === this.uid
      );
      await this.$axios.delete(
        `http://localhost:8000/api/v1/like/${findLike.id}`
      );

      const findLikeIdx = this.post.likes.findIndex(
        (like) => like.id === findLike.id
      );
      this.post.likes.splice(findLikeIdx, 1);
    },
    async deletePost(event) {
      await this.$axios.delete(`http://localhost:8000/api/v1/post/${event.id}`);
      this.$router.push("/");
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style scoped>
.left {
  width: 22%;
  height: 100vh;
}
.right {
  width: 78%;
  height: 100vh;
}
.flex {
  display: flex;
}
.title {
  border-bottom: 1px solid white;
  border-left: 1px solid white;
  padding: 15px;
}
.title p {
  font-size: 20px;
  font-weight: bold;
}
.comment-title {
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid white;
  border-left: 1px solid white;
}
.comment input {
  width: 95%;
  height: 30px;
  margin-top: 20px;
  margin-bottom: 15px;
  margin-left: 10px;
  border-radius: 10px;
  border: 1px solid white;
  background-color: #15202b;
  color: white;
}
.message {
  padding-top: 10px;
  padding-left: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid white;
  border-left: 1px solid white;
}
.text {
  margin-top: 10px;
  font-size: 10px;
}
button {
  width: 100px;
  text-align: center;
  padding: 8px 0 10px;
  color: #fff;
  background-color: #5419da;
  border-radius: 25px;
  display: block;
  margin: 0 0 0 auto;
  cursor: pointer;
}
.error {
  color: red;
}
</style>
