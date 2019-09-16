import moment from 'moment';

class Post {
  title
  description
  coverImage
  path
  publishDate
  lang
  tags

  constructor({ title, description, coverImage, path, publishDate, lang, tags }) {
    this.title = title
    this.description = description
    this.coverImage = coverImage
    this.path = path
    this.publishDate = publishDate
    this.lang = lang || 'th-TH'
    this.tags = tags || []
  }

  getMoment() {
    moment.locale(this.lang)
    return moment(this.publishDate).fromNow()
  }

  getDate() {
    moment.locale(this.lang)
    return moment(this.publishDate).calendar()
  }
}

export default Post