<template>
  <div class="message">
    <div class="flex">
      <p class="name">{{ post.user.name }}</p>
      <img class="icon" src="../assets/heart.png" @click="handleToggleLike" />
      <p class="number">{{ post.likes.length }}</p>
      <img class="icon" src="../assets/cross.png" @click="emitDeletePost" />
      <img
        class="icon detail"
        src="../assets/detail.png"
        @click="goPostDetail"
        v-if="$route.name === 'index'"
      />
    </div>
    <p class="text">{{ post.content }}</p>
  </div>
</template>

<script>
export default {
  props: {
    post: Object,
    uid: String,
  },
  methods: {
    async handleToggleLike() {
      if (this.isLiked()) {
        this.$emit("unlike");
      } else {
        this.$emit("like");
      }
    },
    isLiked() {
      const userIds = this.post.likes.map((like) => like.user_id);
      return userIds.includes(this.uid);
    },
    emitDeletePost() {
      this.$emit("deletePost", this.post);
    },
    goPostDetail() {
      this.$router.push(`/posts/${this.post.id}`);
    },
  },
};
</script>

<style scoped>
.flex {
  display: flex;
  align-items: center;
}
.icon {
  width: 25px;
  height: 25px;
  cursor: pointer;
}
.detail {
  margin-left: 50px;
}
.message {
  padding: 20px;
  border-bottom: solid 1px white;
  border-left: solid 1px white;
}
.name {
  font-size: 18px;
  font-weight: bold;
  margin-right: 10px;
}
.text {
  margin-top: 10px;
}
.number {
  margin-left: 10px;
  margin-right: 10px;
}
</style>