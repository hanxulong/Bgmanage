<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/cate' }">分类管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类{{ tip }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      style="width: 400px"
      label-width="80px"
      ref="cateform"
      :model="info"
      :rules="rules"
    >
      <el-form-item label="上级分类" prop="pid">
        <el-select v-model="info.pid">
          <el-option label="顶级分类" :value="0"></el-option>
          <el-option
            v-for="item in arr"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="分类名称">
        <el-input
          placeholder="请输入分类名称"
          v-model="info.catename"
        ></el-input>
      </el-form-item>

      <el-form-item label="图片" v-if="info.pid != 0">
        <el-upload
          action="#"
          list-type="picture-card"
          :auto-upload="false"
          :on-change="fileChange"
          :file-list="fileList"
        >
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{ file }">
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url"
              alt=""
            />
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
              >
                <i class="el-icon-zoom-in"></i>
              </span>
              <span class="el-upload-list__item-delete" @click="handleRemove">
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>

      <el-form-item label="状态">
        <el-switch
          v-model="info.status"
          :active-value="1"
          :inactive-value="2"
        ></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      dialogImageUrl: "",
      tip: "添加",
      info: {
        pid: "",
        catename: "",
        img: "",
        status: 1,
      },
      rules: {
        pid: [{ required: true, message: "请选择上级分类" }],
        catename: [
          {
            required: true,
            message: "请填写分类名称",
          },
        ],
      },
      arr: [],
      fileList: [],
    };
  },
  methods: {
    handleRemove() {
      this.fileList = [];
    },
    handlePictureCardPreview(file) {
      this.dialogVisible = true;
      this.dialogImageUrl = file.url;
    },
    fileChange(file) {
      this.info.img = file.raw;
    },
    submit() {
      this.$refs["cateform"].validate((val) => {
        if (val) {
          //验证成功，调用接口
          var url = "/api/cateadd";
          if (this.$route.params.id) {
            url = "/api/cateedit";
            this.info.id = this.$route.params.id;
          }
          var data = new FormData(); //空表单
          for (let i in this.info) {
            data.append(i, this.info[i]);
          }
          this.axios.post(url, data).then((res) => {
            if (res.data.code === 200) {
              alert("操作成功");
              this.$router.push("/cate");
            } else {
              alert(res.data.msg);
            }
          });
        }
      });
    },
  },
  mounted() {
    if (this.$route.params.id) {
      this.tip = "编辑";
      this.axios
        .get("/api/cateinfo", { params: { id: this.$route.params.id } })
        .then((res) => {
          this.info = res.data.list;
          this.fileList = [{ url: this.info.img }];
        });
    }
    this.axios.get("/api/catelist").then((res) => {
      this.arr = res.data.list;
    });
  },
};
</script>
<style scoped>
</style>
