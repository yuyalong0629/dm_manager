import { Component, Vue } from 'vue-property-decorator'

interface FileList {
  [key: string]: string
}

@Component
export default class Upload extends Vue {
  private fileList!: FileList[]

  private data() {
    return {
      previewVisible: false,
      previewImage: '',
      fileList: [
        {
          uid: '-1',
          name: 'xxx.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        }
      ]
    }
  }

  private handleChange({ fileList }: any) {
    this.fileList = fileList
  }

  public render() {
    return (
      <a-upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={this.fileList}
        on-change={this.handleChange}
      >
        {
          this.fileList.length < 1 ? <div>
            <a-icon type="plus" />
            <div class="ant-upload-text">上传图片</div>
          </div> : ''
        }
      </a-upload>
    )
  }
}
